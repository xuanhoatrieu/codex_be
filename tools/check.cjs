const fs=require('node:fs'),vm=require('node:vm');
for(const file of fs.readdirSync('apps-script').filter(f=>f.endsWith('.gs')))new vm.Script(fs.readFileSync('apps-script/'+file,'utf8'),{filename:file});
const html=fs.readFileSync('apps-script/Index.html','utf8');new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1],{filename:'Index.html'});
JSON.parse(fs.readFileSync('apps-script/appsscript.json','utf8'));
console.log('Apps Script, browser JavaScript and manifest syntax OK');
