const fs=require('fs'),path=require('path'),root=path.join(__dirname,'app');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
fs.writeFileSync(path.join(root,'ui/index.html'),read('ui/index.template.html').replace('__CSS__',read('ui/style.css')).replace('__JS__',read('ui/app.js')).replace('__PLAYER__',read('vendor/svga.min.js')).replace('__PAG__',read('vendor/libpag.js')));
