'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {_electron}=require(process.env.FRAME_PLAYWRIGHT_MODULE||'playwright-core');
const {PNG}=require('../windows/node_modules/pngjs');
const root=path.resolve(__dirname,'..');
const options=Object.fromEntries(process.argv.slice(2).reduce((pairs,value,index,args)=>index%2?pairs:[...pairs,[value.replace(/^--/,''),args[index+1]]],[]));
function pixelCheck(bytes,width,height){const p=PNG.sync.read(bytes);assert.equal(p.width,width);assert.equal(p.height,height);let transparent=0,partial=0,visible=0;for(let i=3;i<p.data.length;i+=4){const a=p.data[i];if(a===0)transparent++;else if(a<255)partial++;if(a>200)visible++;}assert.ok(transparent>0,'Missing transparent pixels');assert.ok(partial>0,'Missing partial alpha');assert.ok(visible>0,'Empty render');return{width,height,transparent,partial,visible};}
(async()=>{
 for(const key of ['electron','svga','pag'])assert.ok(options[key],'Missing --'+key);
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'frame-png-test-')),out=path.resolve(options.output||path.join(temp,'exports')),user=path.join(temp,'state');await fs.mkdir(user);await fs.mkdir(out,{recursive:true});await fs.writeFile(path.join(user,'settings.json'),JSON.stringify({outputDir:out}));
 const app=await _electron.launch({executablePath:path.resolve(options.electron),args:[path.join(root,'windows/app'),'--test-state',user],env:{...process.env,FRAME_TEST_FFMPEG:options.ffmpeg||'ffmpeg',FRAME_TEST_FFPROBE:options.ffprobe||'ffprobe'}});
 const report=[];try{
  const page=await app.firstWindow(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.waitForSelector('#add-files');
  for(const tool of ['svga-pag','svga-gif','pag-gif','svga-png','pag-png','mp3','mp4-png']){
   await page.locator(`[data-tool="${tool}"]`).click();await page.waitForFunction(t=>state.activeTool===t,tool);
   const input=tool.startsWith('svga')?'SVGA':tool.startsWith('pag')?'PAG':tool==='mp3'?'MP3':'MP4';
   assert.ok((await page.locator('#add-canvas').innerText()).includes(input));assert.ok((await page.locator('#preview-empty p').innerText()).includes(input));assert.equal(await page.locator('.format-art').getAttribute('data-empty-tool'),tool);
   assert.equal(await page.locator('#options-png').isVisible(),tool.endsWith('-png'));assert.equal(await page.locator('#output-quality-control').isVisible(),!tool.endsWith('-png'));
   if(tool.endsWith('-png'))assert.equal(await page.locator('.empty-page').count(),3);
   if(tool==='mp3')assert.equal(await page.locator('.empty-wave').count(),2);
   if(options.screenshots){await fs.mkdir(options.screenshots,{recursive:true});await page.screenshot({path:path.join(options.screenshots,tool+'.png')});}
  }
  for(const tool of ['svga-png','pag-png']){
   console.log('Testing',tool);
   await page.locator(`[data-tool="${tool}"]`).click();await page.waitForFunction(t=>state.activeTool===t,tool);
   await page.evaluate(()=>post('settings',{pngFPS:0,pngSize:0}));
   await page.evaluate(source=>post('addPaths',{paths:[source]}),path.resolve(tool==='svga-png'?options.svga:options.pag));
   await page.waitForFunction(()=>state.files.some(f=>f.id===state.selectedId&&f.status==='ready')&&!document.querySelector('#play').disabled,null,{timeout:60000});
   const info=await page.evaluate(()=>current().info);await page.locator('#convert').click();await page.waitForFunction(()=>['done','error'].includes(current()?.status)&&!state.busy,null,{timeout:180000});
   const first=await page.evaluate(()=>({...current()}));assert.equal(first.status,'done',first.error);const names=(await fs.readdir(first.output)).sort();assert.equal(names.length,info.frames);assert.equal(names[0],'frame_000000.png');assert.equal(names.at(-1),`frame_${String(info.frames-1).padStart(6,'0')}.png`);
   const pixels=pixelCheck(await fs.readFile(path.join(first.output,names[Math.floor(names.length*.6)])),info.width,info.height);
   await page.locator('#png-fps').selectOption('5');await page.locator('#png-size').selectOption('480');await page.waitForFunction(()=>state.settings.pngFPS===5&&state.settings.pngSize===480);assert.ok(await page.locator('.settings-changed').isVisible());
   await page.getByRole('button',{name:'按当前设置重新导出',exact:true}).click();await page.waitForFunction(old=>(current()?.status==='error'||current()?.status==='done'&&current()?.output!==old)&&!state.busy,first.output,{timeout:180000});
   const second=await page.evaluate(()=>({...current()}));assert.equal(second.status,'done',second.error);const newNames=(await fs.readdir(second.output)).sort(),factor=Math.min(1,480/Math.max(info.width,info.height));assert.equal(newNames.length,Math.ceil(info.duration*Math.min(5,info.fps)));pixelCheck(await fs.readFile(path.join(second.output,newNames[Math.floor(newNames.length*.6)])),Math.floor(info.width*factor),Math.floor(info.height*factor));assert.equal((await fs.readdir(first.output)).length,info.frames);
   await page.locator('#png-fps').selectOption('0');await page.locator('#png-size').selectOption('0');await page.waitForFunction(()=>state.settings.pngFPS===0&&state.settings.pngSize===0);await page.locator('#convert').click();await page.waitForFunction(()=>state.busy);assert.ok(await page.locator('#png-fps').isDisabled());await page.locator('#convert').click();await page.waitForFunction(()=>!state.busy&&current()?.status==='cancelled',null,{timeout:60000});assert.equal((await fs.readdir(first.output)).length,info.frames);assert.equal((await fs.readdir(second.output)).length,newNames.length);
   report.push({tool,originalFrames:info.frames,resampledFrames:newNames.length,pixels,reexport:true,cancel:true});
  }
  assert.deepEqual(errors,[]);await fs.writeFile(path.join(out,'verification.json'),JSON.stringify(report,null,2));console.log('PASS: seven tool empty states, two transparent PNG exports, original frames, resized frames, re-export, no overwrite and cancellation.');console.log(JSON.stringify(report));
 }finally{await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
