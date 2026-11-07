const {test}=require('node:test'),assert=require('node:assert/strict');
const {domain}=require('./harness.cjs');
function fixture(){
 const D=domain();let n=0;const ctx={today:'2026-11-07',now:'2026-11-07T15:00:00+07:00',id:()=>String(++n)};
 const users=[['a','ADMIN'],['f','FRONT'],['s','SPECIALIST'],['s2','SPECIALIST'],['m','MANAGER']].map(([id,role])=>({id,email:id+'@example.test',name:id,role,active:true}));
 const state={users,procedures:[{id:'CLD',active:true}],cases:[],tasks:[],transfers:[],events:[],parcels:[],reviews:[],documents:[],payments:[]};
 function run(actor,action,input){const user=users.find(u=>u.id===actor);const result=D.decide(state,user,action,input,ctx);D.apply(state,result.changes);state.events.push({at:ctx.now,action,input,caseId:result.result.caseId,changes:result.changes});return result;}
 function create(){return run('f','create',{code:'H05.170.1-261107-0001',name:'Công dân thử nghiệm',procedure:'CLD',received:'2026-11-07',due:'2026-11-10',phone:'0123456789',evidence:'Phiếu thử nghiệm'}).result.caseId;}
 const v=id=>({caseId:id,version:state.cases.find(c=>c.id===id).version});return {D,state,run,create,v,ctx};
}
test('full lifecycle requires receipt, tasks, result and front-desk acceptance',()=>{
 const {state,run,create,v}=fixture(),id=create();
 run('f','handoff',{...v(id),to:'s@example.test',note:'01 bộ hồ sơ'});
 assert.equal(state.cases[0].owner,'f@example.test');assert.equal(state.cases[0].status,'TRANSFER_WAIT');
 assert.throws(()=>run('s2','accept_transfer',v(id)),/Chỉ người nhận|Không tìm thấy/);
 run('s','accept_transfer',v(id));assert.equal(state.cases[0].owner,'s@example.test');
 run('s','assign_task',{...v(id),title:'Thẩm tra',assignee:'s@example.test',due:'2026-11-08'});
 assert.throws(()=>run('s','record_result',{...v(id),outcome:'APPROVED',resultDate:'2026-11-07',evidence:'Văn bản'}),/công việc/);
 run('s','update_task',{...v(id),taskId:state.tasks[0].id,status:'BLOCKED',blocker:'Chờ xác minh',nextStep:'Liên hệ đơn vị'});
 assert.equal(state.cases[0].due,'2026-11-10');
 run('s','update_task',{...v(id),taskId:state.tasks[0].id,status:'DONE',result:'Đã thẩm tra'});
 run('s','record_result',{...v(id),outcome:'APPROVED',resultDate:'2026-11-07',evidence:'Văn bản kết quả'});
 assert.throws(()=>run('f','close',{...v(id),returnDate:'2026-11-07',evidence:'Đã trả'}),/phụ trách|chưa xác nhận/);
 run('s','return_result',{...v(id),to:'f@example.test',note:'Kết quả gốc'});run('f','accept_transfer',v(id));
 run('f','close',{...v(id),returnDate:'2026-11-07',evidence:'Công dân ký nhận'});assert.equal(state.cases[0].status,'CLOSED');
 run('m','reopen',{...v(id),owner:'f@example.test',reason:'Kiểm tra lại theo yêu cầu'});assert.equal(state.cases[0].status,'RECEIVED');assert.equal(state.cases[0].returnDate,'');
});
test('version conflicts and duplicate codes are rejected without mutation',()=>{
 const {state,run,create,v}=fixture(),id=create(),old=v(id);
 run('f','handoff',{...old,to:'s@example.test',note:'Bàn giao'});
 assert.throws(()=>run('s','accept_transfer',old),/vừa thay đổi/);
 assert.throws(()=>create(),/đã tồn tại/);assert.equal(state.cases.length,1);
 assert.throws(()=>run('f','adjust_due',{...v(id),due:'2026-11-30',reason:'Thay đổi',evidence:'Căn cứ'}),/không có quyền/);
});
test('payment never closes a case and receipt duplicates are rejected',()=>{
 const {state,run,create,v}=fixture(),id=create();const p={receipt:'BL-001',date:'2026-11-07',amount:'100000',type:'Phí',evidence:'Biên lai'};
 run('f','add_payment',{...v(id),...p});assert.equal(state.cases[0].status,'RECEIVED');
 assert.throws(()=>run('f','add_payment',{...v(id),...p}),/đã được ghi/);
 assert.throws(()=>run('f','add_payment',{...v(id),...p,receipt:'BL-002',amount:-1}),/Số tiền/);
});
test('due dates respect working holidays, make-up days, original deadline and unknown history',()=>{
 const {D,state,run,create,v,ctx}=fixture();
 assert.equal(D.workingDue('2026-11-06',1,[],false),'2026-11-09');
 assert.equal(D.workingDue('2026-11-06',1,[{date:'2026-11-07',working:true}],false),'2026-11-07');
 assert.equal(D.workingDue('2026-11-06',1,[{date:'2026-11-09',working:false}],false),'2026-11-10');
 assert.throws(()=>D.date('2026-02-30'),/không tồn tại/);
 const id=create();run('m','adjust_due',{...v(id),due:'2026-11-20',reason:'Điều chỉnh theo phiếu',evidence:'VB01'});
 assert.equal(state.cases[0].originalDue,'2026-11-10');assert.equal(state.cases[0].due,'2026-11-20');
 assert.equal(D.dueState({status:'UNVERIFIED',due:'2020-01-01'},ctx.today),'UNKNOWN');
 assert.equal(D.dueState({status:'PROCESSING',due:''},ctx.today),'UNKNOWN');
});
test('unverified data excluded from official dashboard; event totals distinguish reopening',()=>{
 const {D,state,create,ctx}=fixture();create();state.cases.push({id:'legacy',status:'UNVERIFIED',due:'2020-01-01'});
 const dash=D.dashboard(state,ctx.today,'2026-11-01','2026-11-30');assert.equal(dash.counts.active,1);assert.equal(dash.counts.overdue,0);assert.equal(dash.counts.unverified,1);assert.equal(dash.period.intakes,1);
});
test('legacy merging moves source references and prevents merging distinct DVC codes',()=>{
 const {state,run}=fixture();state.cases.push({id:'x',version:1,status:'UNVERIFIED',code:'',owner:''},{id:'y',version:1,status:'UNVERIFIED',code:'H05.170.1-261001-0001',owner:''});
 state.parcels.push({id:'p',caseId:'x'});state.reviews.push({id:'r',caseId:'x'});
 run('a','merge_legacy',{caseId:'x',version:1,targetId:'y',targetVersion:1,reason:'Đã đối chiếu phiếu gốc'});
 assert.equal(state.cases[0].status,'MERGED');assert.equal(state.parcels[0].caseId,'y');assert.equal(state.reviews[0].caseId,'y');
 assert.throws(()=>run('a','verify_case',{caseId:'x',version:2}),/đã hợp nhất/);
});
test('legacy closed verification requires actual dates and creates no fake return event',()=>{
 const {D,state,run,ctx}=fixture();state.cases.push({id:'x',version:1,status:'UNVERIFIED',owner:''});
 run('f','verify_case',{caseId:'x',version:1,procedure:'CLD',received:'2026-01-01',due:'2026-01-20',legacyClosed:true,outcome:'APPROVED',resultDate:'2026-01-10',returnDate:'2026-01-11',evidence:'Phiếu cũ'});
 const d=D.dashboard(state,ctx.today,'2026-11-01','2026-11-30');assert.equal(d.counts.closed,1);assert.equal(d.period.returned,0);assert.equal(d.period.verifiedLegacy,1);
});
test('last administrator cannot be disabled',()=>{
 const {run}=fixture();assert.throws(()=>run('a','save_user',{email:'a@example.test',name:'A',role:'FRONT',active:true}),/ít nhất một quản trị/);
});
