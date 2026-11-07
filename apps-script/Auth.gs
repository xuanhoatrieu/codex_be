/* Optional email-code sessions for personal Gmail accounts.
 * Deploy as owner; never grant staff direct access to the private data workbook.
 * Disabled until an administrator explicitly enables EMAIL_LOGIN_ENABLED.
 */
function digestText_(s){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(s),Utilities.Charset.UTF_8).map(function(x){return ('0'+((x+256)%256).toString(16)).slice(-2);}).join('');}
function cache_(){return CacheService.getScriptCache();}
function emailLoginBegin_(state,input){
  if(props_().getProperty('EMAIL_LOGIN_ENABLED')!=='true')throw new Error('Đăng nhập mã email chưa được quản trị viên bật.');
  var email=String(input.email||'').trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>200)throw new Error('Email không hợp lệ.');
  var cache=cache_(),bucket=String(Math.floor(Date.now()/900000)),key='OTP_RATE_'+digestText_(email)+'_'+bucket,globalKey='OTP_GLOBAL_'+bucket;
  var perEmail=Number(cache.get(key)||0),globalCount=Number(cache.get(globalKey)||0);
  if(perEmail>=3||globalCount>=30)throw new Error('Đã đạt giới hạn yêu cầu mã. Vui lòng thử lại sau 15 phút.');
  cache.put(key,String(perEmail+1),1000);cache.put(globalKey,String(globalCount+1),1000);
  var id=Utilities.getUuid(),user=state.users.find(function(u){return u.email===email&&u.active;});
  if(user){
    if(MailApp.getRemainingDailyQuota()<1)throw new Error('Tài khoản vận hành đã hết hạn mức gửi email hôm nay.');
    var code=('000000'+(parseInt(Utilities.getUuid().replace(/-/g,'').slice(0,12),16)%1000000)).slice(-6);
    cache.put('OTP_'+id,JSON.stringify({email:email,hash:digestText_(id+':'+code),tries:0,expires:Date.now()+600000}),600);
    MailApp.sendEmail({to:email,subject:'[Hồ sơ] Mã đăng nhập ứng dụng',body:'Mã đăng nhập của bạn: '+code+'\nMã có hiệu lực tối đa 10 phút và chỉ dùng một lần.\nNhập mã trực tiếp trong ứng dụng hồ sơ. Không gửi mã trong chat hoặc cho người khác.\nNếu bạn không yêu cầu đăng nhập, bỏ qua email này.',name:'Theo dõi hồ sơ Hợp Thịnh'});
  }
  return {challenge:id,message:'Nếu email đã được cấp quyền, mã đăng nhập sẽ được gửi tới hộp thư. Mã dùng một lần, tối đa 10 phút.'};
}
function emailLoginVerify_(state,input){
  if(props_().getProperty('EMAIL_LOGIN_ENABLED')!=='true')throw new Error('Đăng nhập mã email đang tắt.');
  var challenge=String(input.challenge||''),code=String(input.code||'').trim(),cache=cache_(),raw=cache.get('OTP_'+challenge);
  if(!raw)throw new Error('Mã không hợp lệ hoặc đã hết hạn. Yêu cầu mã mới.');
  var data=JSON.parse(raw);if(data.expires<Date.now()||data.tries>=5){cache.remove('OTP_'+challenge);throw new Error('Mã đã hết hạn hoặc quá số lần thử.');}
  if(!/^\d{6}$/.test(code)||digestText_(challenge+':'+code)!==data.hash){data.tries++;if(data.tries>=5)cache.remove('OTP_'+challenge);else cache.put('OTP_'+challenge,JSON.stringify(data),Math.max(1,Math.floor((data.expires-Date.now())/1000)));throw new Error('Mã không đúng. Tối đa 5 lần thử.');}
  Domain.activeUser(state,data.email);cache.remove('OTP_'+challenge);
  var token=Utilities.getUuid()+Utilities.getUuid();cache.put('SESSION_'+digestText_(token),JSON.stringify({email:data.email,expires:Date.now()+21600000}),21600);
  return {token:token,message:'Đăng nhập thành công. Phiên tối đa 6 giờ.'};
}
function emailSession_(token){
  if(!token||props_().getProperty('EMAIL_LOGIN_ENABLED')!=='true')return '';
  var raw=cache_().get('SESSION_'+digestText_(String(token)));if(!raw)return '';
  var data=JSON.parse(raw);return data.expires>Date.now()?data.email:'';
}
