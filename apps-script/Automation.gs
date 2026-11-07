function workerRequest_(path, method, payload) {
  var base=props_().getProperty('WORKER_URL'), token=props_().getProperty('WORKER_TOKEN');
  if(!base||!/^https:\/\//.test(base)||!token)throw new Error('Chưa cấu hình worker HTTPS và token trong Quản trị.');
  var options={method:method||'get',headers:{Authorization:'Bearer '+token},muteHttpExceptions:true,followRedirects:false};
  if(payload){options.contentType='application/json';options.payload=JSON.stringify(payload);}
  var response=UrlFetchApp.fetch(base+path,options), status=response.getResponseCode();
  if(status<200||status>=300)throw new Error('Worker trả HTTP '+status+'. Kiểm tra cấu hình và nhật ký worker.');
  return JSON.parse(response.getContentText());
}
function hash_(bytes){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,bytes).map(function(x){return ('0'+((x+256)%256).toString(16)).slice(-2);}).join('');}
function uploadPdf_(state,user,r){
  if(['ADMIN','FRONT','SPECIALIST'].indexOf(user.role)<0)throw new Error('Không có quyền tải PDF.');
  var p=r.input, name=String(p.name||'').replace(/[\\/]/g,'_');
  if(!/\.pdf$/i.test(name)||name.length>200)throw new Error('Chỉ nhận tệp PDF, tên tối đa 200 ký tự.');
  var bytes=Utilities.base64Decode(p.base64||'');if(!bytes.length||bytes.length>10*1024*1024)throw new Error('PDF tối đa 10 MB.');
  if(String.fromCharCode.apply(null,bytes.slice(0,5).map(function(x){return (x+256)%256;}))!=='%PDF-')throw new Error('Nội dung không phải PDF.');
  var hash=hash_(bytes), old=state.pdfjobs.find(function(j){return j.hash===hash;});
  if(old)return {message:'Tệp này đã có trong hàng đợi.',jobId:old.id};
  var id=Utilities.getUuid(), job={id:id,fileId:'',hash:hash,status:'NEW',workerId:'',attempts:0,createdAt:now_(),updatedAt:now_(),createdBy:user.email,message:''};
  var file=DriveApp.getFolderById(props_().getProperty('PDF_INBOX_ID')).createFile(Utilities.newBlob(bytes,'application/pdf',name));job.fileId=file.getId();
  // Never put base64 PDF in a Sheets cell or journal. Retain the private file if a projection is interrupted.
  var journalRequest=Object.assign({},r,{input:{name:name,fileId:job.fileId,hash:hash}});
  return mutateSpecial_(state,user,journalRequest,[{table:'pdfjobs',row:job}],{jobId:id,message:'Đã lưu PDF riêng tư vào Drive, chờ worker xử lý.'});
}
function scanPdf_(){
  var state=recover_(), folder=DriveApp.getFolderById(props_().getProperty('PDF_INBOX_ID')),files=folder.getFilesByType('application/pdf'),changes=[],count=0;
  while(files.hasNext()&&count<10){var f=files.next();if(state.pdfjobs.some(function(j){return j.fileId===f.getId();}))continue;
    if(f.getSize()>10*1024*1024)continue;var h=hash_(f.getBlob().getBytes());
    if(state.pdfjobs.concat(changes.map(function(c){return c.row;})).some(function(j){return j.hash===h;}))continue;
    changes.push({table:'pdfjobs',row:{id:Utilities.getUuid(),fileId:f.getId(),hash:h,status:'NEW',workerId:'',attempts:0,createdAt:now_(),updatedAt:now_(),message:''}});count++;
  }
  if(changes.length)commit_(state,{email:'SYSTEM'},'scan_pdf',{},changes,{message:'Đã ghi '+count+' PDF mới.'},Utilities.getUuid());
  return {message:'Đã quét thư mục; thêm '+count+' PDF mới.'};
}
function pollPdf_(){
  var state=recover_(), jobs=state.pdfjobs.filter(function(j){return ['NEW','SUBMITTED','RETRY'].indexOf(j.status)>=0;}).slice(0,5),processed=0;
  jobs.forEach(function(original){
    var j=JSON.parse(JSON.stringify(original)),changes=[];
    try{
      if(!j.workerId){
        var file=DriveApp.getFileById(j.fileId), remote=workerRequest_('/jobs','post',{name:file.getName(),base64:Utilities.base64Encode(file.getBlob().getBytes()),idempotencyKey:j.hash});
        j.workerId=remote.id;j.status='SUBMITTED';
      }else{
        var result=workerRequest_('/jobs/'+encodeURIComponent(j.workerId));
        if(result.status==='DONE'){
          j.status='REVIEW';var reviewId='PDF_'+j.hash;
          if(!state.reviews.some(function(x){return x.id===reviewId;}))changes.push({table:'reviews',row:{id:reviewId,caseId:'',kind:'PDF_EXTRACTION',status:'OPEN',source:j.fileId,message:'Cần kiểm tra trường trích xuất và bằng chứng trang trước khi ghi sổ.',draft:result.result,jobId:j.id}});
        }else if(result.status==='FAILED'){j.status='FAILED';j.message=result.error||'Không đọc được PDF.';}
      }
      j.message=j.status==='FAILED'?j.message:'';j.attempts=0;
    }catch(e){j.attempts=(j.attempts||0)+1;j.status=j.attempts>=3?'FAILED':'RETRY';j.message=String(e.message).slice(0,500);}
    j.updatedAt=now_();changes.push({table:'pdfjobs',row:j});
    commit_(state,{email:'SYSTEM'},'pdf_progress',{},changes,{message:'Đã cập nhật tác vụ PDF.'},Utilities.getUuid());processed++;
  });return {message:'Đã kiểm tra '+processed+' tác vụ. PDF chỉ vào hàng chờ duyệt, chưa tự thay đổi hồ sơ.'};
}
function approvePdf_(state,user,r){
  if(['ADMIN','FRONT'].indexOf(user.role)<0)throw new Error('Cần quyền tiếp nhận để duyệt PDF.');
  var p=r.input, review=state.reviews.find(function(x){return x.id===p.reviewId&&x.kind==='PDF_EXTRACTION';});
  if(!review||review.status!=='OPEN')throw new Error('Phiếu đã duyệt hoặc không tồn tại.');
  var action=p.mode==='CREATE'?'create':p.mode==='PAYMENT'?'add_payment':p.mode==='ADJUST_DUE'?'adjust_due':p.mode==='DOCUMENT'?'add_document':'';
  if(!action)throw new Error('Chọn cách gắn dữ liệu vào sổ.');
  if(action==='adjust_due'&&user.role!=='ADMIN')throw new Error('Điều chỉnh hạn cần quản trị viên/quản lý có quyền.');
  var type=review.draft.document_type;
  if(action==='create'&&type!=='RECEIPT_APPOINTMENT')throw new Error('Chỉ phiếu tiếp nhận/hẹn trả được tạo hồ sơ mới.');
  if(action==='add_payment'&&type!=='PAYMENT_RECEIPT')throw new Error('Chỉ biên lai được ghi nhận khoản thanh toán.');
  if(action==='adjust_due'&&type!=='DEADLINE_CHANGE')throw new Error('Cần tài liệu điều chỉnh hạn.');
  var data=Object.assign({},p.data||{});if(action==='add_document'){data.fileId=review.source;data.name='PDF đã duyệt';data.type=type;}
  var decision=Domain.decide(state,user,action,data,ctx_());
  var caseId=decision.result.caseId;
  if(action!=='add_document')decision.changes.push({table:'documents',row:{id:'DOC_'+review.id,caseId:caseId,fileId:review.source,name:'PDF đã duyệt',type:type,createdAt:now_()}});
  decision.changes.push({table:'reviews',row:Object.assign({},review,{status:'RESOLVED',caseId:caseId,resolvedAt:now_(),resolvedBy:user.email,resolution:'Đã kiểm tra và ghi dữ liệu: '+action})});
  var job=state.pdfjobs.find(function(j){return j.id===review.jobId;});
  if(job)decision.changes.push({table:'pdfjobs',row:Object.assign({},job,{status:'APPROVED',updatedAt:now_()})});
  return mutateSpecial_(state,user,r,decision.changes,{caseId:caseId,message:'Đã duyệt PDF và ghi dữ liệu cùng nhật ký.'});
}
function retryPdf_(state,user,r){
  if(['ADMIN','FRONT'].indexOf(user.role)<0)throw new Error('Cần quyền tiếp nhận.');
  var j=state.pdfjobs.find(function(x){return x.id===r.input.id;});
  if(!j||j.status!=='FAILED')throw new Error('Chỉ thử lại tác vụ đã thất bại.');
  var row=Object.assign({},j,{status:j.workerId?'SUBMITTED':'NEW',attempts:0,message:'',updatedAt:now_()});
  if(j.workerId){var remote=workerRequest_('/jobs/'+encodeURIComponent(j.workerId));if(remote.status==='FAILED')workerRequest_('/jobs/'+encodeURIComponent(j.workerId)+'/retry','post',{});}
  return mutateSpecial_(state,user,r,[{table:'pdfjobs',row:row}],{message:'Đã đưa tác vụ vào hàng đợi thử lại.'});
}
function notificationCandidates_(state,today){
  var output=[];
  state.users.filter(function(u){return u.active&&u.notifications===true;}).forEach(function(u){
    var items=[];
    state.cases.filter(function(c){return c.owner===u.email&&c.status!=='CLOSED'&&c.status!=='UNVERIFIED';}).forEach(function(c){
      var ds=Domain.dueState(c,today);if(['OVERDUE','TODAY','SOON'].indexOf(ds)>=0)items.push({caseId:c.id,code:c.code||c.id,type:ds,due:c.due});
      if(c.status==='FRONT_READY')items.push({caseId:c.id,code:c.code||c.id,type:'WAITING_RETURN',due:''});
    });
    state.transfers.filter(function(t){return t.to===u.email&&t.status==='PENDING';}).forEach(function(t){items.push({caseId:t.caseId,code:t.caseId,type:'WAITING_RECEIVE',due:''});});
    state.tasks.filter(function(t){return t.assignee===u.email&&['DONE','CANCELLED'].indexOf(t.status)<0&&t.due<=today;}).forEach(function(t){items.push({caseId:t.caseId,code:t.id,type:'TASK_DUE',due:t.due});});
    if(['ADMIN','MANAGER'].indexOf(u.role)>=0)state.cases.filter(function(c){return Domain.dueState(c,today)==='OVERDUE'&&c.owner!==u.email;}).forEach(function(c){items.push({caseId:c.id,code:c.code||c.id,type:'OVERDUE',due:c.due});});
    var id='MAIL_'+today+'_'+u.id;
    var old=state.notifications.find(function(n){return n.id===id;});
    if(items.length&&(!old||old.status==='FAILED'))output.push({id:id,to:u.email,name:u.name,date:today,items:items});
  });return output;
}
function sendReminders_(){
  if(props_().getProperty('REMINDERS_ENABLED')!=='true')return {message:'Email đang tắt. Chưa gửi thông báo.'};
  var state=recover_(), today=ctx_().today, candidates=notificationCandidates_(state,today),sent=0,failed=0;
  candidates.slice(0,30).forEach(function(n){
    if(MailApp.getRemainingDailyQuota()<1)return;
    var row={id:n.id,to:n.to,date:today,status:'SENDING',attempts:1,message:'Đang gửi. Trạng thái không chắc chắn cần kiểm tra thủ công trước khi gửi lại.'};
    // Reserve before sending. A crash never silently duplicates an email.
    commit_(state,{email:'SYSTEM'},'notification_reserved',{},[{table:'notifications',row:row}],{message:'Đã giữ lượt gửi.'},Utilities.getUuid());
    try{
      var labels={OVERDUE:'Hồ sơ quá hạn',TODAY:'Hồ sơ đến hạn hôm nay',SOON:'Hồ sơ sắp đến hạn',WAITING_RETURN:'Chờ trả công dân',WAITING_RECEIVE:'Chờ xác nhận nhận bàn giao',TASK_DUE:'Công việc đến/quá hạn'};
      var body='Công việc cần kiểm tra ngày '+today+'\n\n'+n.items.map(function(x){return '- '+(labels[x.type]||x.type)+': '+x.code+(x.due?' | hạn '+x.due:'');}).join('\n')+'\n\nMở ứng dụng nội bộ để xem chi tiết. Email không chứa tên, số điện thoại hoặc nội dung hồ sơ.';
      MailApp.sendEmail({to:n.to,subject:'[Hồ sơ] Công việc cần kiểm tra '+today,body:body,name:'Theo dõi hồ sơ Hợp Thịnh'});row.status='SENT';row.message='Đã gửi';sent++;
    }catch(e){row.status='UNCERTAIN';row.message='Chưa xác định kết quả gửi. Kiểm tra trước khi thử lại.';failed++;}
    commit_(state,{email:'SYSTEM'},'notification_result',{},[{table:'notifications',row:row}],{message:row.message},Utilities.getUuid());
  });return {message:'Đã gửi '+sent+' email; '+failed+' lượt cần kiểm tra.'};
}
function scheduledReminders_(){locked_(function(){sendReminders_();});}
function scheduledPdf_(){locked_(function(){scanPdf_();pollPdf_();});}
