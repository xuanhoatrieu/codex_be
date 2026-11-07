const fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
function domain(){const context=vm.createContext({console,Date,JSON});vm.runInContext(fs.readFileSync('apps-script/Domain.gs','utf8'),context);return context.Domain;}
function googleHarness(){
 const context=vm.createContext({console:{log:()=>{},error:console.error},Date,JSON});let active='admin@example.test',fault=null;const properties=new Map(),books=new Map(),cache=new Map();
 class Range{
  constructor(sheet,r,c,n,m){Object.assign(this,{sheet,r,c,n,m});}
  getValues(){return Array.from({length:this.n},(_,i)=>Array.from({length:this.m},(_,j)=>this.sheet.rows[this.r+i-1]?.[this.c+j-1]??''));}
  setValues(values){if(fault===this.sheet.name){fault=null;throw new Error('simulated projection failure');}values.forEach((row,i)=>row.forEach((value,j)=>{const r=this.r+i-1;this.sheet.rows[r]??=[];this.sheet.rows[r][this.c+j-1]=value;}));return this;}
  setBackground(){return this;}setFontColor(){return this;}setFontWeight(){return this;}setNumberFormat(){return this;}
 }
 class Sheet{
  constructor(name){this.name=name;this.rows=[];}
  getRange(r,c,n=1,m=1){return new Range(this,r,c,n,m);}getLastRow(){return this.rows.length;}getMaxRows(){return Math.max(1000,this.rows.length);}insertRowsAfter(){}setFrozenRows(){}
 }
 class Book{
  constructor(){this.id=crypto.randomUUID();this.sheets=new Map();books.set(this.id,this);}
  getSheetByName(name){return this.sheets.get(name);}insertSheet(name){const s=new Sheet(name);this.sheets.set(name,s);return s;}getId(){return this.id;}getUrl(){return 'https://docs.google.com/spreadsheets/d/'+this.id;}setSpreadsheetTimeZone(){}
 }
 function folder(){const id=crypto.randomUUID();return {getId:()=>id,getUrl:()=>`https://drive.google.com/drive/folders/${id}`,createFolder:folder};}
 Object.assign(context,{
  PropertiesService:{getScriptProperties:()=>({getProperty:k=>properties.get(k)||null,setProperty:(k,v)=>properties.set(k,v),setProperties:o=>Object.entries(o).forEach(([k,v])=>properties.set(k,v))})},
  Session:{getActiveUser:()=>({getEmail:()=>active}),getEffectiveUser:()=>({getEmail:()=> 'admin@example.test'})},
  Utilities:{getUuid:()=>crypto.randomUUID(),formatDate:()=> '2026-11-07T15:00:00+07:00',DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},computeDigest:(_,v)=>Array.from(crypto.createHash('sha256').update(typeof v==='string'?v:Buffer.from(v)).digest()),base64Decode:v=>Array.from(Buffer.from(v,'base64')),base64Encode:v=>Buffer.from(v).toString('base64'),newBlob:(bytes,type,name)=>({bytes,type,name})},
  CacheService:{getScriptCache:()=>({get:k=>cache.get(k)||null,put:(k,v)=>cache.set(k,v),remove:k=>cache.delete(k)})},
  SpreadsheetApp:{create:()=>new Book(),openById:id=>books.get(id),flush:()=>{}},
  DriveApp:{createFolder:folder,getFolderById:()=>({createFile:blob=>({getId:()=>crypto.randomUUID()})})},LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},
  ScriptApp:{getProjectTriggers:()=>[]},MailApp:{getRemainingDailyQuota:()=>100,sendEmail:mail=>{context.sent++;context.lastMail=mail;}},sent:0
 });
 for(const file of ['Domain.gs','Server.gs','Automation.gs','Auth.gs'])vm.runInContext(fs.readFileSync('apps-script/'+file,'utf8'),context);
 return {context,login:email=>active=email,failProjection:table=>fault=table,properties,books};
}
module.exports={domain,googleHarness};
