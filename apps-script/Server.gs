var TABLES = {
  cases: ['HO_SO', ['id','code','name','landUser','phone','address','procedure','received','originalDue','due','status','owner','outcome','resultDate','returnDate','closedDate','updatedAt','version']],
  parcels: ['THUA_DAT', ['id','caseId','plot','map','area','village','commune','serial','source']],
  tasks: ['CONG_VIEC', ['id','caseId','title','assignee','assignedBy','assignedAt','due','status','completedAt','blocker','nextStep','result']],
  transfers: ['BAN_GIAO', ['id','batchId','caseId','from','to','kind','sentAt','acceptedAt','status','note']],
  documents: ['TAI_LIEU', ['id','caseId','fileId','name','type','hash','createdAt']],
  payments: ['THANH_TOAN', ['id','caseId','receipt','date','amount','type','evidence','createdAt']],
  reviews: ['CHO_DOI_SOAT', ['id','caseId','kind','status','source','message']],
  users: ['CAN_BO', ['id','email','name','role','active','notifications']],
  procedures: ['THU_TUC', ['id','name','active','rule']],
  holidays: ['LICH_LAM_VIEC', ['id','date','working','note']],
  notifications: ['NHAC_VIEC', ['id','to','date','status','attempts','message']],
  pdfjobs: ['PDF_JOBS', ['id','fileId','hash','status','workerId','attempts','createdAt','updatedAt','message']],
  snapshots: ['CHOT_KY', ['id','from','to','createdAt','actor']]
};
var EVENT_HEADERS = ['seq','id','at','actor','requestId','action','caseId','payload'];
function props_() { return PropertiesService.getScriptProperties(); }
function db_() { var id = props_().getProperty('SPREADSHEET_ID'); if (!id) throw new Error('Chưa chạy initializeEnvironment từ trình soạn thảo.'); return SpreadsheetApp.openById(id); }
function now_() { return Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', "yyyy-MM-dd'T'HH:mm:ssXXX"); }
function ctx_() { var now = now_(); return {now: now, today: now.slice(0,10), id: function () { return Utilities.getUuid(); }}; }
function safeCell_(v) { var s = v == null ? '' : String(v); return /^[=+@-]/.test(s) ? "'" + s : s; }
function ensureSheet_(ss, name, headers) {
  var s = ss.getSheetByName(name) || ss.insertSheet(name);
  if (!s.getLastRow()) { s.getRange(1,1,1,headers.length).setValues([headers]); s.setFrozenRows(1); s.getRange(1,1,1,headers.length).setBackground('#153f3a').setFontColor('#ffffff').setFontWeight('bold'); }
  else if (JSON.stringify(s.getRange(1,1,1,headers.length).getValues()[0]) !== JSON.stringify(headers)) throw new Error('Sai cấu trúc bảng ' + name + '. Không ghi đè.');
  return s;
}
function initializeEnvironment() {
  // Run ONLY in Apps Script editor, before deploying. Never expose this in the app UI.
  if (props_().getProperty('SPREADSHEET_ID')) throw new Error('Đã khởi tạo; không tạo lại hoặc ghi đè dữ liệu.');
  var email = Session.getActiveUser().getEmail();
  if (!email) throw new Error('Không xác định được tài khoản đang đăng nhập.');
  var ss = SpreadsheetApp.create('Theo dõi hồ sơ • Hợp Thịnh'); ss.setSpreadsheetTimeZone('Asia/Ho_Chi_Minh');
  Object.keys(TABLES).forEach(function (k) { ensureSheet_(ss, TABLES[k][0], TABLES[k][1].concat(['row_json'])); });
  ensureSheet_(ss, 'NHAT_KY', EVENT_HEADERS);
  var folder = DriveApp.createFolder('Hồ sơ Hợp Thịnh • Tài liệu');
  var inbox = folder.createFolder('01_PDF_CHO_DOC'); var archive = folder.createFolder('02_DA_XU_LY');
  props_().setProperties({SPREADSHEET_ID: ss.getId(), DRIVE_ROOT_ID: folder.getId(), PDF_INBOX_ID: inbox.getId(), PDF_ARCHIVE_ID: archive.getId(), PROJECTION_SEQ: '0', REMINDERS_ENABLED: 'false',EMAIL_LOGIN_ENABLED:'false'});
  var user = {id: Utilities.getUuid(), email: email.toLowerCase(), name: 'Quản trị viên', role: 'ADMIN', active: true, notifications: false};
  var state = readState_(); var changes = [{table:'users',row:user}];
  [['CLD','Cấp giấy chứng nhận lần đầu'],['THCL','Thu hồi, cấp lại — cần đối chiếu mã thủ tục'],['CMD','Chuyển mục đích sử dụng đất']].forEach(function (p) {
    changes.push({table:'procedures',row:{id:p[0],name:p[1],active:false,rule:'Chưa xác nhận mã và quy tắc nghiệp vụ. Quản trị viên cần duyệt trước khi kích hoạt.'}});
  });
  commit_(state,user,'initialize',{},changes,{message:'Đã khởi tạo. Thủ tục mẫu chưa được kích hoạt.'},Utilities.getUuid());
  console.log('Google Sheets: '+ss.getUrl());console.log('Drive: '+folder.getUrl());
  return {spreadsheetUrl:ss.getUrl(),folderUrl:folder.getUrl(),message:'Đã tạo sổ riêng tư. Không bật gửi email hoặc trigger tự động.'};
}
function readState_() {
  var ss = db_(), state = {};
  Object.keys(TABLES).forEach(function (k) {
    var def=TABLES[k], s=ensureSheet_(ss,def[0],def[1].concat(['row_json']));
    state[k] = s.getLastRow() < 2 ? [] : s.getRange(2,def[1].length+1,s.getLastRow()-1,1).getValues().filter(function(r){return r[0];}).map(function(r){return JSON.parse(r[0]);});
  });
  state.events=events_(); return state;
}
function events_() {
  var s=ensureSheet_(db_(),'NHAT_KY',EVENT_HEADERS);
  if(s.getLastRow()<2)return [];
  return s.getRange(2,1,s.getLastRow()-1,EVENT_HEADERS.length).getValues().map(function(r){var p=JSON.parse(r[7]);return {seq:Number(r[0]),id:r[1],at:r[2],actor:r[3],requestId:r[4],action:r[5],caseId:r[6],input:p.input,changes:p.changes,result:p.result};});
}
function project_(state, events) {
  var touched={}; events.forEach(function(e){e.changes.forEach(function(ch){if(!TABLES[ch.table])throw new Error('Bảng không hợp lệ.');touched[ch.table]=true;}); Domain.apply(state,e.changes);});
  Object.keys(touched).forEach(function(k){
    var def=TABLES[k], s=db_().getSheetByName(def[0]); var rows=state[k].map(function(row){
      var json=JSON.stringify(row); if(json.length>45000)throw new Error('Bản ghi vượt giới hạn ô dữ liệu.');
      return def[1].map(function(key){return safeCell_(row[key]);}).concat([json]);
    });
    if(rows.length){ if(s.getMaxRows()<rows.length+1)s.insertRowsAfter(s.getMaxRows(),rows.length+1-s.getMaxRows()); s.getRange(2,1,rows.length,def[1].length+1).setNumberFormat('@').setValues(rows); }
  });
  SpreadsheetApp.flush();
  if(events.length)props_().setProperty('PROJECTION_SEQ',String(events[events.length-1].seq));
}
function recover_() {
  var state=readState_(), seq=Number(props_().getProperty('PROJECTION_SEQ')||0);
  var pending=state.events.filter(function(e){return e.seq>seq;});
  if(pending.length)project_(state,pending); return state;
}
function commit_(state,user,action,input,changes,result,requestId) {
  var seq=state.events.length?state.events[state.events.length-1].seq+1:1;
  var payload=JSON.stringify({input:input,changes:changes,result:result});
  if(payload.length>45000)throw new Error('Thao tác quá lớn. Hãy chia thành lô nhỏ hơn.');
  var event={seq:seq,id:Utilities.getUuid(),at:now_(),actor:user.email,requestId:requestId,action:action,caseId:result.caseId||input.caseId||'',input:input,changes:changes,result:result};
  var sheet=db_().getSheetByName('NHAT_KY'), row=[seq,event.id,event.at,event.actor,requestId,action,event.caseId,payload];
  sheet.getRange(sheet.getLastRow()+1,1,1,row.length).setNumberFormat('@').setValues([row]);
  SpreadsheetApp.flush(); // The event is authoritative. A projection failure is replayed on the next request.
  state.events.push(event); project_(state,[event]); return result;
}
function authenticated_(state, token) {
  var email=emailSession_(token)||Session.getActiveUser().getEmail();
  // Never fall back to the deployment owner's identity for requests.
  if(!email)throw new Error('Google chưa cung cấp email người dùng. Mở bằng tài khoản được cấp quyền; xem hướng dẫn triển khai.');
  return Domain.activeUser(state,email);
}
function locked_(fn) {
  var lock=LockService.getScriptLock(); if(!lock.tryLock(20000))throw new Error('Hệ thống đang ghi dữ liệu. Vui lòng thử lại.');
  try{return fn();}finally{lock.releaseLock();}
}
function doGet() { return HtmlService.createHtmlOutputFromFile('Index').setTitle('Hồ sơ • Hợp Thịnh').addMetaTag('viewport','width=device-width, initial-scale=1'); }
function api(request) {
  return locked_(function(){
    var state=recover_(),r=request||{},action=r.action,input=r.input||{},ctx=ctx_();
    if(action==='login_begin')return emailLoginBegin_(state,input);
    if(action==='login_verify')return emailLoginVerify_(state,input);
    var user=authenticated_(state,r.sessionToken);
    if(action==='logout'){if(r.sessionToken)cache_().remove('SESSION_'+digestText_(r.sessionToken));return {message:'Đã kết thúc phiên mã email.'};}
    var readonly=['bootstrap','detail','read_document','calculate_due','notification_preview'];
    if(readonly.indexOf(action)<0){
      if(!/^[a-zA-Z0-9_-]{8,120}$/.test(r.requestId||''))throw new Error('Thiếu mã thao tác để chống ghi trùng.');
      var previous=state.events.find(function(e){return e.requestId===r.requestId&&e.actor===user.email;});if(previous)return previous.result;
    }
    if(action==='bootstrap')return view_(state,user,input,ctx);
    if(action==='detail')return detail_(state,user,input.caseId);
    if(action==='read_document')return readDocument_(state,user,input.fileId);
    if(action==='calculate_due'){return {due:Domain.workingDue(input.start,Number(input.days),state.holidays,input.includeStart===true)};}
    if(action==='snapshot'){
      requireAdminManager_(user); var report=Domain.dashboard(state,ctx.today,input.from,input.to);
      return mutateSpecial_(state,user,r,[{table:'snapshots',row:{id:ctx.id(),from:input.from,to:input.to,createdAt:ctx.now,actor:user.email,report:report}}],{message:'Đã chốt báo cáo kỳ.'});
    }
    if(action==='import_batch')return importBatch_(state,user,r);
    if(action==='import_file')return importMigrationFile_(state,user,r);
    if(action==='resolve_review')return resolveReview_(state,user,r);
    if(action==='upload_pdf')return uploadPdf_(state,user,r);
    if(action==='approve_pdf')return approvePdf_(state,user,r);
    if(action==='retry_pdf')return retryPdf_(state,user,r);
    if(action==='poll_pdf'){if(['ADMIN','FRONT','MANAGER'].indexOf(user.role)<0)throw new Error('Cần quyền tiếp nhận/quản lý.');return pollPdf_();}
    if(action==='settings')return settings_(state,user,r);
    if(action==='scan_pdf'){if(['ADMIN','FRONT','MANAGER'].indexOf(user.role)<0)throw new Error('Cần quyền tiếp nhận/quản lý.');return scanPdf_();}
    if(action==='notification_preview'){requireAdminManager_(user);return notificationCandidates_(state,ctx.today);}
    if(action==='refresh_sheet_dashboard'){requireAdminManager_(user);refreshSheetDashboard_(state);return {message:'Đã cập nhật dashboard trong Google Sheets.'};}
    if(action==='send_reminders'){requireAdminManager_(user);return sendReminders_();}
    var requestId=String(r.requestId||''); if(!/^[a-zA-Z0-9_-]{8,120}$/.test(requestId))throw new Error('Thiếu mã thao tác để chống ghi trùng.');
    var old=state.events.find(function(e){return e.requestId===requestId&&e.actor===user.email;}); if(old)return old.result;
    if(action==='add_document')DriveApp.getFileById(String(input.fileId||'')).getName();
    var decision=Domain.decide(state,user,action,input,ctx);
    return commit_(state,user,action,input,decision.changes,decision.result,requestId);
  });
}
function requireAdminManager_(user){if(['ADMIN','MANAGER'].indexOf(user.role)<0)throw new Error('Cần quyền quản lý.');}
function mutateSpecial_(state,user,r,changes,result){
  if(!/^[a-zA-Z0-9_-]{8,120}$/.test(r.requestId||''))throw new Error('Thiếu mã thao tác.');
  var old=state.events.find(function(e){return e.requestId===r.requestId&&e.actor===user.email;});if(old)return old.result;
  return commit_(state,user,r.action,r.input||{},changes,result,r.requestId);
}
function view_(state,user,filter,ctx){
  var allowed=state.cases.filter(function(c){return Domain.visible(c,user,state);});
  var ids={};allowed.forEach(function(c){ids[c.id]=true;});
  var visibleState=Object.assign({},state,{cases:allowed,tasks:state.tasks.filter(function(t){return ids[t.caseId];}),transfers:state.transfers.filter(function(t){return ids[t.caseId];}),events:state.events.filter(function(e){return ids[e.caseId];})});
  var from=filter.from||ctx.today.slice(0,7)+'-01',to=filter.to||ctx.today;
  var selected=allowed.filter(function(c){return (filter.status||c.status!=='MERGED')&&(!filter.owner||c.owner===filter.owner)&&(!filter.procedure||c.procedure===filter.procedure)&&(!filter.status||c.status===filter.status)&&(!filter.dueState||Domain.dueState(c,ctx.today)===filter.dueState)&&(!filter.q||[c.code,c.name,c.phone,c.id].join(' ').toLowerCase().indexOf(String(filter.q).toLowerCase())>=0);});
  var selectedIds={};selected.forEach(function(c){selectedIds[c.id]=true;});
  var dashboardState=Object.assign({},visibleState,{cases:selected,tasks:visibleState.tasks.filter(function(t){return selectedIds[t.caseId];}),transfers:visibleState.transfers.filter(function(t){return selectedIds[t.caseId];}),events:visibleState.events.filter(function(e){return selectedIds[e.caseId];})});
  return {user:user,today:ctx.today,cases:selected.map(function(c){return Object.assign({},c,{dueState:Domain.dueState(c,ctx.today)});}),tasks:visibleState.tasks,transfers:visibleState.transfers,
    users:state.users.filter(function(u){return u.active;}).map(function(u){return {id:u.id,email:u.email,name:u.name,role:u.role};}),procedures:state.procedures,
    dashboard:Domain.dashboard(dashboardState,ctx.today,from,to),reviews:['ADMIN','FRONT','MANAGER'].indexOf(user.role)>=0?state.reviews:[],
    jobs:['ADMIN','FRONT','MANAGER'].indexOf(user.role)>=0?state.pdfjobs:[],snapshots:['ADMIN','MANAGER'].indexOf(user.role)>=0?state.snapshots:[],
    links:user.role==='ADMIN'?{sheet:db_().getUrl(),folder:'https://drive.google.com/drive/folders/'+props_().getProperty('DRIVE_ROOT_ID')}: {},
    settings:user.role==='ADMIN'?{workerConfigured:!!props_().getProperty('WORKER_URL'),emailLoginEnabled:props_().getProperty('EMAIL_LOGIN_ENABLED')==='true',remindersEnabled:props_().getProperty('REMINDERS_ENABLED')==='true',triggers:ScriptApp.getProjectTriggers().map(function(t){return t.getHandlerFunction();})}:null};
}
function detail_(state,user,id){
  var c=state.cases.find(function(x){return x.id===id;});if(!c||!Domain.visible(c,user,state))throw new Error('Không tìm thấy hồ sơ được phép xem.');
  var data={case:c};['parcels','tasks','transfers','documents','payments'].forEach(function(k){data[k]=state[k].filter(function(x){return x.caseId===id;});});
  data.events=state.events.filter(function(e){return e.caseId===id;}).map(function(e){return {at:e.at,actor:e.actor,action:e.action,input:e.input};});return data;
}
function readDocument_(state,user,fileId){
  var allowed=state.documents.some(function(d){var c=state.cases.find(function(c){return c.id===d.caseId;});return d.fileId===fileId&&c&&Domain.visible(c,user,state);});
  if(!allowed&&['ADMIN','FRONT','MANAGER'].indexOf(user.role)>=0)allowed=state.reviews.some(function(r){return r.kind==='PDF_EXTRACTION'&&r.source===fileId;});
  if(!allowed)throw new Error('Không có quyền đọc tài liệu này.');
  var f=DriveApp.getFileById(fileId);if(f.getMimeType()!=='application/pdf')throw new Error('Xem qua ứng dụng chỉ hỗ trợ PDF. Tài liệu khác cần quyền Drive riêng.');
  if(f.getSize()>10*1024*1024)throw new Error('Tài liệu vượt giới hạn 10 MB.');
  return {base64:Utilities.base64Encode(f.getBlob().getBytes()),name:f.getName(),mimeType:'application/pdf'};
}
function importBatch_(state,user,r){
  if(user.role!=='ADMIN')throw new Error('Chỉ quản trị viên được nhập dữ liệu chuyển đổi.');
  var records=r.input.records||[];if(!records.length||records.length>10)throw new Error('Mỗi lô từ 1 đến 10 bản ghi.');
  var changes=[],skipped=0;
  records.forEach(function(rec){
    if(['cases','parcels','reviews'].indexOf(rec.table)<0||!rec.row||!/^[A-Za-z0-9_-]{1,120}$/.test(rec.row.id||''))throw new Error('Định dạng dữ liệu chuyển đổi không hợp lệ.');
    var row=JSON.parse(JSON.stringify(rec.row));
    if(state[rec.table].some(function(x){return x.id===row.id;})||changes.some(function(x){return x.table===rec.table&&x.row.id===row.id;})){skipped++;return;}
    if(rec.table==='cases'){
      if(row.code&&state.cases.concat(changes.filter(function(x){return x.table==='cases';}).map(function(x){return x.row;})).some(function(x){return Domain.normalizeCode(x.code)===Domain.normalizeCode(row.code);}))throw new Error('Mã đã tồn tại. Cần đối soát với dữ liệu hiện có.');
      row.status='UNVERIFIED';row.verified=false;row.owner='';row.version=1;row.createdAt=ctx_().now;row.updatedAt=row.createdAt;row.source='LEGACY';
    }else if(!state.cases.some(function(x){return x.id===row.caseId;})&&!changes.some(function(x){return x.table==='cases'&&x.row.id===row.caseId;})){
      if(rec.table==='parcels'||row.caseId)throw new Error('Chưa có hồ sơ cha; nhập các hồ sơ trước.');
    }
    changes.push({table:rec.table,row:row});
  });
  var journalRequest=Object.assign({},r,{input:{recordIds:records.map(function(rec){return rec.row.id;})}});
  return mutateSpecial_(state,user,journalRequest,changes,{message:'Đã nhập '+changes.length+' bản ghi; bỏ qua '+skipped+' ID đã có.'});
}
function resolveReview_(state,user,r){
  if(['ADMIN','FRONT','MANAGER'].indexOf(user.role)<0)throw new Error('Không có quyền đối soát.');
  var review=state.reviews.find(function(x){return x.id===r.input.id;});if(!review)throw new Error('Không tìm thấy mục đối soát.');
  if(!String(r.input.resolution||'').trim())throw new Error('Ghi kết luận và căn cứ đối soát.');
  var row=Object.assign({},review,{status:'RESOLVED',resolution:r.input.resolution,resolvedAt:now_(),resolvedBy:user.email});
  if(r.input.caseId){if(!state.cases.some(function(c){return c.id===r.input.caseId&&c.status!=='MERGED';}))throw new Error('Hồ sơ được chọn không tồn tại hoặc đã hợp nhất.');row.caseId=r.input.caseId;}
  return mutateSpecial_(state,user,r,[{table:'reviews',row:row}],{caseId:review.caseId||'',message:'Đã lưu kết luận. Thao tác này không tự đổi trạng thái hồ sơ.'});
}
function importMigrationFile_(state,user,r){
  if(user.role!=='ADMIN')throw new Error('Chỉ quản trị viên được nhập chuyển đổi.');
  var file=DriveApp.getFileById(String(r.input.fileId||''));
  if(file.getSize()>25*1024*1024)throw new Error('Tệp chuyển đổi tối đa 25 MB.');
  var data=JSON.parse(file.getBlob().getDataAsString('UTF-8'));
  if(data.schema!=='hoso-migration-v1'||!Array.isArray(data.records))throw new Error('Không đúng định dạng migration.json.');
  var seen={},codes={},changes=[],skipped=0,now=now_();
  Object.keys(TABLES).forEach(function(k){seen[k]={};state[k].forEach(function(row){seen[k][row.id]=true;});});
  state.cases.forEach(function(c){if(c.code)codes[Domain.normalizeCode(c.code)]=c.id;});
  data.records.forEach(function(rec){
    if(!rec||['cases','parcels','reviews'].indexOf(rec.table)<0||!rec.row||typeof rec.row.id!=='string'||!/^[A-Za-z0-9_-]{1,120}$/.test(rec.row.id))throw new Error('Bản ghi chuyển đổi không hợp lệ.');
    var row=JSON.parse(JSON.stringify(rec.row));
    if(seen[rec.table][row.id]){skipped++;return;}
    if(rec.table==='cases'){
      if(row.code&&codes[Domain.normalizeCode(row.code)])throw new Error('Mã DVC đã có ở ID khác; cần đối soát trước khi nhập.');
      if(row.code)codes[Domain.normalizeCode(row.code)]=row.id;
      row.status='UNVERIFIED';row.verified=false;row.owner='';row.version=1;row.source='LEGACY';row.createdAt=now;row.updatedAt=now;
    }else if((rec.table==='parcels'||row.caseId)&&!seen.cases[row.caseId])throw new Error('Hồ sơ cha chưa có. Các hồ sơ phải nằm trước thửa và mục đối soát trong tệp.');
    if(JSON.stringify(row).length>30000)throw new Error('Bản ghi quá lớn; cần chia nội dung nguồn.');
    seen[rec.table][row.id]=true;changes.push({table:rec.table,row:row});
  });
  if(!changes.length)return mutateSpecial_(state,user,r,[],{message:'Không có bản ghi mới; '+skipped+' ID đã tồn tại.'});
  var pending=[],group=[],size=0,seq=state.events.length?state.events[state.events.length-1].seq:0;
  function stage(){if(!group.length)return;var payload={input:{fileId:r.input.fileId},changes:group,result:{message:'Nhập lô chuyển đổi.'}};pending.push({seq:++seq,id:Utilities.getUuid(),at:now,actor:user.email,requestId:r.requestId+'_part_'+pending.length,action:'import_file_part',caseId:'',input:payload.input,changes:group,result:payload.result});group=[];size=0;}
  changes.forEach(function(change){var n=JSON.stringify(change).length;if(size+n>35000)stage();group.push(change);size+=n;});stage();
  var result={message:'Đã nhập '+changes.length+' bản ghi mới; bỏ qua '+skipped+' ID đã có. Tất cả hồ sơ lịch sử chờ xác minh.'};
  pending.push({seq:++seq,id:Utilities.getUuid(),at:now,actor:user.email,requestId:r.requestId,action:'import_file',caseId:'',input:{fileId:r.input.fileId},changes:[],result:result});
  var rows=pending.map(function(e){return [e.seq,e.id,e.at,e.actor,e.requestId,e.action,e.caseId,JSON.stringify({input:e.input,changes:e.changes,result:e.result})];});
  var sheet=db_().getSheetByName('NHAT_KY');if(sheet.getMaxRows()<sheet.getLastRow()+rows.length)sheet.insertRowsAfter(sheet.getMaxRows(),sheet.getLastRow()+rows.length-sheet.getMaxRows());
  sheet.getRange(sheet.getLastRow()+1,1,rows.length,8).setNumberFormat('@').setValues(rows);SpreadsheetApp.flush();
  state.events=state.events.concat(pending);project_(state,pending);return result;
}
function settings_(state,user,r){
  if(user.role!=='ADMIN')throw new Error('Cần quyền quản trị.');
  var p=r.input;
  if(p.workerUrl!==undefined){if(p.workerUrl&&!/^https:\/\/[a-zA-Z0-9.-]+(?::\d+)?(?:\/[^?#]*)?$/.test(p.workerUrl))throw new Error('Worker cần URL HTTPS hợp lệ.');props_().setProperty('WORKER_URL',String(p.workerUrl).replace(/\/$/,''));}
  if(p.workerToken){if(String(p.workerToken).length<24)throw new Error('Token worker cần ít nhất 24 ký tự.');props_().setProperty('WORKER_TOKEN',p.workerToken);}
  if(p.remindersEnabled!==undefined)props_().setProperty('REMINDERS_ENABLED',p.remindersEnabled?'true':'false');
  if(p.emailLoginEnabled!==undefined)props_().setProperty('EMAIL_LOGIN_ENABLED',p.emailLoginEnabled?'true':'false');
  if(p.installTriggers){['scheduledReminders_','scheduledPdf_'].forEach(function(name){ScriptApp.getProjectTriggers().filter(function(t){return t.getHandlerFunction()===name;}).forEach(function(t){ScriptApp.deleteTrigger(t);});});
    ScriptApp.newTrigger('scheduledReminders_').timeBased().everyDays(1).atHour(8).inTimezone('Asia/Ho_Chi_Minh').create();
    ScriptApp.newTrigger('scheduledPdf_').timeBased().everyMinutes(10).create();}
  return {message:'Đã lưu cấu hình. Không hiển thị lại khóa. Email chỉ gửi đến cán bộ được bật nhận thông báo.'};
}
function refreshSheetDashboard_(state){
  var ss=db_(),s=ss.getSheetByName('DASHBOARD')||ss.insertSheet('DASHBOARD'),today=ctx_().today;
  var report=Domain.dashboard(state,today,today.slice(0,7)+'-01',today),c=report.counts;
  s.clearContents();
  var rows=[['THEO DÕI HỒ SƠ • HỢP THỊNH',''],['Cập nhật',now_()],['Chỉ tiêu','Số lượng'],['Đang theo dõi chính thức',c.active],['Quá hạn',c.overdue],['Đến hạn hôm nay',c.today],['Sắp đến hạn (1–3 ngày)',c.soon],['Chưa xác định hạn',c.unknownDue],['Chờ nhận bàn giao',c.waitingTransfer],['Chờ trả công dân',c.readyReturn],['Đã đóng',c.closed],['Lịch sử chưa xác minh',c.unverified]];
  s.getRange(1,1,rows.length,2).setValues(rows);
  var staff=[['Cán bộ','Vai trò','Hồ sơ đang phụ trách','Việc đang mở','Việc quá hạn','Đang chờ','Hoàn thành trong tháng','Trong hạn nội bộ','Chờ nhận bàn giao']].concat(report.staff.map(function(u){return [safeCell_(u.name),u.role,u.cases,u.open,u.overdue,u.blocked,u.done,u.onTime,u.waitingReceive];}));
  s.getRange(15,1,staff.length,9).setValues(staff);s.setFrozenRows(3);s.getRange('A1:I1').setBackground('#153f3a').setFontColor('#ffffff');s.getRange('A15:I15').setBackground('#153f3a').setFontColor('#ffffff');s.autoResizeColumns(1,9);
  s.getCharts().forEach(function(chart){s.removeChart(chart);});
  s.insertChart(s.newChart().setChartType(Charts.ChartType.COLUMN).addRange(s.getRange('A4:B12')).setPosition(2,4,0,0).setOption('title','Tổng quan hồ sơ • các chỉ tiêu có thể giao nhau').setOption('legend',{position:'none'}).build());
  ss.setActiveSheet(s);
}
