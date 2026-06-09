const fs=require('fs');const path=require('path');
function walk(dir){
  fs.readdirSync(dir).forEach(f=>{
    const p=path.join(dir,f);
    try{
      const s=fs.statSync(p);
      if(s.isDirectory()){
        if(f==='node_modules') return;
        walk(p);
      } else if(f==='package.json'){
        try{
          const j=JSON.parse(fs.readFileSync(p,'utf8'));
          const v=j.version;
          if(typeof v!=='string' || v.trim()===''){
            console.log(p+' -> INVALID: '+JSON.stringify(v));
          }
        }catch(e){
          console.error('ERR '+p+': '+e.message);
        }
      }
    }catch(e){}
  });
}
walk(process.cwd());
console.log('Done');
