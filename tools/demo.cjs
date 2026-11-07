/* Local UI validation only. Uses Google-service test doubles and synthetic data. */
const http=require('node:http'),fs=require('node:fs'),crypto=require('node:crypto');
const {googleHarness}=require('../tests/harness.cjs');
const h=googleHarness(),c=h.context;c.initializeEnvironment();
function call(action,input={}){return c.api({action,input,requestId:crypto.randomUUID()});}
call('save_procedure',{id:'CLD',name:'Cấp giấy chứng nhận lần đầu',active:true,rule:'Danh mục thử nghiệm'});
for(const [email,name,role] of [['front@example.test','Một cửa thử nghiệm','FRONT'],['specialist@example.test','Chuyên môn thử nghiệm','SPECIALIST'],['manager@example.test','Quản lý thử nghiệm','MANAGER']])call('save_user',{email,name,role,active:true});
h.login('front@example.test');
const a=call('create',{code:'TEST-2026-001',name:'Công dân thử nghiệm A',procedure:'CLD',received:'2026-11-01',due:'2026-11-06',evidence:'Phiếu giả lập 001',parcels:[{plot:'07T',map:'11',area:'120.5',village:'Thôn thử nghiệm'}]}).caseId;
const b=call('create',{code:'TEST-2026-002',name:'Công dân thử nghiệm B',procedure:'CLD',received:'2026-11-07',due:'2026-11-10',evidence:'Phiếu giả lập 002'}).caseId;
call('handoff',{caseId:a,version:1,to:'specialist@example.test',note:'Bàn giao thử nghiệm'});h.login('specialist@example.test');call('accept_transfer',{caseId:a,version:2});call('assign_task',{caseId:a,version:3,title:'Thẩm tra thử nghiệm',assignee:'specialist@example.test',due:'2026-11-09'});
h.login('admin@example.test');call('import_batch',{records:[{table:'cases',row:{id:'LEGACY-DEMO',name:'Hồ sơ lịch sử giả lập',code:'',due:'2026-01-01'}},{table:'reviews',row:{id:'REVIEW-DEMO',caseId:'LEGACY-DEMO',kind:'LEGACY_SOURCE',status:'OPEN',source:'Tệp giả lập',message:'Chưa có mã và ngày tiếp nhận; cần kiểm tra.'}}]});
const users=['admin','front','specialist','manager'];
const server=http.createServer(async(req,res)=>{
 const cookie=String(req.headers.cookie||'').match(/demo_user=(\w+)/)?.[1]||'admin';h.login((users.includes(cookie)?cookie:'admin')+'@example.test');
 try{
  if(req.url==='/'&&req.method==='GET'){
   let html=fs.readFileSync('apps-script/Index.html','utf8');
   const banner='<div class="demo">BẢN THỬ CỤC BỘ · DỮ LIỆU GIẢ · CHƯA KẾT NỐI GOOGLE <select aria-label="Tài khoản thử nghiệm" id="demoUser" style="display:inline;width:auto;margin:0 10px" onchange="fetch(\'/session\',{method:\'POST\',body:this.value}).then(()=>load())">'+users.map(u=>'<option '+(u===cookie?'selected':'')+' value="'+u+'">'+u+'</option>').join('')+'</select></div>';
   html=html.replace('<body>','<body>'+banner);res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html);return;
  }
  let body='';for await(const chunk of req){body+=chunk;if(body.length>15_000_000)throw Error('Request too large');}
  if(req.url==='/session'&&req.method==='POST'){if(!users.includes(body))throw Error('Unknown demo user');res.writeHead(200,{'Set-Cookie':'demo_user='+body+'; Path=/; SameSite=Strict; HttpOnly','Content-Type':'application/json'});res.end('{}');return;}
  if(req.url==='/api'&&req.method==='POST'){const r=JSON.parse(body);if(['upload_pdf','settings','send_reminders','scan_pdf','poll_pdf','retry_pdf','refresh_sheet_dashboard'].includes(r.action))throw Error('Tích hợp Google/PDF không chạy trong bản thử cục bộ.');const result=c.api(r);res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(result));return;}
  res.writeHead(404);res.end('Not found');
 }catch(e){res.writeHead(400,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify({error:e.message}));}
});
server.listen(Number(process.env.DEMO_PORT||8787),'127.0.0.1',()=>console.log('Synthetic UI demo running; no Google authentication or personal data.'));
