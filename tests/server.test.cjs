const {test}=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {googleHarness}=require('./harness.cjs');
function setup(){const h=googleHarness(),c=h.context;c.initializeEnvironment();const call=(action,input={},requestId=crypto.randomUUID())=>c.api({action,input,requestId});call('save_procedure',{id:'CLD',name:'Cấp lần đầu thử nghiệm',active:true,rule:'Test'});call('save_user',{email:'front@example.test',name:'Một cửa',role:'FRONT',active:true});call('save_user',{email:'specialist@example.test',name:'Chuyên môn',role:'SPECIALIST',active:true});return {h,c,call};}
function input(){return {code:'H05.170.1-261107-0001',name:'Dữ liệu thử nghiệm',procedure:'CLD',received:'2026-11-07',due:'2026-11-10',evidence:'Phiếu thử'};}
test('service refuses an absent active identity instead of using deployment owner',()=>{const {h,call}=setup();h.login('');assert.throws(()=>call('bootstrap'),/chưa cung cấp email/);});
test('request idempotency survives successful write and does not duplicate intake',()=>{const {h,c,call}=setup();h.login('front@example.test');const key=crypto.randomUUID(),one=call('create',input(),key),two=call('create',input(),key);assert.equal(one.caseId,two.caseId);assert.equal(c.readState_().cases.length,1);assert.equal(c.events_().filter(e=>e.action==='create').length,1);});
test('event replay restores projection after interrupted write',()=>{const {h,c,call}=setup();h.login('front@example.test');h.failProjection('HO_SO');const key=crypto.randomUUID();assert.throws(()=>call('create',input(),key),/simulated projection failure/);assert.equal(c.events_().filter(e=>e.action==='create').length,1);const result=call('create',input(),key);assert.ok(result.caseId);assert.equal(c.readState_().cases.length,1);assert.equal(c.events_().filter(e=>e.action==='create').length,1);});
test('specialist cannot list or read unrelated dossiers',()=>{const {h,call}=setup();h.login('front@example.test');const result=call('create',input());h.login('specialist@example.test');assert.equal(call('bootstrap').cases.length,0);assert.throws(()=>call('detail',{caseId:result.caseId}),/không tìm thấy/i);assert.throws(()=>call('create',{...input(),code:'SECOND'}),/không có quyền/);});
test('repeat migration skips known IDs, keeps cases unverified and validates parents',()=>{const {c,call}=setup();const record={table:'cases',row:{id:'legacy',name:'Thử',code:'',status:'CLOSED'}};call('import_batch',{records:[record]});call('import_batch',{records:[record]});assert.equal(c.readState_().cases.length,1);assert.equal(c.readState_().cases[0].status,'UNVERIFIED');assert.throws(()=>call('import_batch',{records:[{table:'parcels',row:{id:'p',caseId:'missing'}}]}),/hồ sơ cha/);});
test('reminders disabled by default; daily reservation prevents duplicate send',()=>{const {c,call,h}=setup();call('save_user',{email:'front@example.test',name:'Một cửa',role:'FRONT',active:true,notifications:true});h.login('front@example.test');call('create',input());h.login('admin@example.test');call('send_reminders');assert.equal(c.sent,0);h.properties.set('REMINDERS_ENABLED','true');call('send_reminders');call('send_reminders');assert.equal(c.sent,1);assert.equal(c.readState_().notifications[0].status,'SENT');});
test('non-admin cannot import or change system settings',()=>{const {call,h}=setup();h.login('front@example.test');assert.throws(()=>call('import_batch',{records:[{table:'cases',row:{id:'x'}}]}),/quản trị/);assert.throws(()=>call('settings',{remindersEnabled:true}),/quản trị/);});
test('bulk Drive migration writes recoverable journal batches, preserves parents and can repeat safely',()=>{
 const {call,c}=setup();const records=[];
 for(let i=0;i<40;i++)records.push({table:'cases',row:{id:'bulk'+i,name:'Synthetic '+i,code:''}});
 for(let i=0;i<40;i++)records.push({table:'parcels',row:{id:'parcel'+i,caseId:'bulk'+i,plot:'07T',map:'11'}});
 const raw=JSON.stringify({schema:'hoso-migration-v1',records});c.DriveApp.getFileById=()=>({getSize:()=>raw.length,getBlob:()=>({getDataAsString:()=>raw})});
 call('import_file',{fileId:'synthetic-file'});assert.equal(c.readState_().cases.length,40);assert.equal(c.readState_().parcels.length,40);
 call('import_file',{fileId:'synthetic-file'});assert.equal(c.readState_().cases.length,40);assert.ok(c.events_().some(e=>e.action==='import_file_part'));
});
test('PDF payment approval attaches receipt without treating it as a result or citizen return',()=>{
 const {h,c,call}=setup();h.login('front@example.test');const id=call('create',input()).caseId;
 const state=c.readState_();c.commit_(state,{email:'SYSTEM'},'pdf_progress',{},[{table:'reviews',row:{id:'pdf-r',caseId:'',kind:'PDF_EXTRACTION',status:'OPEN',source:'drive-synthetic',draft:{document_type:'PAYMENT_RECEIPT'}}}],{message:'Synthetic PDF'},crypto.randomUUID());
 call('approve_pdf',{reviewId:'pdf-r',mode:'PAYMENT',data:{caseId:id,version:1,receipt:'BL01',date:'2026-11-07',amount:10000,type:'Phí',evidence:'Biên lai tổng hợp'}});
 const updated=c.readState_();assert.equal(updated.payments.length,1);assert.equal(updated.documents.length,1);assert.equal(updated.cases[0].status,'RECEIVED');assert.equal(updated.reviews[0].status,'RESOLVED');
});
test('period inventory reconciles reopening and verified legacy additions using the journal',()=>{
 const {call,h}=setup();h.login('front@example.test');call('create',input());const d=call('bootstrap').dashboard;assert.equal(d.period.opening,0);assert.equal(d.period.ending,1);assert.equal(d.period.reconciled,true);
});
test('email-code authentication works with absent Google email, is single-use and revocable',()=>{
 const {c,h,call}=setup();call('settings',{emailLoginEnabled:true});h.login('');
 const challenge=call('login_begin',{email:'front@example.test'}).challenge;const code=c.lastMail.body.match(/\b\d{6}\b/)[0];
 const result=call('login_verify',{challenge,code});assert.ok(result.token);
 assert.throws(()=>call('login_verify',{challenge,code}),/không hợp lệ|hết hạn/);
 const bootstrap=c.api({action:'bootstrap',sessionToken:result.token});assert.equal(bootstrap.user.email,'front@example.test');
 c.api({action:'logout',sessionToken:result.token});assert.throws(()=>c.api({action:'bootstrap',sessionToken:result.token}),/chưa cung cấp email/);
});
test('unknown email gets a generic response without sending a code; requests are throttled',()=>{
 const {c,h,call}=setup();call('settings',{emailLoginEnabled:true});h.login('');
 const before=c.sent;for(let i=0;i<3;i++)assert.ok(call('login_begin',{email:'unknown@example.test'}).challenge);
 assert.equal(c.sent,before);assert.throws(()=>call('login_begin',{email:'unknown@example.test'}),/giới hạn/);
});
test('five wrong code attempts invalidate a challenge',()=>{
 const {c,h,call}=setup();call('settings',{emailLoginEnabled:true});h.login('');
 const challenge=call('login_begin',{email:'front@example.test'}).challenge,code=c.lastMail.body.match(/\b\d{6}\b/)[0],wrong=code==='000000'?'000001':'000000';
 for(let i=0;i<5;i++)assert.throws(()=>call('login_verify',{challenge,code:wrong}),/không đúng/);
 assert.throws(()=>call('login_verify',{challenge,code}),/không hợp lệ|hết hạn/);
});
test('PDF upload larger than a Sheets cell stores only metadata, survives journal replay and deduplicates',()=>{
 const {c,h,call}=setup();h.login('front@example.test');const base64=Buffer.from('%PDF-1.4\n'+'x'.repeat(80000)).toString('base64');
 const result=call('upload_pdf',{name:'synthetic.pdf',base64});assert.ok(result.jobId);assert.equal(c.readState_().pdfjobs.length,1);
 const event=c.events_().find(e=>e.action==='upload_pdf');assert.equal(event.input.base64,undefined);assert.ok(JSON.stringify(event).length<5000);
 assert.equal(call('upload_pdf',{name:'same-content.pdf',base64}).jobId,result.jobId);assert.equal(c.readState_().pdfjobs.length,1);
 const second=Buffer.from('%PDF-1.4\n'+'y'.repeat(80000)).toString('base64'),requestId=crypto.randomUUID();h.failProjection('PDF_JOBS');
 assert.throws(()=>call('upload_pdf',{name:'second.pdf',base64:second},requestId),/simulated projection failure/);
 const recovered=call('upload_pdf',{name:'second.pdf',base64:second},requestId);assert.ok(recovered.jobId);assert.equal(c.readState_().pdfjobs.length,2);
});
