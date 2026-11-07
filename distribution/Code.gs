// Hồ sơ Hợp Thịnh. Paste into Code.gs of a NEW Apps Script project.
// Run initializeEnvironment once from the editor, then deploy as documented.

var APP_HTML = "<!doctype html>\n<html lang=\"vi\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>H\u1ed3 s\u01a1 \u2022 H\u1ee3p Th\u1ecbnh</title>\n<style>\n:root{--ink:#153f3a;--brand:#187b65;--bg:#f4f6f3;--line:#dce5df;--muted:#60736e;--red:#b13f35;--amber:#946916}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:#183831;font:14px/1.55 system-ui,-apple-system,sans-serif}button,input,select,textarea{font:inherit}button{cursor:pointer;border:1px solid var(--line);background:white;border-radius:8px;padding:9px 13px;color:var(--ink)}button:hover{border-color:var(--brand);background:#edf5f0}button:disabled{opacity:.5;cursor:wait}.primary{background:var(--brand);color:white;border-color:var(--brand)}.primary:hover{background:var(--ink);color:white}.danger{color:var(--red)}header{background:var(--ink);color:white;padding:20px 32px;display:flex;align-items:center;justify-content:space-between;gap:15px}header h1{font-size:21px;margin:0}header small{color:#bdd8cb}header button{background:transparent;color:white;border-color:#50746b}nav{background:white;display:flex;gap:6px;padding:12px 32px;border-bottom:1px solid var(--line);overflow:auto}nav button{white-space:nowrap;border-color:transparent}nav button.active{background:#e5f1e9;color:var(--brand);font-weight:700}main{max-width:1500px;margin:0 auto;padding:26px 32px}.topline,.toolbar,.actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}h2{font-size:22px;margin:0 0 6px}h3{font-size:17px;margin:0 0 12px}p{margin:7px 0}.muted{color:var(--muted)}.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:22px 0}.card,.panel{background:white;border:1px solid var(--line);border-radius:12px;padding:18px}.card span{display:block;color:var(--muted)}.card b{font-size:32px;display:block;margin-top:7px}.card button{margin-top:8px;padding:4px 8px;font-size:12px}.red{color:var(--red)}.amber{color:var(--amber)}.grid{display:grid;grid-template-columns:1.3fr 1fr;gap:18px}.panel{margin:16px 0}.scroll{overflow:auto}table{width:100%;border-collapse:collapse;white-space:nowrap}th,td{text-align:left;padding:11px 10px;border-bottom:1px solid #edf1ed;font-size:13px}th{background:#f7f9f6;color:var(--muted);font-size:12px}td.wrap{white-space:normal;min-width:160px}.badge{display:inline-block;padding:3px 8px;background:#edf3ef;color:var(--ink);border-radius:6px;font-size:12px}.badge.OVERDUE,.badge.BLOCKED{background:#fce9e5;color:var(--red)}.badge.TODAY,.badge.SOON,.badge.PENDING{background:#fff3d9;color:var(--amber)}.badge.UNVERIFIED,.badge.UNKNOWN{background:#edf0f4;color:#617084}.barrow{display:grid;grid-template-columns:170px 1fr 40px;align-items:center;gap:10px;margin:11px 0}.bar{height:10px;background:#edf2ed;border-radius:6px;overflow:hidden}.bar i{display:block;height:100%;background:var(--brand);border-radius:6px}.filters{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}.filters input,.filters select{width:auto;min-width:130px;max-width:240px}.notice{border-left:4px solid #caa55a;background:#fff8e8;padding:12px 16px;border-radius:5px;margin:14px 0}.empty{padding:32px;text-align:center;color:var(--muted)}.link{border:0;background:transparent;color:var(--brand);padding:0;text-decoration:underline;text-align:left}.link:hover{background:transparent}dialog{border:1px solid var(--line);border-radius:14px;padding:0;width:min(850px,95vw);max-height:90vh;color:var(--ink)}dialog::backdrop{background:#112f2a88}.dialoghead{display:flex;justify-content:space-between;align-items:center;padding:17px 22px;border-bottom:1px solid var(--line)}.dialogbody{padding:20px 22px;overflow:auto;max-height:76vh}.formgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}label{display:block;font-size:13px;color:var(--muted)}input,select,textarea{display:block;width:100%;border:1px solid #cbd8cf;border-radius:7px;padding:9px 10px;margin-top:5px;background:white;color:#183831}textarea{min-height:80px;resize:vertical}.wide{grid-column:1/-1}input[type=checkbox]{display:inline-block;width:auto}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;background:#f4f6f3;padding:12px;border-radius:7px}.footer{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}#toast{position:fixed;bottom:20px;right:24px;max-width:min(550px,90vw);padding:14px 20px;border:1px solid #bdd3c7;border-radius:10px;background:#153f3a;color:white;z-index:20;display:none}#loading{font-size:12px;color:#c6dccf}.detailgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.timeline{border-left:2px solid var(--line);padding-left:15px;margin:14px}.timeline p{font-size:13px}.pagination{display:flex;justify-content:flex-end;gap:12px;align-items:center;margin-top:12px}a{color:var(--brand)}.error{color:var(--red);white-space:pre-wrap}.demo{background:#fff3d9;text-align:center;padding:7px;color:#76531a}.small{font-size:12px}@media(max-width:800px){main{padding:18px 14px}header,nav{padding:14px}.cards{grid-template-columns:repeat(2,1fr)}.grid,.formgrid,.detailgrid{grid-template-columns:1fr}.wide{grid-column:auto}.barrow{grid-template-columns:120px 1fr 30px}header h1{font-size:18px}}\n</style></head><body>\n<header><div><small>B\u1ed8 PH\u1eacN M\u1ed8T C\u1eecA \u00b7 CHUY\u00caN M\u00d4N</small><h1>Theo d\u00f5i h\u1ed3 s\u01a1 \u00b7 H\u1ee3p Th\u1ecbnh</h1></div><div><span id=\"loading\"></span><span id=\"account\">\u0110ang x\u00e1c th\u1ef1c\u2026</span> <button id=\"logoutButton\" style=\"display:none\" onclick=\"logout()\">K\u1ebft th\u00fac phi\u00ean</button> <button onclick=\"load()\">\u21bb T\u1ea3i l\u1ea1i</button></div></header>\n<nav id=\"nav\"></nav><main id=\"main\"><div class=\"panel\">\u0110ang k\u1ebft n\u1ed1i s\u1ed5 h\u1ed3 s\u01a1\u2026</div></main>\n<dialog id=\"modal\"><div class=\"dialoghead\"><h3 id=\"modalTitle\"></h3><button onclick=\"closeModal()\" aria-label=\"\u0110\u00f3ng\">\u2715</button></div><div class=\"dialogbody\" id=\"modalBody\"></div></dialog><div id=\"toast\" role=\"status\"></div>\n<script>\n'use strict';\nconst $=id=>document.getElementById(id), esc=v=>String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]));\nconst LABEL={NEW:'Ch\u1edd \u0111\u1ecdc',SUBMITTED:'\u0110ang \u0111\u1ecdc',RETRY:'Ch\u1edd th\u1eed l\u1ea1i',FAILED:'\u0110\u1ecdc th\u1ea5t b\u1ea1i',REVIEW:'Ch\u1edd duy\u1ec7t',RESOLVED:'\u0110\u00e3 \u0111\u1ed1i so\u00e1t',UNVERIFIED:'Ch\u01b0a x\u00e1c minh',MERGED:'\u0110\u00e3 h\u1ee3p nh\u1ea5t',RECEIVED:'\u0110\u00e3 ti\u1ebfp nh\u1eadn',TRANSFER_WAIT:'Ch\u1edd chuy\u00ean m\u00f4n nh\u1eadn',PROCESSING:'\u0110ang x\u1eed l\u00fd',RESULT_READY:'C\u00f3 k\u1ebft qu\u1ea3 chuy\u00ean m\u00f4n',RETURN_WAIT:'Ch\u1edd m\u1ed9t c\u1eeda nh\u1eadn k\u1ebft qu\u1ea3',FRONT_READY:'Ch\u1edd tr\u1ea3 c\u00f4ng d\u00e2n',CLOSED:'\u0110\u00e3 \u0111\u00f3ng',UNKNOWN:'Ch\u01b0a x\u00e1c \u0111\u1ecbnh h\u1ea1n',OVERDUE:'Qu\u00e1 h\u1ea1n',TODAY:'\u0110\u1ebfn h\u1ea1n h\u00f4m nay',SOON:'S\u1eafp \u0111\u1ebfn h\u1ea1n',ON_TIME:'Trong h\u1ea1n',TODO:'Ch\u01b0a b\u1eaft \u0111\u1ea7u',DOING:'\u0110ang l\u00e0m',BLOCKED:'\u0110ang ch\u1edd',DONE:'Ho\u00e0n th\u00e0nh',CANCELLED:'\u0110\u00e3 h\u1ee7y',PENDING:'Ch\u1edd nh\u1eadn',ACCEPTED:'\u0110\u00e3 nh\u1eadn',REJECTED:'Kh\u00f4ng nh\u1eadn',APPROVED:'C\u1ea5p k\u1ebft qu\u1ea3',REFUSED:'T\u1eeb ch\u1ed1i',WITHDRAWN:'C\u00f4ng d\u00e2n r\u00fat',ADMIN:'Qu\u1ea3n tr\u1ecb',MANAGER:'Qu\u1ea3n l\u00fd',FRONT:'M\u1ed9t c\u1eeda',SPECIALIST:'Chuy\u00ean m\u00f4n',create:'Ti\u1ebfp nh\u1eadn',handoff:'B\u00e0n giao chuy\u00ean m\u00f4n',accept_transfer:'X\u00e1c nh\u1eadn nh\u1eadn',reject_transfer:'Kh\u00f4ng nh\u1eadn b\u00e0n giao',assign_task:'Giao vi\u1ec7c',update_task:'C\u1eadp nh\u1eadt c\u00f4ng vi\u1ec7c',record_result:'Ghi k\u1ebft qu\u1ea3',return_result:'B\u00e0n giao k\u1ebft qu\u1ea3',close:'Tr\u1ea3 c\u00f4ng d\u00e2n',adjust_due:'\u0110i\u1ec1u ch\u1ec9nh h\u1ea1n',reopen:'M\u1edf l\u1ea1i',verify_case:'X\u00e1c minh d\u1eef li\u1ec7u c\u0169',approve_pdf:'Duy\u1ec7t PDF',add_payment:'Ghi bi\u00ean lai',add_document:'G\u1eafn t\u00e0i li\u1ec7u',add_parcel:'Th\u00eam th\u1eeda \u0111\u1ea5t',merge_legacy:'H\u1ee3p nh\u1ea5t b\u1ea3n tr\u00f9ng'};\nlet SESSION='';try{SESSION=sessionStorage.getItem('hoso_session')||'';}catch{}\nlet DATA=null,TAB='overview',FILTER={},PAGE=0,BUSY=0,DETAIL=null,IMPORTING=false;\nfunction badge(v){return '<span class=\"badge '+esc(v)+'\">'+esc(LABEL[v]||v)+'</span>';}\nfunction person(email){return DATA?.users.find(u=>u.email===email)?.name||email||'Ch\u01b0a ph\u00e2n c\u00f4ng';}\nfunction proc(id){return DATA?.procedures.find(p=>p.id===id)?.name||id||'Ch\u01b0a \u0111\u1ed1i so\u00e1t';}\nfunction fmt(d){return /^\\d{4}-\\d{2}-\\d{2}$/.test(d||'')?d.split('-').reverse().join('/'):esc(d||'\u2014');}\nfunction req(action,input={}){return {action,input,sessionToken:SESSION,requestId:crypto.randomUUID()};}\nfunction rpc(request){BUSY++;$('loading').textContent='\u0110ang x\u1eed l\u00fd\u2026 ';return new Promise((resolve,reject)=>{\n  const done=fn=>v=>{BUSY--;$('loading').textContent=BUSY?'\u0110ang x\u1eed l\u00fd\u2026 ':'';fn(v);};\n  if(window.google?.script?.run)google.script.run.withSuccessHandler(done(resolve)).withFailureHandler(done(e=>reject(new Error(e.message||e)))).api(request);\n  else if(location.hostname==='127.0.0.1'||location.hostname==='localhost')fetch('/api',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(request)}).then(async r=>{let v=await r.json();if(!r.ok)throw new Error(v.error||'L\u1ed7i m\u00e1y ch\u1ee7');return v;}).then(done(resolve),done(reject));\n  else done(reject)(new Error('M\u1edf giao di\u1ec7n qua b\u1ea3n tri\u1ec3n khai Apps Script.'));\n});}\nfunction toast(message){$('toast').textContent=message;$('toast').style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('toast').style.display='none',7000);}\nfunction showModal(title,html){$('modalTitle').textContent=title;$('modalBody').innerHTML=html;if(!$('modal').open)$('modal').showModal();}\nfunction closeModal(){$('modal').close();}\nfunction option(v,label,selected=''){return '<option value=\"'+esc(v)+'\" '+(v===selected?'selected':'')+'>'+esc(label)+'</option>';}\nfunction selectOptions(values,selected){return values.map(v=>option(v,LABEL[v]||v,selected)).join('');}\nfunction userOptions(roles){return DATA.users.filter(u=>!roles||roles.includes(u.role)).map(u=>option(u.email,u.name+' \u00b7 '+(LABEL[u.role]||u.role))).join('');}\nfunction procedureOptions(){return DATA.procedures.filter(p=>p.active).map(p=>option(p.id,p.name)).join('');}\nfunction field(name,label,type='text',value='',required=true,extra=''){return '<label>'+esc(label)+'<input name=\"'+esc(name)+'\" type=\"'+type+'\" value=\"'+esc(value)+'\" '+(required?'required':'')+' '+extra+'></label>';}\nfunction select(name,label,options){return '<label>'+esc(label)+'<select name=\"'+esc(name)+'\" required>'+options+'</select></label>';}\nfunction area(name,label,value='',required=true){return '<label class=\"wide\">'+esc(label)+'<textarea name=\"'+esc(name)+'\" '+(required?'required':'')+'>'+esc(value)+'</textarea></label>';}\nasync function load(){try{DATA=await rpc(req('bootstrap',FILTER));$('account').textContent=DATA.user.name+' \u00b7 '+LABEL[DATA.user.role];$('logoutButton').style.display=SESSION?'inline-block':'none';render();}catch(e){DATA=null;$('nav').innerHTML='';if(/email|t\u00e0i kho\u1ea3n|\u0111\u0103ng nh\u1eadp|ph\u00e2n quy\u1ec1n/i.test(e.message)){showLogin(e.message);return;}$('main').innerHTML='<div class=\"panel\"><h2>Ch\u01b0a k\u1ebft n\u1ed1i \u0111\u01b0\u1ee3c s\u1ed5 h\u1ed3 s\u01a1</h2><p class=\"error\">'+esc(e.message)+'</p><p>Qu\u1ea3n tr\u1ecb vi\u00ean c\u1ea7n kh\u1edfi t\u1ea1o \u1ee9ng d\u1ee5ng v\u00e0 ph\u00e2n quy\u1ec1n email. Kh\u00f4ng g\u1eedi m\u1eadt kh\u1ea9u ho\u1eb7c kh\u00f3a API qua bi\u1ec3u m\u1eabu n\u00e0y.</p></div>';}}\nfunction setSession(token){SESSION=token;try{if(token)sessionStorage.setItem('hoso_session',token);else sessionStorage.removeItem('hoso_session');}catch{}}\nfunction showLogin(message=''){closeModal();$('account').textContent='Ch\u01b0a \u0111\u0103ng nh\u1eadp';$('main').innerHTML='<section class=\"panel\" style=\"max-width:550px;margin:40px auto\"><h2>\u0110\u0103ng nh\u1eadp c\u00e1n b\u1ed9</h2><p class=\"muted\">D\u00f9ng email \u0111\u00e3 \u0111\u01b0\u1ee3c qu\u1ea3n tr\u1ecb vi\u00ean ph\u00e2n quy\u1ec1n. Kh\u00f4ng nh\u1eadp m\u1eadt kh\u1ea9u Google.</p><p class=\"error\">'+esc(message)+'</p><form id=\"loginEmailForm\"><label>Email<input id=\"loginEmail\" type=\"email\" required autocomplete=\"email\"></label><button class=\"primary\" id=\"loginSend\" style=\"margin-top:16px\">Nh\u1eadn m\u00e3 \u0111\u0103ng nh\u1eadp</button></form><form id=\"loginCodeForm\" style=\"display:none\"><label>M\u00e3 6 ch\u1eef s\u1ed1 t\u1eeb email<input id=\"loginCode\" inputmode=\"numeric\" pattern=\"[0-9]{6}\" maxlength=\"6\" required autocomplete=\"one-time-code\"></label><button class=\"primary\" style=\"margin-top:16px\">\u0110\u0103ng nh\u1eadp</button></form><p id=\"loginMessage\" role=\"status\"></p></section>';$('loginEmailForm').onsubmit=async e=>{e.preventDefault();$('loginSend').disabled=true;try{const r=await rpc(req('login_begin',{email:$('loginEmail').value}));window.loginChallenge=r.challenge;$('loginMessage').textContent=r.message;$('loginCodeForm').style.display='block';}catch(err){$('loginMessage').textContent=err.message;}finally{$('loginSend').disabled=false;}};$('loginCodeForm').onsubmit=async e=>{e.preventDefault();try{const r=await rpc(req('login_verify',{challenge:window.loginChallenge,code:$('loginCode').value}));setSession(r.token);await load();}catch(err){$('loginMessage').textContent=err.message;}};}\nasync function logout(){try{await rpc(req('logout'));}catch{}setSession('');DATA=null;$('nav').innerHTML='';showLogin('Phi\u00ean m\u00e3 email \u0111\u00e3 k\u1ebft th\u00fac.');}\nfunction setTab(t){TAB=t;PAGE=0;render();}\nfunction render(){const tabs=[['overview','T\u1ed5ng quan'],['cases','S\u1ed5 h\u1ed3 s\u01a1'],['tasks','C\u00f4ng vi\u1ec7c'],['transfers','B\u00e0n giao'],['staff','Ti\u1ebfn \u0111\u1ed9 c\u00e1n b\u1ed9']];if(['ADMIN','FRONT','MANAGER'].includes(DATA.user.role))tabs.push(['reviews','\u0110\u1ed1i so\u00e1t & PDF']);if(DATA.user.role==='ADMIN')tabs.push(['admin','Qu\u1ea3n tr\u1ecb']);\n $('nav').innerHTML=tabs.map(([id,label])=>'<button class=\"'+(TAB===id?'active':'')+'\" onclick=\"setTab(\\''+id+'\\')\">'+label+'</button>').join('');\n ({overview:overview,cases:casesView,tasks:tasksView,transfers:transfersView,staff:staffView,reviews:reviewsView,admin:adminView}[TAB]||overview)();}\nfunction filters(){return '<div class=\"filters\"><input id=\"search\" placeholder=\"M\u00e3 h\u1ed3 s\u01a1, t\u00ean, \u0111i\u1ec7n tho\u1ea1i\" value=\"'+esc(FILTER.q||'')+'\" onkeydown=\"if(event.key===\\'Enter\\')applyFilters()\"><select id=\"filterOwner\">'+option('','T\u1ea5t c\u1ea3 c\u00e1n b\u1ed9')+DATA.users.map(u=>option(u.email,u.name,FILTER.owner)).join('')+'</select><select id=\"filterProcedure\">'+option('','T\u1ea5t c\u1ea3 th\u1ee7 t\u1ee5c')+DATA.procedures.map(p=>option(p.id,p.name,FILTER.procedure)).join('')+'</select><select id=\"filterStatus\">'+option('','T\u1ea5t c\u1ea3 tr\u1ea1ng th\u00e1i')+selectOptions(['UNVERIFIED','MERGED','RECEIVED','TRANSFER_WAIT','PROCESSING','RESULT_READY','RETURN_WAIT','FRONT_READY','CLOSED'],FILTER.status)+'</select><select id=\"filterDue\">'+option('','T\u1ea5t c\u1ea3 th\u1eddi h\u1ea1n')+selectOptions(['OVERDUE','TODAY','SOON','ON_TIME','UNKNOWN'],FILTER.dueState)+'</select><button onclick=\"applyFilters()\">L\u1ecdc</button><button onclick=\"clearFilters()\">X\u00f3a l\u1ecdc</button></div>';}\nfunction applyFilters(){FILTER={...FILTER,q:$('search').value,owner:$('filterOwner').value,procedure:$('filterProcedure').value,status:$('filterStatus').value,dueState:$('filterDue').value};PAGE=0;load();}\nfunction clearFilters(){FILTER={};PAGE=0;load();}\nfunction filterCard(type,value){FILTER={};FILTER[type]=value;TAB='cases';PAGE=0;load();}\nfunction caseTable(rows){return '<div class=\"scroll\"><table><thead><tr><th>M\u00e3 h\u1ed3 s\u01a1</th><th>Ng\u01b0\u1eddi n\u1ed9p</th><th>Th\u1ee7 t\u1ee5c</th><th>Ph\u1ee5 tr\u00e1ch</th><th>H\u1ea1n h\u1eb9n</th><th>Tr\u1ea1ng th\u00e1i</th><th>Th\u1eddi h\u1ea1n</th></tr></thead><tbody>'+rows.map(c=>'<tr><td><button class=\"link\" onclick=\"openCase(\\''+esc(c.id)+'\\')\">'+esc(c.code||c.id)+'</button></td><td>'+esc(c.name)+'</td><td class=\"wrap\">'+esc(proc(c.procedure))+'</td><td>'+esc(person(c.owner))+'</td><td>'+fmt(c.due)+'</td><td>'+badge(c.status)+'</td><td>'+badge(c.dueState||'UNKNOWN')+'</td></tr>').join('')+'</tbody></table>'+(rows.length?'':'<div class=\"empty\">Kh\u00f4ng c\u00f3 h\u1ed3 s\u01a1 trong nh\u00f3m n\u00e0y.</div>')+'</div>';}\nfunction overview(){let d=DATA.dashboard,c=d.counts;const cards=[['\u0110ang theo d\u00f5i',c.active,'status','PROCESSING',''],['Qu\u00e1 h\u1ea1n',c.overdue,'dueState','OVERDUE','red'],['\u0110\u1ebfn h\u1ea1n h\u00f4m nay',c.today,'dueState','TODAY','amber'],['S\u1eafp \u0111\u1ebfn h\u1ea1n',c.soon,'dueState','SOON','amber'],['Ch\u1edd nh\u1eadn b\u00e0n giao',c.waitingTransfer,'tab','transfers',''],['Ch\u1edd tr\u1ea3 c\u00f4ng d\u00e2n',c.readyReturn,'status','FRONT_READY',''],['Ch\u01b0a x\u00e1c \u0111\u1ecbnh h\u1ea1n',c.unknownDue,'dueState','UNKNOWN',''],['L\u1ecbch s\u1eed ch\u01b0a x\u00e1c minh',c.unverified,'status','UNVERIFIED','']];\n let counts={};DATA.cases.filter(x=>x.status!=='UNVERIFIED').forEach(x=>counts[x.status]=(counts[x.status]||0)+1);let max=Math.max(1,...Object.values(counts));\n $('main').innerHTML='<div class=\"topline\"><div><h2>T\u1ed5ng quan h\u1ed3 s\u01a1</h2><p class=\"muted\">Ng\u00e0y '+fmt(DATA.today)+' \u00b7 K\u1ef3 b\u00e1o c\u00e1o '+fmt(d.from)+' \u2013 '+fmt(d.to)+'</p></div><button class=\"primary\" onclick=\"newCase()\">+ Ti\u1ebfp nh\u1eadn h\u1ed3 s\u01a1</button></div>'+filters()+'<div class=\"cards\">'+cards.map(([label,n,type,value,color])=>'<div class=\"card\"><span>'+label+'</span><b class=\"'+color+'\">'+n+'</b>'+(label==='\u0110ang theo d\u00f5i'?'<button onclick=\"setTab(\\'cases\\')\">M\u1edf s\u1ed5 h\u1ed3 s\u01a1 \u2192</button>':type==='tab'?'<button onclick=\"setTab(\\''+value+'\\')\">Xem danh s\u00e1ch \u2192</button>':'<button onclick=\"filterCard(\\''+type+'\\',\\''+value+'\\')\">Xem danh s\u00e1ch \u2192</button>')+'</div>').join('')+'</div><div class=\"grid\"><section class=\"panel\"><h3>H\u1ed3 s\u01a1 theo tr\u1ea1ng th\u00e1i</h3>'+Object.entries(counts).map(([s,n])=>'<div class=\"barrow\"><span>'+esc(LABEL[s])+'</span><div class=\"bar\"><i style=\"width:'+n/max*100+'%\"></i></div><b>'+n+'</b></div>').join('')+(Object.keys(counts).length?'':'<p class=\"muted\">Ch\u01b0a c\u00f3 h\u1ed3 s\u01a1 \u0111\u00e3 x\u00e1c minh.</p>')+'</section><section class=\"panel\"><h3>Bi\u1ebfn \u0111\u1ed9ng trong k\u1ef3</h3><p>T\u1ed3n \u0111\u1ea7u k\u1ef3 theo nh\u1eadt k\u00fd: <b>'+d.period.opening+'</b></p><p>Ti\u1ebfp nh\u1eadn m\u1edbi: <b>'+d.period.intakes+'</b></p><p>X\u00e1c minh h\u1ed3 s\u01a1 l\u1ecbch s\u1eed: <b>'+d.period.verifiedLegacy+'</b></p><p>B\u1ed5 sung t\u1ed3n t\u1eeb l\u1ecbch s\u1eed \u0111\u00e3 x\u00e1c minh: <b>'+d.period.verifiedOpen+'</b></p><p>T\u1ed3n cu\u1ed1i k\u1ef3 theo nh\u1eadt k\u00fd: <b>'+d.period.ending+'</b></p><p>C\u00f3 k\u1ebft qu\u1ea3 chuy\u00ean m\u00f4n: <b>'+d.period.results+'</b></p><p>Tr\u1ea3 c\u00f4ng d\u00e2n / \u0111\u00f3ng: <b>'+d.period.closed+'</b></p><p>M\u1edf l\u1ea1i: <b>'+d.period.reopened+'</b></p><p>L\u01b0\u1ee3t ho\u00e0n th\u00e0nh c\u00f4ng vi\u1ec7c: <b>'+d.period.taskCompletions+'</b></p><p class=\"muted small\">S\u1ed1 li\u1ec7u k\u1ef3 theo nh\u1eadt k\u00fd; d\u1eef li\u1ec7u c\u0169 ch\u01b0a c\u00f3 l\u1ecbch s\u1eed kh\u00f4ng \u0111\u01b0\u1ee3c d\u1ef1ng l\u1ea1i.</p><button onclick=\"periodForm()\">Ch\u1ecdn k\u1ef3 / ch\u1ed1t b\u00e1o c\u00e1o</button> <button onclick=\"snapshotsForm()\">B\u00e1o c\u00e1o \u0111\u00e3 ch\u1ed1t</button></section></div><div class=\"notice\">'+esc(d.note)+'</div><section class=\"panel\"><h3>C\u1ea7n ki\u1ec3m tra h\u00f4m nay</h3>'+caseTable(DATA.cases.filter(c=>['OVERDUE','TODAY'].includes(c.dueState)||c.status==='FRONT_READY').slice(0,20))+'</section>';}\nfunction casesView(){$('main').innerHTML='<div class=\"topline\"><div><h2>S\u1ed5 h\u1ed3 s\u01a1 th\u1ed1ng nh\u1ea5t</h2><p class=\"muted\">'+DATA.cases.length+' h\u1ed3 s\u01a1 theo b\u1ed9 l\u1ecdc hi\u1ec7n t\u1ea1i</p></div><div class=\"actions\"><button onclick=\"exportCases()\">Xu\u1ea5t CSV</button><button class=\"primary\" onclick=\"newCase()\">+ Ti\u1ebfp nh\u1eadn</button></div></div>'+filters()+'<section class=\"panel\">'+caseTable(DATA.cases.slice(PAGE*40,(PAGE+1)*40))+'<div class=\"pagination\"><button onclick=\"PAGE=Math.max(0,PAGE-1);casesView()\" '+(PAGE?'':'disabled')+'>Tr\u01b0\u1edbc</button><span>Trang '+(PAGE+1)+' / '+Math.max(1,Math.ceil(DATA.cases.length/40))+'</span><button onclick=\"PAGE++;casesView()\" '+((PAGE+1)*40<DATA.cases.length?'':'disabled')+'>Sau</button></div></section>';}\nfunction tasksView(){$('main').innerHTML='<h2>C\u00f4ng vi\u1ec7c</h2><p class=\"muted\">Giao vi\u1ec7c trong chi ti\u1ebft h\u1ed3 s\u01a1. H\u1ea1n c\u00f4ng vi\u1ec7c t\u00e1ch ri\u00eang h\u1ea1n h\u1eb9n tr\u1ea3 k\u1ebft qu\u1ea3.</p><section class=\"panel\"><div class=\"scroll\"><table><thead><tr><th>C\u00f4ng vi\u1ec7c</th><th>H\u1ed3 s\u01a1</th><th>Ng\u01b0\u1eddi l\u00e0m</th><th>H\u1ea1n n\u1ed9i b\u1ed9</th><th>Tr\u1ea1ng th\u00e1i</th><th>V\u01b0\u1edbng m\u1eafc / b\u01b0\u1edbc ti\u1ebfp</th><th></th></tr></thead><tbody>'+DATA.tasks.map(t=>'<tr><td class=\"wrap\">'+esc(t.title)+'</td><td><button class=\"link\" onclick=\"openCase(\\''+esc(t.caseId)+'\\')\">'+esc(DATA.cases.find(c=>c.id===t.caseId)?.code||t.caseId)+'</button></td><td>'+esc(person(t.assignee))+'</td><td class=\"'+(t.due<DATA.today&&!['DONE','CANCELLED'].includes(t.status)?'red':'')+'\">'+fmt(t.due)+'</td><td>'+badge(t.status)+'</td><td class=\"wrap\">'+esc(t.blocker||t.nextStep||t.result)+'</td><td><button onclick=\"taskForm(\\''+esc(t.id)+'\\')\">C\u1eadp nh\u1eadt</button></td></tr>').join('')+'</tbody></table></div>'+(DATA.tasks.length?'':'<div class=\"empty\">Ch\u01b0a c\u00f3 c\u00f4ng vi\u1ec7c.</div>')+'</section>';}\nfunction transfersView(){$('main').innerHTML='<div class=\"topline\"><div><h2>B\u00e0n giao v\u00e0 x\u00e1c nh\u1eadn nh\u1eadn</h2><p class=\"muted\">Ng\u01b0\u1eddi ph\u1ee5 tr\u00e1ch ch\u1ec9 \u0111\u1ed5i sau khi b\u00ean nh\u1eadn x\u00e1c nh\u1eadn.</p></div><div class=\"actions\"><button onclick=\"printTransfers()\">In danh s\u00e1ch b\u00e0n giao</button><button onclick=\"batchForm()\">B\u00e0n giao theo \u0111\u1ee3t</button></div></div><section class=\"panel\"><div class=\"scroll\"><table><thead><tr><th>H\u1ed3 s\u01a1</th><th>Ng\u01b0\u1eddi giao</th><th>Ng\u01b0\u1eddi nh\u1eadn</th><th>L\u00fac giao</th><th>L\u00fac nh\u1eadn</th><th>Tr\u1ea1ng th\u00e1i</th><th></th></tr></thead><tbody>'+DATA.transfers.slice().reverse().map(t=>'<tr><td><button class=\"link\" onclick=\"openCase(\\''+esc(t.caseId)+'\\')\">'+esc(DATA.cases.find(c=>c.id===t.caseId)?.code||t.caseId)+'</button></td><td>'+esc(person(t.from))+'</td><td>'+esc(person(t.to))+'</td><td>'+esc(t.sentAt)+'</td><td>'+esc(t.acceptedAt||'\u2014')+'</td><td>'+badge(t.status)+'</td><td>'+(t.status==='PENDING'&&t.to===DATA.user.email?'<button onclick=\"acceptTransfer(\\''+esc(t.caseId)+'\\')\">X\u00e1c nh\u1eadn nh\u1eadn</button>':'')+'</td></tr>').join('')+'</tbody></table></div>'+(DATA.transfers.length?'':'<div class=\"empty\">Ch\u01b0a c\u00f3 l\u01b0\u1ee3t b\u00e0n giao.</div>')+'</section>';}\nfunction staffView(){const rows=DATA.dashboard.staff;$('main').innerHTML='<div class=\"topline\"><div><h2>Ti\u1ebfn \u0111\u1ed9 l\u00e0m vi\u1ec7c c\u1ee7a c\u00e1n b\u1ed9</h2><p class=\"muted\">K\u1ef3 '+fmt(DATA.dashboard.from)+' \u2013 '+fmt(DATA.dashboard.to)+' \u00b7 Kh\u00f4ng x\u1ebfp h\u1ea1ng b\u1eb1ng s\u1ed1 l\u01b0\u1ee3ng \u0111\u01a1n thu\u1ea7n.</p></div><button onclick=\"periodForm()\">\u0110\u1ed5i k\u1ef3 b\u00e1o c\u00e1o</button></div><section class=\"panel\"><div class=\"scroll\"><table><thead><tr><th>C\u00e1n b\u1ed9</th><th>Vai tr\u00f2</th><th>H\u1ed3 s\u01a1 ph\u1ee5 tr\u00e1ch</th><th>Vi\u1ec7c \u0111ang m\u1edf</th><th>Vi\u1ec7c qu\u00e1 h\u1ea1n</th><th>\u0110ang ch\u1edd</th><th>Ho\u00e0n th\u00e0nh trong k\u1ef3</th><th>Trong h\u1ea1n n\u1ed9i b\u1ed9</th><th>Ch\u1edd nh\u1eadn</th><th>H\u1ed3 s\u01a1 \u22657 ng\u00e0y ch\u01b0a c\u1eadp nh\u1eadt</th></tr></thead><tbody>'+rows.map(u=>'<tr><td>'+esc(u.name)+'</td><td>'+badge(u.role)+'</td><td>'+u.cases+'</td><td>'+u.open+'</td><td class=\"red\">'+u.overdue+'</td><td>'+u.blocked+'</td><td>'+u.done+'</td><td>'+u.onTime+'</td><td>'+u.waitingReceive+'</td><td>'+u.staleCases+'</td></tr>').join('')+'</tbody></table></div></section><div class=\"notice\">C\u00f4ng vi\u1ec7c b\u1ecb ch\u1eb7n v\u1eabn c\u00f3 h\u1ea1n v\u00e0 c\u1ea7n c\u1eadp nh\u1eadt nguy\u00ean nh\u00e2n. Vi\u1ec7c \u0111ang ch\u1edd kh\u00f4ng t\u1ef1 l\u00e0m d\u1eebng h\u1ea1n ch\u00ednh th\u1ee9c.</div>';}\nasync function openCase(id){try{DETAIL=await rpc(req('detail',{caseId:id}));caseDetail();}catch(e){toast(e.message);}}\nfunction caseDetail(){const d=DETAIL,c=d.case;const buttons=[];const role=DATA.user.role,handle=['ADMIN','MANAGER'].includes(role)||c.owner===DATA.user.email;if(c.status==='UNVERIFIED'&&['ADMIN','FRONT'].includes(role))buttons.push(['verify_case','X\u00e1c minh d\u1eef li\u1ec7u c\u0169']);if(c.status==='UNVERIFIED'&&role==='ADMIN')buttons.push(['merge_legacy','H\u1ee3p nh\u1ea5t b\u1ea3n tr\u00f9ng']);if(['RECEIVED','PROCESSING'].includes(c.status)&&handle){buttons.push(['handoff','B\u00e0n giao chuy\u00ean m\u00f4n']);if(['ADMIN','MANAGER','SPECIALIST'].includes(role))buttons.push(['assign_task','Giao c\u00f4ng vi\u1ec7c']);}if(['TRANSFER_WAIT','RETURN_WAIT'].includes(c.status)&&d.transfers.some(t=>t.id===c.pendingTransfer&&t.to===DATA.user.email))buttons.push(['accept_transfer','X\u00e1c nh\u1eadn nh\u1eadn'],['reject_transfer','Kh\u00f4ng nh\u1eadn / y\u00eau c\u1ea7u l\u00e0m r\u00f5']);if(c.status==='PROCESSING'&&handle)buttons.push(['record_result','Ghi k\u1ebft qu\u1ea3 chuy\u00ean m\u00f4n']);if(c.status==='RESULT_READY'&&handle)buttons.push(['return_result','B\u00e0n giao v\u1ec1 m\u1ed9t c\u1eeda']);if(c.status==='FRONT_READY'&&handle&&['ADMIN','FRONT'].includes(role))buttons.push(['close','Tr\u1ea3 c\u00f4ng d\u00e2n']);if(c.status==='CLOSED'&&['ADMIN','MANAGER'].includes(role))buttons.push(['reopen','M\u1edf l\u1ea1i']);if(handle&&(!['CLOSED','UNVERIFIED'].includes(c.status)||['ADMIN','MANAGER'].includes(role)))buttons.push(['add_parcel','Th\u00eam th\u1eeda \u0111\u1ea5t']);if(['ADMIN','MANAGER'].includes(role)&&c.status!=='CLOSED')buttons.push(['adjust_due','\u0110i\u1ec1u ch\u1ec9nh h\u1ea1n']);if(['ADMIN','FRONT'].includes(role))buttons.push(['add_payment','Ghi bi\u00ean lai']);if(handle)buttons.push(['add_document','G\u1eafn t\u00e0i li\u1ec7u Drive']);\n showModal(c.code||c.id,'<div class=\"topline\"><h3>'+esc(c.name)+'</h3>'+badge(c.status)+'</div><div class=\"detailgrid\"><p>Th\u1ee7 t\u1ee5c: '+esc(proc(c.procedure))+'</p><p>Ph\u1ee5 tr\u00e1ch: '+esc(person(c.owner))+'</p><p>Ng\u00e0y nh\u1eadn: '+fmt(c.received)+'</p><p>H\u1ea1n g\u1ed1c / hi\u1ec7n h\u00e0nh: '+fmt(c.originalDue)+' / '+fmt(c.due)+'</p><p>\u0110i\u1ec7n tho\u1ea1i: '+esc(c.phone||'\u2014')+'</p><p>\u0110\u1ecba ch\u1ec9: '+esc(c.address||'\u2014')+'</p><p>K\u1ebft qu\u1ea3: '+esc(LABEL[c.outcome]||'Ch\u01b0a c\u00f3')+'</p><p>Ng\u00e0y tr\u1ea3: '+fmt(c.returnDate)+'</p></div><div class=\"actions\" style=\"justify-content:flex-start\">'+buttons.map(([a,l])=>'<button onclick=\"actionForm(\\''+a+'\\')\">'+l+'</button>').join('')+'</div><p class=\"small muted\">M\u1ed7i thay \u0111\u1ed5i l\u01b0u ng\u01b0\u1eddi th\u1ef1c hi\u1ec7n v\u00e0 th\u1eddi \u0111i\u1ec3m trong l\u1ecbch s\u1eed.</p><h3 style=\"margin-top:20px\">Th\u1eeda \u0111\u1ea5t</h3><pre>'+esc(d.parcels.map(p=>['Th\u1eeda '+p.plot,'T\u1edd '+p.map,p.area+' m\u00b2',p.village,p.serial].join(' \u00b7 ')).join('\\n')||'Ch\u01b0a c\u00f3 th\u00f4ng tin')+'</pre><h3>C\u00f4ng vi\u1ec7c</h3>'+d.tasks.map(t=>'<p>'+badge(t.status)+' '+esc(t.title)+' \u00b7 '+esc(person(t.assignee))+' \u00b7 '+fmt(t.due)+' <button onclick=\"taskForm(\\''+esc(t.id)+'\\')\">C\u1eadp nh\u1eadt</button></p>').join('')+'<h3 style=\"margin-top:18px\">T\u00e0i li\u1ec7u v\u00e0 kho\u1ea3n thu</h3>'+d.documents.map(x=>'<p><button class=\"link\" onclick=\"openDocument(\\''+esc(x.fileId)+'\\')\">'+esc(x.name)+'</button> \u00b7 '+esc(x.type)+'</p>').join('')+d.payments.map(x=>'<p>'+esc(x.receipt)+' \u00b7 '+Number(x.amount).toLocaleString('vi-VN')+' VND \u00b7 '+fmt(x.date)+'</p>').join('')+'<h3 style=\"margin-top:18px\">L\u1ecbch s\u1eed</h3>'+d.events.slice().reverse().map(e=>'<div class=\"timeline\"><p><b>'+esc(LABEL[e.action]||e.action)+'</b> \u00b7 '+esc(e.at)+'</p><p class=\"muted\">'+esc(e.actor)+'</p>'+(e.input.reason?'<p>'+esc(e.input.reason)+'</p>':'')+'</div>').join(''));}\nfunction form(title,html,onSubmit){showModal(title,'<form id=\"actionForm\"><div class=\"formgrid\">'+html+'</div><p id=\"formError\" class=\"error\"></p><div class=\"footer\"><button type=\"button\" onclick=\"closeModal()\">\u0110\u00f3ng</button><button id=\"submitAction\" class=\"primary\">L\u01b0u v\u00e0 ghi nh\u1eadt k\u00fd</button></div></form>');$('actionForm').onsubmit=async event=>{event.preventDefault();$('submitAction').disabled=true;$('formError').textContent='';try{await onSubmit(Object.fromEntries(new FormData(event.target)));}catch(e){$('formError').textContent=e.message;if($('submitAction'))$('submitAction').disabled=false;}};}\nasync function saveAction(action,input){const result=await rpc(req(action,input));closeModal();toast(result.message||'\u0110\u00e3 ghi nh\u1eadn.');await load();if(result.caseId)await openCase(result.caseId);}\nfunction intakeFields(c={}){return field('code','M\u00e3 d\u1ecbch v\u1ee5 c\u00f4ng','text',c.code||'',false)+field('name','H\u1ecd t\u00ean ng\u01b0\u1eddi n\u1ed9p','text',c.name||'')+field('landUser','Ng\u01b0\u1eddi s\u1eed d\u1ee5ng \u0111\u1ea5t (n\u1ebfu kh\u00e1c)','text',c.landUser||'',false)+field('phone','\u0110i\u1ec7n tho\u1ea1i','tel',c.phone||'',false)+select('procedure','Th\u1ee7 t\u1ee5c \u0111\u00e3 \u0111\u01b0\u1ee3c duy\u1ec7t',procedureOptions())+field('received','Ng\u00e0y ti\u1ebfp nh\u1eadn','date',c.received||DATA.today)+field('due','H\u1ea1n h\u1eb9n ch\u00ednh th\u1ee9c','date',c.due||'',false)+field('address','\u0110\u1ecba ch\u1ec9','text',c.address||'',false)+area('evidence','C\u0103n c\u1ee9 / s\u1ed1 phi\u1ebfu / li\u00ean k\u1ebft t\u00e0i li\u1ec7u',c.evidence||'');}\nfunction newCase(){form('Ti\u1ebfp nh\u1eadn h\u1ed3 s\u01a1',intakeFields()+field('plot','S\u1ed1 th\u1eeda (gi\u1eef nguy\u00ean n\u1ebfu l\u00e0 nh\u00f3m th\u1eeda)','text','',false)+field('map','S\u1ed1 t\u1edd','text','',false)+field('area','Di\u1ec7n t\u00edch m\u00b2','number','',false,'step=\"any\" min=\"0\"')+field('village','Th\u00f4n','text','',false)+field('serial','S\u00ea-ri GCN','text','',false),p=>{p.parcels=p.plot||p.map?[{plot:p.plot,map:p.map,area:p.area,village:p.village,serial:p.serial}]:[];return saveAction('create',p);});}\nfunction actionForm(action){const c=DETAIL.case;let html='';\n if(action==='handoff'||action==='return_result')html=select('to','Ng\u01b0\u1eddi nh\u1eadn',userOptions(action==='handoff'?['SPECIALIST','MANAGER']:['FRONT']))+area('note','Th\u00e0nh ph\u1ea7n h\u1ed3 s\u01a1 / n\u1ed9i dung b\u00e0n giao');\n if(action==='accept_transfer')html='<p class=\"wide\">X\u00e1c nh\u1eadn \u0111\u00e3 nh\u1eadn h\u1ed3 s\u01a1 v\u00e0 c\u00e1c t\u00e0i li\u1ec7u b\u00e0n giao. N\u1ebfu c\u00f2n thi\u1ebfu, ch\u1ecdn kh\u00f4ng nh\u1eadn v\u00e0 ghi l\u00fd do.</p>';\n if(action==='reject_transfer')html=area('reason','L\u00fd do kh\u00f4ng nh\u1eadn / y\u00eau c\u1ea7u l\u00e0m r\u00f5');\n if(action==='assign_task')html=field('title','C\u00f4ng vi\u1ec7c')+select('assignee','Ng\u01b0\u1eddi th\u1ef1c hi\u1ec7n',userOptions(['SPECIALIST','MANAGER']))+field('due','H\u1ea1n c\u00f4ng vi\u1ec7c n\u1ed9i b\u1ed9','date',DATA.today);\n if(action==='record_result')html=select('outcome','Lo\u1ea1i k\u1ebft qu\u1ea3',selectOptions(['APPROVED','REFUSED','WITHDRAWN']))+field('resultDate','Ng\u00e0y c\u00f3 k\u1ebft qu\u1ea3','date',DATA.today)+area('evidence','S\u1ed1 v\u0103n b\u1ea3n / c\u0103n c\u1ee9 / t\u00e0i li\u1ec7u k\u1ebft qu\u1ea3');\n if(action==='close')html=field('returnDate','Ng\u00e0y tr\u1ea3 c\u00f4ng d\u00e2n','date',DATA.today)+area('evidence','Ng\u01b0\u1eddi nh\u1eadn / h\u00ecnh th\u1ee9c tr\u1ea3 / ch\u1ee9ng t\u1eeb');\n if(action==='adjust_due')html=field('due','H\u1ea1n hi\u1ec7n h\u00e0nh m\u1edbi','date',c.due)+area('reason','L\u00fd do \u0111i\u1ec1u ch\u1ec9nh')+area('evidence','V\u0103n b\u1ea3n l\u00e0m c\u0103n c\u1ee9 \u0111i\u1ec1u ch\u1ec9nh h\u1ea1n');\n if(action==='reopen')html=select('owner','Ng\u01b0\u1eddi ti\u1ebfp nh\u1eadn h\u1ed3 s\u01a1 m\u1edf l\u1ea1i',userOptions(['FRONT']))+area('reason','L\u00fd do m\u1edf l\u1ea1i');\n if(action==='verify_case')html=intakeFields(c)+select('legacyClosed','T\u00ecnh tr\u1ea1ng \u0111\u00e3 \u0111\u1ed1i chi\u1ebfu',option('false','H\u1ed3 s\u01a1 v\u1eabn \u0111ang m\u1edf')+option('true','\u0110\u00e3 tr\u1ea3 c\u00f4ng d\u00e2n trong qu\u00e1 kh\u1ee9'))+select('outcome','K\u1ebft qu\u1ea3 (n\u1ebfu \u0111\u00e3 \u0111\u00f3ng)',selectOptions(['APPROVED','REFUSED','WITHDRAWN']))+field('resultDate','Ng\u00e0y k\u1ebft qu\u1ea3 l\u1ecbch s\u1eed (n\u1ebfu \u0111\u00e3 \u0111\u00f3ng)','date','',false)+field('returnDate','Ng\u00e0y tr\u1ea3 l\u1ecbch s\u1eed (n\u1ebfu \u0111\u00e3 \u0111\u00f3ng)','date','',false);\n if(action==='merge_legacy')html=field('targetId','ID h\u1ed3 s\u01a1 \u0111\u00edch gi\u1eef l\u1ea1i')+area('reason','C\u0103n c\u1ee9 x\u00e1c nh\u1eadn hai b\u1ea3n ghi l\u00e0 c\u00f9ng m\u1ed9t h\u1ed3 s\u01a1');\n if(action==='add_parcel')html=field('plot','S\u1ed1 th\u1eeda')+field('map','S\u1ed1 t\u1edd')+field('area','Di\u1ec7n t\u00edch m\u00b2','number','',false,'step=\"any\" min=\"0\"')+field('village','Th\u00f4n','text','',false)+field('commune','X\u00e3','text','',false)+field('serial','S\u00ea-ri GCN','text','',false)+area('evidence','Ngu\u1ed3n/c\u0103n c\u1ee9 th\u1eeda \u0111\u1ea5t');\n if(action==='add_document')html=field('fileId','Drive file ID')+field('name','T\u00ean t\u00e0i li\u1ec7u')+field('type','Lo\u1ea1i t\u00e0i li\u1ec7u');\n if(action==='add_payment')html=field('receipt','S\u1ed1 bi\u00ean lai')+field('date','Ng\u00e0y bi\u00ean lai','date',DATA.today)+field('amount','S\u1ed1 ti\u1ec1n VND','number','',true,'min=\"1\" step=\"1\"')+field('type','Lo\u1ea1i kho\u1ea3n thu')+area('evidence','C\u0103n c\u1ee9 / t\u00e0i li\u1ec7u bi\u00ean lai');\n form(LABEL[action]||action,html,async p=>{if(action==='merge_legacy'){const t=await rpc(req('detail',{caseId:p.targetId}));p.targetVersion=t.case.version;}if(action==='verify_case')p.legacyClosed=p.legacyClosed==='true';return saveAction(action,{...p,caseId:c.id,version:c.version});});}\nasync function acceptTransfer(id){await openCase(id);if(DETAIL?.case.id===id)actionForm('accept_transfer');}\nasync function taskForm(id){const task=DATA.tasks.find(t=>t.id===id)||DETAIL?.tasks.find(t=>t.id===id);if(!task)return;const detail=await rpc(req('detail',{caseId:task.caseId}));form('C\u1eadp nh\u1eadt: '+task.title,select('status','Tr\u1ea1ng th\u00e1i',selectOptions(['TODO','DOING','BLOCKED','DONE','CANCELLED'],task.status))+area('blocker','L\u00fd do \u0111ang ch\u1edd',task.blocker,false)+area('nextStep','B\u01b0\u1edbc ti\u1ebfp theo',task.nextStep,false)+area('result','K\u1ebft qu\u1ea3 ho\u1eb7c l\u00fd do h\u1ee7y',task.result,false),p=>saveAction('update_task',{...p,caseId:task.caseId,version:detail.case.version,taskId:id}));}\nfunction batchForm(){const eligible=DATA.cases.filter(c=>['RECEIVED','PROCESSING','RESULT_READY'].includes(c.status));form('B\u00e0n giao theo \u0111\u1ee3t',select('kind','Lo\u1ea1i b\u00e0n giao',option('handoff','Giao chuy\u00ean m\u00f4n')+option('return_result','Giao k\u1ebft qu\u1ea3 v\u1ec1 m\u1ed9t c\u1eeda'))+select('to','Ng\u01b0\u1eddi nh\u1eadn',userOptions())+area('note','Th\u00e0nh ph\u1ea7n / n\u1ed9i dung b\u00e0n giao')+'<label class=\"wide\">Ch\u1ecdn h\u1ed3 s\u01a1<select name=\"ids\" id=\"batchIds\" multiple size=\"8\">'+eligible.map(c=>option(c.id,(c.code||c.id)+' \u00b7 '+c.name+' \u00b7 '+LABEL[c.status])).join('')+'</select></label>',async p=>{const ids=[...$('batchIds').selectedOptions].map(o=>o.value);if(!ids.length)throw new Error('Ch\u1ecdn \u00edt nh\u1ea5t m\u1ed9t h\u1ed3 s\u01a1.');const batchId=crypto.randomUUID();let n=0;for(const id of ids){const c=DATA.cases.find(c=>c.id===id);try{await rpc(req(p.kind,{caseId:id,version:c.version,to:p.to,note:p.note,batchId}));n++;}catch(e){await load();throw new Error('\u0110\u00e3 giao '+n+'/'+ids.length+' h\u1ed3 s\u01a1. D\u1eebng t\u1ea1i '+(c.code||id)+': '+e.message);}}closeModal();toast('\u0110\u00e3 giao '+n+' h\u1ed3 s\u01a1. B\u00ean nh\u1eadn c\u1ea7n x\u00e1c nh\u1eadn t\u1eebng h\u1ed3 s\u01a1.');await load();});}\nfunction periodForm(){form('K\u1ef3 b\u00e1o c\u00e1o',field('from','T\u1eeb ng\u00e0y','date',DATA.dashboard.from)+field('to','\u0110\u1ebfn ng\u00e0y','date',DATA.dashboard.to)+select('mode','Thao t\u00e1c',option('filter','Xem theo k\u1ef3')+(['ADMIN','MANAGER'].includes(DATA.user.role)?option('snapshot','Ch\u1ed1t b\u1ea3n b\u00e1o c\u00e1o b\u1ea5t bi\u1ebfn'):'')),async p=>{if(p.from>p.to)throw new Error('Ng\u00e0y b\u1eaft \u0111\u1ea7u sau ng\u00e0y k\u1ebft th\u00fac.');if(p.mode==='snapshot')toast((await rpc(req('snapshot',p))).message);FILTER.from=p.from;FILTER.to=p.to;closeModal();await load();});}\nfunction reviewsView(){const reviews=DATA.reviews.filter(x=>x.status==='OPEN');$('main').innerHTML='<div class=\"topline\"><div><h2>\u0110\u1ed1i so\u00e1t d\u1eef li\u1ec7u & \u0111\u1ecdc PDF</h2><p class=\"muted\">'+reviews.length+' m\u1ee5c \u0111ang ch\u1edd duy\u1ec7t. D\u1eef li\u1ec7u AI ch\u01b0a t\u1ef1 ghi v\u00e0o s\u1ed5.</p></div><div class=\"actions\"><button onclick=\"uploadForm()\">+ T\u1ea3i phi\u1ebfu PDF</button><button onclick=\"runUtility(\\'scan_pdf\\')\">Qu\u00e9t th\u01b0 m\u1ee5c Drive</button><button onclick=\"runUtility(\\'poll_pdf\\')\">Ki\u1ec3m tra t\u00e1c v\u1ee5 PDF</button></div></div><section class=\"panel\"><h3>T\u00e1c v\u1ee5 PDF</h3><div class=\"scroll\"><table><thead><tr><th>ID</th><th>Tr\u1ea1ng th\u00e1i</th><th>C\u1eadp nh\u1eadt</th><th>Th\u00f4ng tin</th></tr></thead><tbody>'+DATA.jobs.slice(-30).reverse().map(j=>'<tr><td>'+esc(j.id.slice(0,16))+'</td><td>'+badge(j.status)+'</td><td>'+esc(j.updatedAt)+'</td><td class=\"wrap\">'+esc(j.message)+(j.status==='FAILED'?' <button onclick=\"retryPdf(\\''+esc(j.id)+'\\')\">Th\u1eed l\u1ea1i</button>':'')+'</td></tr>').join('')+'</tbody></table></div></section><section class=\"panel\"><h3>H\u00e0ng ch\u1edd duy\u1ec7t</h3><div class=\"scroll\"><table><thead><tr><th>Lo\u1ea1i</th><th>H\u1ed3 s\u01a1 / ngu\u1ed3n</th><th>N\u1ed9i dung c\u1ea7n ki\u1ec3m tra</th><th></th></tr></thead><tbody>'+reviews.slice(PAGE*40,(PAGE+1)*40).map(v=>'<tr><td>'+esc(({LEGACY_SOURCE:'Ngu\u1ed3n d\u1eef li\u1ec7u c\u0169',SPECIALIST_MATCH:'\u0110\u1ed1i chi\u1ebfu chuy\u00ean m\u00f4n',UNCLASSIFIED_SOURCE:'D\u00f2ng c\u1ea7n ph\u00e2n lo\u1ea1i',PDF_EXTRACTION:'PDF ch\u1edd duy\u1ec7t'})[v.kind]||v.kind)+'</td><td class=\"wrap\">'+esc(v.caseId||v.source)+'</td><td class=\"wrap\">'+esc(v.message)+'</td><td><button onclick=\"reviewForm(\\''+esc(v.id)+'\\')\">Xem / duy\u1ec7t</button></td></tr>').join('')+'</tbody></table></div><div class=\"pagination\"><button onclick=\"PAGE=Math.max(0,PAGE-1);reviewsView()\" '+(PAGE?'':'disabled')+'>Tr\u01b0\u1edbc</button><span>Trang '+(PAGE+1)+'</span><button onclick=\"PAGE++;reviewsView()\" '+((PAGE+1)*40<reviews.length?'':'disabled')+'>Sau</button></div></section>';}\nfunction uploadForm(){showModal('T\u1ea3i phi\u1ebfu PDF','<p>T\u1ed1i \u0111a 10 MB. T\u1ec7p l\u01b0u ri\u00eang t\u01b0 trong Drive, model \u0111\u1ecdc xong s\u1ebd v\u00e0o h\u00e0ng ch\u1edd duy\u1ec7t.</p><input id=\"pdfFile\" type=\"file\" accept=\"application/pdf\"><p id=\"uploadStatus\"></p><button class=\"primary\" id=\"uploadButton\" onclick=\"uploadPdf()\">T\u1ea3i l\u00ean</button>');}\nasync function uploadPdf(){const f=$('pdfFile').files[0];if(!f)return;if(f.size>10*1024*1024){toast('PDF t\u1ed1i \u0111a 10 MB.');return;}$('uploadButton').disabled=true;try{const bytes=await f.arrayBuffer();let raw='',a=new Uint8Array(bytes);for(let i=0;i<a.length;i+=8192)raw+=String.fromCharCode(...a.subarray(i,i+8192));const r=await rpc(req('upload_pdf',{name:f.name,base64:btoa(raw)}));closeModal();toast(r.message);await load();}catch(e){$('uploadStatus').textContent=e.message;$('uploadButton').disabled=false;}}\nfunction reviewForm(id){const v=DATA.reviews.find(x=>x.id===id);if(v.kind==='PDF_EXTRACTION'){pdfReviewForm(v);return;}form('\u0110\u1ed1i so\u00e1t d\u1eef li\u1ec7u','<pre class=\"wide\">'+esc(JSON.stringify(v,null,2))+'</pre>'+field('caseId','ID h\u1ed3 s\u01a1 li\u00ean k\u1ebft \u0111\u00e3 \u0111\u1ed1i chi\u1ebfu (n\u1ebfu c\u00f3)','text',v.caseId||'',false)+area('resolution','K\u1ebft lu\u1eadn v\u00e0 c\u0103n c\u1ee9; ghi r\u00f5 thao t\u00e1c ti\u1ebfp theo'),p=>saveAction('resolve_review',{id,...p}));}\nfunction pdfReviewForm(v){const d=v.draft;form('Ki\u1ec3m tra d\u1eef li\u1ec7u \u0111\u1ecdc t\u1eeb PDF','<p class=\"wide\"><button type=\"button\" class=\"link\" onclick=\"openDocument(\\''+esc(v.source)+'\\')\">M\u1edf PDF g\u1ed1c \u0111\u1ec3 \u0111\u1ed1i chi\u1ebfu</button></p><pre class=\"wide\">'+esc(JSON.stringify(d,null,2))+'</pre>'+select('mode','C\u00e1ch ghi d\u1eef li\u1ec7u',option('CREATE','T\u1ea1o h\u1ed3 s\u01a1 t\u1eeb phi\u1ebfu ti\u1ebfp nh\u1eadn')+option('PAYMENT','Ghi kho\u1ea3n thu t\u1eeb bi\u00ean lai')+option('DOCUMENT','Ch\u1ec9 g\u1eafn t\u00e0i li\u1ec7u')+option('ADJUST_DUE','\u0110i\u1ec1u ch\u1ec9nh h\u1ea1n t\u1eeb v\u0103n b\u1ea3n'))+field('caseId','ID h\u1ed3 s\u01a1 \u0111\u00e3 c\u00f3 (\u0111\u1ec3 g\u1eafn t\u00e0i li\u1ec7u/bi\u00ean lai)','text','',false)+intakeFields(d.fields||{})+field('receipt','S\u1ed1 bi\u00ean lai','text',d.fields?.receipt||'',false)+field('date','Ng\u00e0y bi\u00ean lai','date',d.fields?.payment_date||'',false)+field('amount','S\u1ed1 ti\u1ec1n VND','number',d.fields?.amount||'',false)+field('type','Lo\u1ea1i kho\u1ea3n thu','text',d.fields?.payment_type||'',false)+area('reason','L\u00fd do \u0111i\u1ec1u ch\u1ec9nh h\u1ea1n','',false),async p=>{let version=0;if(p.mode!=='CREATE'){const detail=await rpc(req('detail',{caseId:p.caseId}));version=detail.case.version;}const data={...p,version};await saveAction('approve_pdf',{reviewId:v.id,mode:p.mode,data});});const fields=$('actionForm');fields.querySelectorAll('[required]').forEach(e=>e.required=false);fields.querySelector('[name=mode]').required=true;}\nfunction adminView(){$('main').innerHTML='<h2>Qu\u1ea3n tr\u1ecb</h2><p class=\"muted\">Qu\u1ea3n l\u00fd t\u00e0i kho\u1ea3n, danh m\u1ee5c v\u00e0 k\u00edch ho\u1ea1t t\u00edch h\u1ee3p. Kh\u00f3a kh\u00f4ng \u0111\u01b0\u1ee3c hi\u1ec3n th\u1ecb l\u1ea1i.</p><div class=\"grid\"><section class=\"panel\"><h3>C\u00e1n b\u1ed9 v\u00e0 ph\u00e2n quy\u1ec1n</h3>'+DATA.users.map(u=>'<p>'+esc(u.name)+' \u00b7 '+esc(u.email)+' '+badge(u.role)+'</p>').join('')+'<button onclick=\"userForm()\">Th\u00eam / c\u1eadp nh\u1eadt c\u00e1n b\u1ed9</button><h3 style=\"margin-top:20px\">Danh m\u1ee5c th\u1ee7 t\u1ee5c</h3>'+DATA.procedures.map(p=>'<p>'+esc(p.id)+' \u00b7 '+esc(p.name)+' '+badge(p.active?'\u0110ang d\u00f9ng':'Ch\u01b0a duy\u1ec7t')+'</p>').join('')+'<button onclick=\"procedureForm()\">Th\u00eam / duy\u1ec7t th\u1ee7 t\u1ee5c</button> <button onclick=\"holidayForm()\">L\u1ecbch ngh\u1ec9 / ng\u00e0y l\u00e0m b\u00f9</button> <button onclick=\"dueForm()\">T\u00ednh th\u1eed h\u1ea1n l\u00e0m vi\u1ec7c</button></section><section class=\"panel\"><h3>T\u00edch h\u1ee3p v\u00e0 nh\u1eafc vi\u1ec7c</h3><p>Worker: '+(DATA.settings?.workerConfigured?'\u0110\u00e3 c\u1ea5u h\u00ecnh':'Ch\u01b0a c\u1ea5u h\u00ecnh')+'</p><p>Email nh\u1eafc vi\u1ec7c: '+(DATA.settings?.remindersEnabled?'\u0110\u00e3 b\u1eadt':'\u0110ang t\u1eaft')+'</p><p>Trigger: '+esc(DATA.settings?.triggers?.join(', ')||'Ch\u01b0a c\u00e0i')+'</p><button onclick=\"settingsForm()\">C\u1ea5u h\u00ecnh</button> <button onclick=\"previewReminders()\">Xem tr\u01b0\u1edbc nh\u1eafc vi\u1ec7c</button><h3 style=\"margin-top:20px\">D\u1eef li\u1ec7u v\u00e0 dashboard</h3><button onclick=\"importForm()\">Nh\u1eadp JSON \u0111\u00e3 chu\u1ea9n h\u00f3a</button> <button onclick=\"runUtility(\\'refresh_sheet_dashboard\\')\">C\u1eadp nh\u1eadt dashboard trong Sheet</button><p><a href=\"'+esc(DATA.links.sheet||'#')+'\" target=\"_blank\" rel=\"noopener\">M\u1edf Google Sheets</a></p><p><a href=\"'+esc(DATA.links.folder||'#')+'\" target=\"_blank\" rel=\"noopener\">M\u1edf th\u01b0 m\u1ee5c t\u00e0i li\u1ec7u Drive</a></p></section></div><section class=\"panel\"><h3>C\u00e1c k\u1ef3 \u0111\u00e3 ch\u1ed1t</h3>'+DATA.snapshots.map(s=>'<p>'+fmt(s.from)+' \u2013 '+fmt(s.to)+' \u00b7 '+esc(s.actor)+' \u00b7 '+esc(s.createdAt)+'</p>').join('')+'</section>';}\nfunction userForm(){form('C\u00e1n b\u1ed9 v\u00e0 ph\u00e2n quy\u1ec1n',field('email','Email Google')+field('name','H\u1ecd t\u00ean')+select('role','Vai tr\u00f2',selectOptions(['FRONT','SPECIALIST','MANAGER','ADMIN']))+select('active','Tr\u1ea1ng th\u00e1i',option('true','\u0110ang ho\u1ea1t \u0111\u1ed9ng')+option('false','Ng\u1eebng ho\u1ea1t \u0111\u1ed9ng'))+select('notifications','Email nh\u1eafc vi\u1ec7c',option('false','T\u1eaft')+option('true','B\u1eadt cho c\u00e1n b\u1ed9 n\u00e0y')),p=>saveAction('save_user',{...p,active:p.active==='true',notifications:p.notifications==='true'}));}\nfunction procedureForm(){form('Danh m\u1ee5c th\u1ee7 t\u1ee5c',field('id','M\u00e3 th\u1ee7 t\u1ee5c chu\u1ea9n')+field('name','T\u00ean th\u1ee7 t\u1ee5c')+select('active','\u0110\u00e3 x\u00e1c nh\u1eadn \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng?',option('false','Ch\u01b0a duy\u1ec7t')+option('true','\u0110\u00e3 duy\u1ec7t'))+area('rule','Quy t\u1eafc h\u1ea1n / c\u0103n c\u1ee9 / phi\u00ean b\u1ea3n \u00e1p d\u1ee5ng'),p=>saveAction('save_procedure',{...p,active:p.active==='true'}));}\nfunction holidayForm(){form('L\u1ecbch ngh\u1ec9 / ng\u00e0y l\u00e0m b\u00f9',field('date','Ng\u00e0y','date',DATA.today)+select('working','Lo\u1ea1i ng\u00e0y',option('false','Ng\u00e0y ngh\u1ec9')+option('true','Ng\u00e0y l\u00e0m vi\u1ec7c b\u00f9'))+area('note','T\u00ean ng\u00e0y / c\u0103n c\u1ee9'),p=>saveAction('save_holiday',{...p,working:p.working==='true'}));}\nfunction settingsForm(){form('C\u1ea5u h\u00ecnh t\u00edch h\u1ee3p',field('workerUrl','URL worker HTTPS','url','',false)+field('workerToken','Token worker (\u0111\u1ec3 tr\u1ed1ng n\u1ebfu gi\u1eef nguy\u00ean)','password','',false)+select('emailLoginEnabled','\u0110\u0103ng nh\u1eadp b\u1eb1ng m\u00e3 email',option('false','T\u1eaft',String(DATA.settings.emailLoginEnabled))+option('true','B\u1eadt cho c\u00e1c email \u0111\u00e3 ph\u00e2n quy\u1ec1n',String(DATA.settings.emailLoginEnabled)))+select('remindersEnabled','Nh\u1eafc vi\u1ec7c email',option('false','T\u1eaft',String(DATA.settings.remindersEnabled))+option('true','B\u1eadt',String(DATA.settings.remindersEnabled)))+select('installTriggers','Trigger t\u1ef1 \u0111\u1ed9ng',option('false','Gi\u1eef nguy\u00ean')+option('true','C\u00e0i / c\u1eadp nh\u1eadt: email m\u1ed7i s\u00e1ng, PDF m\u1ed7i 10 ph\u00fat'))+'<p class=\"wide muted\">URL b\u1ecf tr\u1ed1ng s\u1ebd gi\u1eef c\u1ea5u h\u00ecnh \u0111ang c\u00f3. Model API key c\u1ea5u h\u00ecnh \u1edf backend, kh\u00f4ng nh\u1eadp v\u00e0o \u0111\u00e2y. Email ch\u1ec9 \u0111\u1ebfn c\u00e1n b\u1ed9 \u0111\u00e3 b\u1eadt nh\u1eadn nh\u1eafc vi\u1ec7c.</p>',p=>{if(!p.workerUrl)delete p.workerUrl;return saveAction('settings',{...p,emailLoginEnabled:p.emailLoginEnabled==='true',remindersEnabled:p.remindersEnabled==='true',installTriggers:p.installTriggers==='true'});});}\nasync function previewReminders(){try{const list=await rpc(req('notification_preview'));showModal('Xem tr\u01b0\u1edbc email nh\u1eafc vi\u1ec7c','<pre>'+esc(JSON.stringify(list,null,2))+'</pre><p>Ch\u01b0a g\u1eedi email. Khi g\u1eedi, n\u1ed9i dung ch\u1ec9 g\u1ed3m m\u00e3 v\u00e0 c\u00f4ng vi\u1ec7c c\u1ea7n ki\u1ec3m tra.</p><button class=\"primary\" onclick=\"runUtility(\\'send_reminders\\')\">G\u1eedi theo c\u1ea5u h\u00ecnh \u0111\u00e3 b\u1eadt</button>');}catch(e){toast(e.message);}}\nasync function retryPdf(id){try{toast((await rpc(req('retry_pdf',{id}))).message);await load();}catch(e){toast(e.message);}}\nasync function runUtility(action){try{const r=await rpc(req(action));toast(r.message);await load();}catch(e){toast(e.message);}}\nfunction importForm(){showModal('Nh\u1eadp d\u1eef li\u1ec7u \u0111\u00e3 chu\u1ea9n h\u00f3a','<p><b>Khuy\u1ebfn ngh\u1ecb cho to\u00e0n b\u1ed9 d\u1eef li\u1ec7u:</b> t\u1ea3i migration.json v\u00e0o Drive ri\u00eang t\u01b0, nh\u1eadp file ID v\u00e0 b\u1ea5m nh\u1eadp t\u1eeb Drive. H\u1ec7 th\u1ed1ng ghi theo l\u00f4 l\u1edbn, c\u00f3 th\u1ec3 ch\u1ea1y l\u1ea1i an to\u00e0n.</p><input id=\"migrationDriveId\" placeholder=\"Drive file ID c\u1ee7a migration.json\"><button id=\"importDriveButton\" onclick=\"importFromDrive()\">Nh\u1eadp t\u1eeb Drive</button><hr><p>Ch\u1ecdn migration.json do c\u00f4ng c\u1ee5 chu\u1ea9n h\u00f3a t\u1ea1o. Ch\u1ec9 nh\u1eadp h\u1ed3 s\u01a1 ch\u01b0a x\u00e1c minh, th\u1eeda v\u00e0 c\u00e1c m\u1ee5c \u0111\u1ed1i so\u00e1t. C\u00f3 th\u1ec3 ch\u1ea1y l\u1ea1i, ID c\u0169 \u0111\u01b0\u1ee3c b\u1ecf qua.</p><input id=\"importFile\" type=\"file\" accept=\"application/json\"><p id=\"importProgress\"></p><button class=\"primary\" id=\"importButton\" onclick=\"importData()\">B\u1eaft \u0111\u1ea7u nh\u1eadp</button>');}\nasync function importFromDrive(){const fileId=$('migrationDriveId').value.trim();if(!fileId)return;$('importDriveButton').disabled=true;try{const r=await rpc(req('import_file',{fileId}));closeModal();toast(r.message);await load();}catch(e){toast(e.message);if($('importDriveButton'))$('importDriveButton').disabled=false;}}\nasync function importData(){if(IMPORTING)return;const file=$('importFile').files[0];if(!file)return;IMPORTING=true;$('importButton').disabled=true;try{const data=JSON.parse(await file.text());if(data.schema!=='hoso-migration-v1'||!Array.isArray(data.records))throw new Error('Kh\u00f4ng \u0111\u00fang \u0111\u1ecbnh d\u1ea1ng migration.json.');let i=0;while(i<data.records.length){let batch=[],size=0;while(i<data.records.length&&batch.length<10){let n=JSON.stringify(data.records[i]).length;if(n>30000)throw new Error('B\u1ea3n ghi qu\u00e1 l\u1edbn t\u1ea1i '+i);if(size+n>30000&&batch.length)break;batch.push(data.records[i++]);size+=n;}await rpc(req('import_batch',{records:batch}));if($('importProgress'))$('importProgress').textContent='\u0110\u00e3 x\u1eed l\u00fd '+i+'/'+data.records.length+' b\u1ea3n ghi. C\u00f3 th\u1ec3 \u0111\u00f3ng r\u1ed3i nh\u1eadp l\u1ea1i n\u1ebfu b\u1ecb gi\u00e1n \u0111o\u1ea1n.';}closeModal();toast('\u0110\u00e3 nh\u1eadp xong. M\u1edf \u0110\u1ed1i so\u00e1t \u0111\u1ec3 ki\u1ec3m tra.');await load();}catch(e){if($('importProgress'))$('importProgress').textContent=e.message;if($('importButton'))$('importButton').disabled=false;}finally{IMPORTING=false;}}\nfunction exportCases(){const cols=['id','code','name','phone','procedure','received','due','status','owner'];const cell=v=>'\"'+String(/^[=+@-]/.test(String(v||''))?\"'\"+v:v??'').replace(/\"/g,'\"\"')+'\"';const csv='\\ufeff'+[cols,...DATA.cases.map(c=>cols.map(k=>c[k]))].map(r=>r.map(cell).join(',')).join('\\r\\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='ho-so.csv';a.click();URL.revokeObjectURL(a.href);}\nasync function openDocument(fileId){const win=window.open('','_blank');if(!win){toast('Cho ph\u00e9p c\u1eeda s\u1ed5 b\u1eadt l\u00ean \u0111\u1ec3 xem PDF.');return;}win.opener=null;win.document.body.textContent='\u0110ang ki\u1ec3m tra quy\u1ec1n v\u00e0 t\u1ea3i PDF\u2026';try{const data=await rpc(req('read_document',{fileId}));const raw=atob(data.base64),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);const url=URL.createObjectURL(new Blob([bytes],{type:data.mimeType}));win.location.href=url;setTimeout(()=>URL.revokeObjectURL(url),300000);}catch(e){win.document.body.textContent=e.message;toast(e.message);}}\nfunction snapshotsForm(){showModal('B\u00e1o c\u00e1o \u0111\u00e3 ch\u1ed1t',DATA.snapshots.length?DATA.snapshots.map(s=>'<details><summary>'+esc(fmt(s.from)+' \u2013 '+fmt(s.to)+' \u00b7 '+s.createdAt)+'</summary><pre>'+esc(JSON.stringify(s.report,null,2))+'</pre></details>').join(''):'<p>Ch\u01b0a c\u00f3 b\u00e1o c\u00e1o \u0111\u00e3 ch\u1ed1t ho\u1eb7c t\u00e0i kho\u1ea3n kh\u00f4ng c\u00f3 quy\u1ec1n xem.</p>');}\nfunction dueForm(){form('T\u00ednh th\u1eed h\u1ea1n theo l\u1ecbch c\u1ea5u h\u00ecnh',field('start','Ng\u00e0y b\u1eaft \u0111\u1ea7u','date',DATA.today)+field('days','S\u1ed1 ng\u00e0y l\u00e0m vi\u1ec7c','number','7',true,'min=\"1\" max=\"1000\" step=\"1\"')+select('includeStart','Ng\u00e0y b\u1eaft \u0111\u1ea7u',option('false','Kh\u00f4ng t\u00ednh ng\u00e0y b\u1eaft \u0111\u1ea7u')+option('true','T\u00ednh n\u1ebfu l\u00e0 ng\u00e0y l\u00e0m vi\u1ec7c'))+'<p class=\"wide muted\">K\u1ebft qu\u1ea3 tham kh\u1ea3o, kh\u00f4ng t\u1ef1 s\u1eeda h\u1ea1n ch\u00ednh th\u1ee9c. Ch\u1ec9 \u00e1p d\u1ee5ng khi quy t\u1eafc th\u1ee7 t\u1ee5c \u0111\u00e3 \u0111\u01b0\u1ee3c x\u00e1c nh\u1eadn.</p>',async p=>{const r=await rpc(req('calculate_due',{...p,includeStart:p.includeStart==='true'}));closeModal();toast('Ng\u00e0y t\u00ednh \u0111\u01b0\u1ee3c: '+fmt(r.due)+'. Ch\u01b0a ghi v\u00e0o h\u1ed3 s\u01a1.');});}\nfunction printTransfers(){const batch=prompt('M\u00e3 \u0111\u1ee3t b\u00e0n giao (\u0111\u1ec3 tr\u1ed1ng \u0111\u1ec3 in c\u00e1c l\u01b0\u1ee3t \u0111ang ch\u1edd nh\u1eadn):','');if(batch===null)return;const rows=DATA.transfers.filter(t=>batch?t.batchId===batch:t.status==='PENDING');if(!rows.length){toast('Kh\u00f4ng c\u00f3 l\u01b0\u1ee3t b\u00e0n giao ph\u00f9 h\u1ee3p.');return;}const win=window.open('','_blank');if(!win){toast('Cho ph\u00e9p c\u1eeda s\u1ed5 b\u1eadt l\u00ean \u0111\u1ec3 in danh s\u00e1ch.');return;}win.document.write('<!doctype html><html lang=\"vi\"><meta charset=\"utf-8\"><title>Danh s\u00e1ch b\u00e0n giao</title><style>body{font:13px Arial;padding:25px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #aaa;padding:8px}small{color:#555}</style><h2>DANH S\u00c1CH B\u00c0N GIAO H\u1ed2 S\u01a0</h2><p>\u0110\u1ee3t: '+esc(batch||'C\u00e1c l\u01b0\u1ee3t ch\u1edd nh\u1eadn')+'</p><table><tr><th>STT</th><th>M\u00e3 h\u1ed3 s\u01a1</th><th>Ng\u01b0\u1eddi n\u1ed9p</th><th>Ng\u01b0\u1eddi giao / nh\u1eadn</th><th>Ng\u00e0y giao</th><th>N\u1ed9i dung</th></tr>'+rows.map((t,i)=>{const c=DATA.cases.find(c=>c.id===t.caseId);return '<tr><td>'+(i+1)+'</td><td>'+esc(c?.code||t.caseId)+'</td><td>'+esc(c?.name||'')+'</td><td>'+esc(person(t.from))+' / '+esc(person(t.to))+'</td><td>'+esc(t.sentAt)+'</td><td>'+esc(t.note)+'</td></tr>';}).join('')+'</table><p>Ng\u01b0\u1eddi giao __________________ &nbsp;&nbsp; Ng\u01b0\u1eddi nh\u1eadn __________________</p><small>B\u1ea3n in kh\u00f4ng thay th\u1ebf x\u00e1c nh\u1eadn nh\u1eadn tr\u00ean h\u1ec7 th\u1ed1ng.</small></html>');win.document.close();win.focus();win.print();}\nload();\n</script></body></html>\n";

/* Pure rules. No network, Google services or secrets in this file. */
var Domain = (function () {
  'use strict';
  var CLOSED = ['CLOSED'];
  var OUTCOMES = ['APPROVED', 'REFUSED', 'WITHDRAWN'];
  var STATUSES = ['UNVERIFIED', 'MERGED', 'RECEIVED', 'TRANSFER_WAIT', 'PROCESSING', 'RESULT_READY', 'RETURN_WAIT', 'FRONT_READY', 'CLOSED'];
  function fail(message) { throw new Error(message); }
  function text(value, label, max) {
    var v = String(value == null ? '' : value).trim();
    if (!v || v.length > (max || 500)) fail(label + ' không hợp lệ.');
    return v;
  }
  function date(value, optional) {
    if (!value && optional) return '';
    if (typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)) fail('Ngày phải có dạng YYYY-MM-DD.');
    var d = new Date(value + 'T00:00:00Z');
    if (!isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== value) fail('Ngày không tồn tại.');
    return value;
  }
  function normalizeCode(value) { return String(value || '').trim().replace(/\s+/g, '').toUpperCase(); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function hasRole(user, roles) { return roles.indexOf(user.role) >= 0; }
  function requireRole(user, roles) { if (!hasRole(user, roles)) fail('Tài khoản không có quyền thực hiện thao tác này.'); }
  function find(state, table, id) {
    return (state[table] || []).find(function (x) { return x.id === id; });
  }
  function activeUser(state, email) {
    var u = (state.users || []).find(function (x) { return x.email === String(email || '').toLowerCase() && x.active === true; });
    if (!u) fail('Tài khoản chưa được quản trị viên phân quyền.');
    return u;
  }
  function visible(c, user, state) {
    return hasRole(user, ['ADMIN', 'MANAGER', 'FRONT']) || c.owner === user.email ||
      (state.tasks || []).some(function (t) { return t.caseId === c.id && t.assignee === user.email; }) ||
      (state.transfers || []).some(function (t) { return t.caseId === c.id && (t.to === user.email || t.from === user.email); });
  }
  function canHandle(c, user) {
    if (!(hasRole(user, ['ADMIN', 'MANAGER']) || c.owner === user.email)) fail('Chỉ người đang phụ trách hoặc quản lý được cập nhật hồ sơ.');
  }
  function daysBetween(a, b) { return Math.floor((new Date(a + 'T00:00:00Z') - new Date(b + 'T00:00:00Z')) / 86400000); }
  function dueState(c, today) {
    if (['UNVERIFIED','MERGED'].indexOf(c.status)>=0 || !c.due) return 'UNKNOWN';
    if (CLOSED.indexOf(c.status) >= 0) return 'CLOSED';
    var n = daysBetween(c.due, today);
    return n < 0 ? 'OVERDUE' : n === 0 ? 'TODAY' : n <= 3 ? 'SOON' : 'ON_TIME';
  }
  function workingDue(start, days, holidays, includeStart) {
    date(start); if (!Number.isInteger(days) || days < 1 || days > 1000) fail('Số ngày làm việc không hợp lệ.');
    var d = new Date(start + 'T00:00:00Z'), n = 0;
    if (!includeStart) d.setUTCDate(d.getUTCDate() + 1);
    while (true) {
      var iso = d.toISOString().slice(0, 10), day = d.getUTCDay();
      var override = (holidays || []).find(function (x) { return x.date === iso; });
      var work = override ? override.working === true : day !== 0 && day !== 6;
      if (work && ++n === days) return iso;
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }
  function decide(state, user, action, input, ctx) {
    var p = clone(input || {}), changes = [], now = ctx.now, today = ctx.today;
    function put(table, row) { changes.push({table: table, row: row}); return row; }
    function uid(prefix) { return prefix + '_' + ctx.id(); }
    function getCase() {
      var item = find(state, 'cases', p.caseId); if (!item || !visible(item, user, state)) fail('Không tìm thấy hồ sơ được phép xem.');
      if(item.status==='MERGED')fail('Bản ghi đã hợp nhất vào '+item.mergedInto+'. Mở hồ sơ đích để thao tác.');
      if (item.version !== Number(p.version)) fail('Hồ sơ vừa thay đổi. Hãy tải lại trước khi cập nhật.');
      return clone(item);
    }
    function saveCase(c) { c.version += 1; c.updatedAt = now; put('cases', c); }
    function procedure(id) {
      var proc = find(state, 'procedures', id); if (!proc || proc.active !== true) fail('Chưa chọn thủ tục trong danh mục đang áp dụng.');
      return proc;
    }
    function documentEvidence() { return text(p.evidence, 'Căn cứ/văn bản', 2000); }
    function nonFuture(v) { date(v); if (v > today) fail('Ngày sự kiện thực tế không được ở tương lai.'); return v; }
    var c;
    if (action === 'create') {
      requireRole(user, ['ADMIN', 'FRONT']); procedure(p.procedure);
      var code = normalizeCode(p.code);
      if (code && !/^[A-Z0-9][A-Z0-9.\/-]{4,99}$/.test(code)) fail('Mã hồ sơ không hợp lệ.');
      if (code && (state.cases || []).some(function (x) { return normalizeCode(x.code) === code; })) fail('Mã hồ sơ đã tồn tại. Hãy mở hồ sơ cũ.');
      var received = nonFuture(p.received), due = date(p.due, true);
      if (due && due < received) fail('Hạn hẹn không được trước ngày tiếp nhận.');
      c = {id: uid('HS'), code: code, name: text(p.name, 'Họ tên'), landUser: String(p.landUser || ''), phone: String(p.phone || '').trim(), address: String(p.address || ''), procedure: p.procedure,
        received: received, originalDue: due, due: due, status: 'RECEIVED', owner: user.email, outcome: '', resultDate: '', returnDate: '', closedDate: '',
        createdAt: now, updatedAt: now, version: 1, verified: true, source: 'MANUAL', evidence: text(p.evidence,'Căn cứ tiếp nhận',2000), note: String(p.note || '')};
      if (c.phone && !/^\+?[0-9 .()-]{8,20}$/.test(c.phone)) fail('Số điện thoại không hợp lệ.');
      put('cases', c);
      (p.parcels || []).forEach(function (x) {
        if (x.area && (!isFinite(Number(x.area)) || Number(x.area) <= 0)) fail('Diện tích phải là số dương.');
        put('parcels', {id: uid('TD'), caseId: c.id, plot: String(x.plot || ''), map: String(x.map || ''), area: String(x.area || ''), village: String(x.village || ''), commune: String(x.commune || ''), serial: String(x.serial || ''), source: 'MANUAL'});
      });
    } else if (action === 'handoff' || action === 'return_result') {
      c = getCase(); canHandle(c, user);
      if (action === 'handoff' && ['RECEIVED', 'PROCESSING'].indexOf(c.status) < 0) fail('Hồ sơ chưa ở bước có thể bàn giao chuyên môn.');
      if (action === 'return_result' && c.status !== 'RESULT_READY') fail('Chưa có kết quả chuyên môn để bàn giao.');
      var target = activeUser(state, p.to);
      if (target.email === user.email) fail('Người nhận phải khác người giao.');
      if (action === 'handoff' && !hasRole(target, ['SPECIALIST', 'MANAGER'])) fail('Chọn cán bộ chuyên môn hoặc quản lý nhận hồ sơ.');
      if (action === 'return_result' && target.role !== 'FRONT') fail('Chọn cán bộ một cửa nhận kết quả.');
      if (action === 'return_result' && (state.tasks || []).some(function(t) {return t.caseId === c.id && ['DONE','CANCELLED'].indexOf(t.status) < 0;})) fail('Còn công việc chưa kết thúc.');
      var tr = put('transfers', {id: uid('BG'), batchId: String(p.batchId || uid('DOT')), caseId: c.id, from: user.email, to: target.email,
        kind: action === 'handoff' ? 'SPECIALIST' : 'FRONT', sentAt: now, acceptedAt: '', previousStatus: c.status, status: 'PENDING', note: text(p.note, 'Nội dung bàn giao', 3000)});
      c.status = action === 'handoff' ? 'TRANSFER_WAIT' : 'RETURN_WAIT'; c.pendingTransfer = tr.id; saveCase(c);
    } else if (action === 'accept_transfer') {
      c = getCase(); var transfer = clone(find(state, 'transfers', c.pendingTransfer) || {});
      if (!transfer.id || transfer.status !== 'PENDING') fail('Không có lượt bàn giao đang chờ.');
      if (transfer.to !== user.email) fail('Chỉ người nhận được chỉ định được xác nhận nhận.');
      transfer.status = 'ACCEPTED'; transfer.acceptedAt = now; put('transfers', transfer);
      c.owner = user.email; c.status = transfer.kind === 'FRONT' ? 'FRONT_READY' : 'PROCESSING'; c.pendingTransfer = ''; saveCase(c);
    } else if (action === 'reject_transfer') {
      c = getCase(); var rejected = clone(find(state, 'transfers', c.pendingTransfer) || {});
      if (!rejected.id || rejected.status !== 'PENDING' || rejected.to !== user.email) fail('Không có bàn giao chờ nhận cho tài khoản này.');
      rejected.status = 'REJECTED'; rejected.note += '\nTừ chối nhận: ' + text(p.reason, 'Lý do', 2000); put('transfers', rejected);
      c.status = rejected.previousStatus; c.pendingTransfer = ''; saveCase(c);
    } else if (action === 'assign_task') {
      c = getCase(); requireRole(user,['ADMIN','MANAGER','SPECIALIST']); canHandle(c, user);
      if (['RECEIVED', 'PROCESSING'].indexOf(c.status) < 0) fail('Không thể giao việc tại bước hiện tại.');
      var assignee = activeUser(state, p.assignee);
      if (!hasRole(assignee, ['SPECIALIST', 'MANAGER'])) fail('Người thực hiện phải là cán bộ chuyên môn.');
      var taskDue = date(p.due); if (taskDue < today) fail('Hạn công việc mới không được ở quá khứ.');
      put('tasks', {id: uid('CV'), caseId: c.id, title: text(p.title, 'Tên công việc'), assignee: assignee.email, assignedBy: user.email,
        assignedAt: now, due: taskDue, status: 'TODO', completedAt: '', blocker: '', nextStep: '', result: '', updatedAt: now}); saveCase(c);
    } else if (action === 'update_task') {
      c = getCase(); var task = clone(find(state, 'tasks', p.taskId) || {});
      if (!task.id || task.caseId !== c.id) fail('Không tìm thấy công việc.');
      if (task.assignee !== user.email && !hasRole(user, ['ADMIN', 'MANAGER'])) fail('Chỉ người được giao hoặc quản lý được cập nhật công việc.');
      if (['TODO', 'DOING', 'BLOCKED', 'DONE', 'CANCELLED'].indexOf(p.status) < 0) fail('Trạng thái công việc không hợp lệ.');
      if (['CLOSED','UNVERIFIED','RESULT_READY','RETURN_WAIT','FRONT_READY'].indexOf(c.status) >= 0) fail('Không được sửa công việc tại bước hiện tại.');
      task.status = p.status; task.blocker = p.status === 'BLOCKED' ? text(p.blocker, 'Lý do đang chờ') : '';
      task.nextStep = String(p.nextStep || ''); task.result = p.status === 'DONE' ? text(p.result, 'Kết quả công việc', 3000) : String(p.result || '');
      if (p.status === 'CANCELLED') task.result = text(p.result, 'Lý do hủy công việc', 3000);
      task.completedAt = ['DONE', 'CANCELLED'].indexOf(p.status) >= 0 ? now : ''; task.updatedAt = now; put('tasks', task); saveCase(c);
    } else if (action === 'record_result') {
      c = getCase(); canHandle(c, user);
      if (c.status !== 'PROCESSING') fail('Hồ sơ phải đang xử lý chuyên môn.');
      if (OUTCOMES.indexOf(p.outcome) < 0) fail('Chọn loại kết quả chính thức.');
      if ((state.tasks || []).some(function (t) { return t.caseId === c.id && ['DONE', 'CANCELLED'].indexOf(t.status) < 0; })) fail('Cần hoàn thành hoặc hủy có lý do các công việc đang mở.');
      c.resultDate = nonFuture(p.resultDate); if (c.resultDate < c.received) fail('Ngày kết quả trước ngày tiếp nhận.');
      c.outcome = p.outcome; c.resultRef = documentEvidence(); c.status = 'RESULT_READY'; saveCase(c);
    } else if (action === 'close') {
      c = getCase(); requireRole(user, ['ADMIN', 'FRONT']); canHandle(c, user);
      if (c.status !== 'FRONT_READY') fail('Một cửa chưa xác nhận nhận kết quả.');
      c.returnDate = nonFuture(p.returnDate); if (c.returnDate < c.resultDate) fail('Ngày trả trước ngày có kết quả.');
      c.returnEvidence = documentEvidence(); c.closedDate = c.returnDate; c.status = 'CLOSED'; saveCase(c);
    } else if (action === 'reopen') {
      c = getCase(); requireRole(user, ['ADMIN', 'MANAGER']);
      if (c.status !== 'CLOSED') fail('Chỉ mở lại hồ sơ đã đóng.');
      text(p.reason, 'Lý do mở lại'); c.status = 'RECEIVED'; c.owner = activeUser(state, p.owner).email;
      c.closedDate = ''; c.returnDate = ''; c.resultDate = ''; c.outcome = ''; c.resultRef = ''; saveCase(c);
    } else if (action === 'adjust_due') {
      c = getCase(); requireRole(user, ['ADMIN', 'MANAGER']);
      if (c.status === 'CLOSED') fail('Không điều chỉnh hạn hồ sơ đã đóng.');
      var adjusted = date(p.due); if (adjusted < c.received) fail('Hạn mới trước ngày tiếp nhận.');
      c.due = adjusted; c.dueReason = text(p.reason, 'Lý do điều chỉnh'); c.dueEvidence = documentEvidence(); saveCase(c);
    } else if (action === 'verify_case') {
      c = getCase(); requireRole(user, ['ADMIN', 'FRONT']);
      if (c.status !== 'UNVERIFIED') fail('Hồ sơ không ở hàng chờ xác minh.');
      procedure(p.procedure); c.procedure = p.procedure; c.received = nonFuture(p.received); c.due = date(p.due, true);
      if(p.code!==undefined){var verifiedCode=normalizeCode(p.code);if(verifiedCode&&(state.cases||[]).some(function(x){return x.id!==c.id&&normalizeCode(x.code)===verifiedCode;}))fail('Mã đã có ở hồ sơ khác. Đối soát/hợp nhất trước.');c.code=verifiedCode;}
      if(p.name!==undefined)c.name=text(p.name,'Họ tên');if(p.phone!==undefined)c.phone=String(p.phone);if(p.address!==undefined)c.address=String(p.address);
      if (c.due && c.due < c.received) fail('Hạn hẹn trước ngày nhận.');
      c.originalDue = c.due; c.owner = user.email; c.evidence = documentEvidence(); c.verified = true; c.status = 'RECEIVED';
      if(p.legacyClosed===true){
        c.resultDate=nonFuture(p.resultDate);c.returnDate=nonFuture(p.returnDate);
        if(c.resultDate<c.received||c.returnDate<c.resultDate)fail('Các mốc nhận/kết quả/trả không đúng thứ tự.');
        if(OUTCOMES.indexOf(p.outcome)<0)fail('Chọn kết quả lịch sử.');
        c.outcome=p.outcome;c.closedDate=c.returnDate;c.status='CLOSED';
      }
      saveCase(c);
    } else if (action === 'merge_legacy') {
      c=getCase();requireRole(user,['ADMIN']);
      var targetCase=clone(find(state,'cases',p.targetId)||{});
      if(c.status!=='UNVERIFIED'||targetCase.status!=='UNVERIFIED'||targetCase.id===c.id)fail('Chỉ hợp nhất hai hồ sơ lịch sử chưa xác minh khác nhau.');
      if(targetCase.version!==Number(p.targetVersion))fail('Hồ sơ đích vừa thay đổi. Hãy tải lại.');
      if(c.code&&targetCase.code&&c.code!==targetCase.code)fail('Hai mã DVC khác nhau: giữ hai hồ sơ và đối soát liên kết, không hợp nhất.');
      text(p.reason,'Lý do và căn cứ hợp nhất');
      if(!targetCase.code&&c.code){targetCase.code=c.code;c.code='';}
      ['parcels','reviews','documents','payments'].forEach(function(table){(state[table]||[]).filter(function(x){return x.caseId===c.id;}).forEach(function(x){var moved=clone(x);moved.caseId=targetCase.id;put(table,moved);});});
      c.status='MERGED';c.mergedInto=targetCase.id;saveCase(c);saveCase(targetCase);
    } else if (action === 'save_user') {
      requireRole(user, ['ADMIN']); var email = text(p.email, 'Email').toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('Email không hợp lệ.');
      if (['ADMIN', 'MANAGER', 'FRONT', 'SPECIALIST'].indexOf(p.role) < 0) fail('Vai trò không hợp lệ.');
      var existing = (state.users || []).find(function (x) { return x.email === email; });
      if (existing && existing.role === 'ADMIN' && existing.active && (p.role !== 'ADMIN' || !p.active) &&
        (state.users || []).filter(function (x) { return x.role === 'ADMIN' && x.active; }).length <= 1) fail('Phải giữ ít nhất một quản trị viên hoạt động.');
      put('users', {id: existing ? existing.id : uid('ND'), email: email, name: text(p.name, 'Tên cán bộ'), role: p.role, active: p.active === true, notifications: p.notifications === true});
    } else if (action === 'save_procedure') {
      requireRole(user, ['ADMIN']); put('procedures', {id: text(p.id, 'Mã thủ tục', 100), name: text(p.name, 'Tên thủ tục'), active: p.active === true, rule: String(p.rule || '')});
    } else if (action === 'save_holiday') {
      requireRole(user, ['ADMIN']); var hd = date(p.date); put('holidays', {id: hd, date: hd, working: p.working === true, note: text(p.note, 'Ghi chú lịch')});
    } else if (action === 'add_document') {
      c = getCase(); canHandle(c, user);
      put('documents', {id: uid('TL'), caseId: c.id, fileId: text(p.fileId, 'Drive file ID', 200), name: text(p.name, 'Tên tài liệu'), type: text(p.type, 'Loại tài liệu'), hash: String(p.hash || ''), createdAt: now}); saveCase(c);
    } else if (action === 'add_parcel') {
      c=getCase();canHandle(c,user);
      if(['CLOSED','UNVERIFIED'].indexOf(c.status)>=0&&!hasRole(user,['ADMIN','MANAGER']))fail('Thửa hồ sơ lịch sử/đã đóng cần quản lý xác nhận.');
      if(p.area&&(!isFinite(Number(p.area))||Number(p.area)<=0))fail('Diện tích phải là số dương.');
      put('parcels',{id:uid('TD'),caseId:c.id,plot:text(p.plot,'Số thửa'),map:text(p.map,'Số tờ'),area:String(p.area||''),village:String(p.village||''),commune:String(p.commune||''),serial:String(p.serial||''),source:documentEvidence()});saveCase(c);
    } else if (action === 'add_payment') {
      c = getCase(); requireRole(user, ['ADMIN', 'FRONT']);
      var receipt = text(p.receipt, 'Số biên lai');
      if ((state.payments || []).some(function (x) { return x.caseId === c.id && x.receipt === receipt; })) fail('Biên lai này đã được ghi.');
      var amount = Number(p.amount); if (!Number.isSafeInteger(amount) || amount <= 0) fail('Số tiền phải là số nguyên VND dương.');
      put('payments', {id: uid('TT'), caseId: c.id, receipt: receipt, date: nonFuture(p.date), amount: amount, type: text(p.type, 'Loại khoản thu'), evidence: documentEvidence(), createdAt: now}); saveCase(c);
    } else fail('Thao tác chưa được hỗ trợ.');
    return {changes: changes, result: {caseId: c ? c.id : '', message: 'Đã ghi nhận và lưu lịch sử.'}};
  }
  function apply(state, changes) {
    changes.forEach(function (ch) { var rows = state[ch.table] || (state[ch.table] = []); var i = rows.findIndex(function (x) { return x.id === ch.row.id; }); if (i < 0) rows.push(clone(ch.row)); else rows[i] = clone(ch.row); });
    return state;
  }
  function dashboard(state, today, from, to) {
    date(today); date(from); date(to); if (from > to) fail('Kỳ báo cáo không hợp lệ.');
    var cases = state.cases || [], tasks = state.tasks || [], transfers = state.transfers || [], events = state.events || [];
    var verified = cases.filter(function (c) { return ['UNVERIFIED','MERGED'].indexOf(c.status)<0; });
    var counts = {total: cases.filter(function(c){return c.status!=='MERGED';}).length, unverified: cases.filter(function(c){return c.status==='UNVERIFIED';}).length, active: 0, overdue: 0, soon: 0, today: 0, unknownDue: 0, waitingTransfer: 0, readyReturn: 0, closed: 0};
    verified.forEach(function (c) { var due = dueState(c, today); if (c.status === 'CLOSED') counts.closed++; else { counts.active++; if (due === 'OVERDUE') counts.overdue++; if (due === 'TODAY') counts.today++; if (due === 'SOON') counts.soon++; if (due === 'UNKNOWN') counts.unknownDue++; }
      if (['TRANSFER_WAIT', 'RETURN_WAIT'].indexOf(c.status) >= 0) counts.waitingTransfer++; if (c.status === 'FRONT_READY') counts.readyReturn++;
    });
    var staff = (state.users || []).filter(function (u) { return u.active; }).map(function (u) {
      var owned = verified.filter(function (c) { return c.owner === u.email && c.status !== 'CLOSED'; });
      var mine = tasks.filter(function (t) { return t.assignee === u.email; });
      var done = mine.filter(function (t) { return t.status === 'DONE' && t.completedAt.slice(0, 10) >= from && t.completedAt.slice(0, 10) <= to; });
      var open = mine.filter(function (t) { return ['DONE', 'CANCELLED'].indexOf(t.status) < 0; });
      return {email: u.email, name: u.name, role: u.role, cases: owned.length, open: open.length, blocked: open.filter(function (t) { return t.status === 'BLOCKED'; }).length,
        overdue: open.filter(function (t) { return t.due < today; }).length, done: done.length, onTime: done.filter(function (t) { return t.completedAt.slice(0, 10) <= t.due; }).length,
        waitingReceive: transfers.filter(function (t) { return t.to === u.email && t.status === 'PENDING'; }).length,
        staleCases: owned.filter(function (c) { return daysBetween(today, c.updatedAt.slice(0, 10)) >= 7; }).length};
    });
    // Event-time movements only. Migrated cases do not invent historical intake/closure events.
    var period = {intakes: 0, closed: 0, reopened: 0, verifiedLegacy: 0, verifiedOpen:0, results: 0, returned: 0, taskCompletions: 0};
    events.forEach(function (e) { if (e.at.slice(0, 10) < from || e.at.slice(0, 10) > to) return;
      if (e.action === 'create') period.intakes++; if (e.action === 'close') { period.closed++; period.returned++; }
      if (e.action === 'reopen') period.reopened++; if (e.action === 'verify_case') {period.verifiedLegacy++;if(!e.input||e.input.legacyClosed!==true)period.verifiedOpen++;} if (e.action === 'record_result') period.results++;
      if (e.action === 'update_task' && e.input && e.input.status === 'DONE') period.taskCompletions++;
    });
    var before={},end={};
    events.forEach(function(e){(e.changes||[]).filter(function(ch){return ch.table==='cases';}).forEach(function(ch){if(e.at.slice(0,10)<from)before[ch.row.id]=ch.row;if(e.at.slice(0,10)<=to)end[ch.row.id]=ch.row;});});
    function openCount(items){return Object.keys(items).filter(function(id){return ['UNVERIFIED','MERGED','CLOSED'].indexOf(items[id].status)<0;}).length;}
    period.opening=openCount(before);period.ending=openCount(end);
    period.reconciled=period.opening+period.intakes+period.reopened+period.verifiedOpen-period.closed===period.ending;
    return {counts: counts, staff: staff, period: period, from: from, to: to, today: today, note: 'Hồ sơ lịch sử chưa xác minh không nằm trong thống kê xử lý chính thức. Số hoàn thành công việc theo trạng thái hiện tại; lượt hoàn thành theo nhật ký được báo riêng.'};
  }
  return {decide: decide, apply: apply, dashboard: dashboard, dueState: dueState, workingDue: workingDue, visible: visible, activeUser: activeUser, normalizeCode: normalizeCode, date: date, statuses: STATUSES};
})();

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
function doGet() { return HtmlService.createHtmlOutput(APP_HTML).setTitle('Hồ sơ • Hợp Thịnh').addMetaTag('viewport','width=device-width, initial-scale=1'); }
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
