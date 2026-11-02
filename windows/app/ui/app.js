const $=id=>document.getElementById(id);
let state={files:[],selectedId:'',busy:false,outputDir:'',activeTool:'svga-pag',settings:{quality:'balanced',gifFPS:15,gifSize:480,background:'white',pngFPS:0,pngSize:0,pagQuality:0,gifQuality:50,audioQuality:50}},filter='all',player=null,video=null,playing=false,previewId='',previewSeq=0,loop=true,toastTimer;
const thumbs=new Map();
const icon=id=>`<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
const label={loading:'读取中',ready:'待转换',queued:'排队中',running:'转换中',done:'已完成',error:'失败',cancelled:'已停止'};
function bytes(n){return n>=1048576?(n/1048576).toFixed(2)+' MB':n>=1024?Math.round(n/1024)+' KB':n+' B'}
function post(action,extra={}){const handler=window.webkit?.messageHandlers?.frame;if(handler)handler.postMessage({action,...extra});else toast('请打开 Frame.exe 使用桌面功能。')}
function toast(message){clearTimeout(toastTimer);$('toast').textContent=message;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,4000)}
function current(){return state.files.find(f=>f.id===state.selectedId)}
function setIcon(button,name){button.innerHTML=icon(name)}
function renderQueue(){
 const text=$('search').value.trim().toLowerCase();
 const files=state.files.filter(f=>f.tool===(state.activeTool||'svga-pag')).filter(f=>(filter==='all'||(filter==='error'?['error','cancelled'].includes(f.status):filter==='ready'?['ready','queued','loading','running'].includes(f.status):f.status===filter))&&f.name.toLowerCase().includes(text));
 const list=$('file-list');list.replaceChildren();
 for(const file of files){
  const row=document.createElement('div');row.className='file-item'+(file.id===state.selectedId?' selected':'');row.setAttribute('role','option');row.setAttribute('aria-selected',String(file.id===state.selectedId));row.tabIndex=0;row.dataset.id=file.id;row.title=file.name;
  const thumb=document.createElement('div');thumb.className='file-thumb';
  if(thumbs.has(file.id)){const image=document.createElement('img');image.src=thumbs.get(file.id);image.alt='';thumb.append(image)}else thumb.innerHTML=icon(file.tool==='mp3'?'music':file.tool==='mp4-png'?'video':'file');
  const copy=document.createElement('div');copy.className='file-copy';
  const name=document.createElement('p');name.className='file-name';name.textContent=file.name;
  const meta=document.createElement('p');meta.className='file-meta';meta.textContent=file.info?(file.tool==='mp3'?`${(file.info.sampleRate/1000).toFixed(1)} kHz · ${file.info.duration.toFixed(1)}s`:`${file.info.width} × ${file.info.height} · ${Number(file.info.fps.toFixed(2))} fps`):bytes(file.bytes);
  const status=document.createElement('p');status.className='file-state '+file.status;
  if(file.status==='done')status.innerHTML=icon('check');else if(['error','cancelled'].includes(file.status))status.innerHTML=icon('warning');
  const statusText=document.createElement('span');statusText.textContent=label[file.status]+(file.status==='running'?` ${file.progress}%`:'');status.append(statusText);
  copy.append(name,meta,status);row.append(thumb,copy);
  if(!['queued','running'].includes(file.status)){const remove=document.createElement('button');remove.className='icon-button row-remove';remove.innerHTML=icon('close');remove.title='从队列中移除';remove.setAttribute('aria-label','移除 '+file.name);remove.onclick=e=>{e.stopPropagation();post('remove',{id:file.id})};row.append(remove)}
  if(file.status==='running'){const track=document.createElement('div');track.className='row-progress';const fill=document.createElement('span');fill.style.width=file.progress+'%';track.append(fill);row.append(track)}
  row.onclick=()=>post('select',{id:file.id});
  row.onkeydown=e=>{if(e.key==='Enter'){post('select',{id:file.id})}if(['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const i=files.indexOf(file),next=files[Math.max(0,Math.min(files.length-1,i+(e.key==='ArrowUp'?-1:1)))];post('select',{id:next.id})}};
  list.append(row);
 }
 if(!files.length&&state.files.some(f=>f.tool===(state.activeTool||'svga-pag'))){const empty=document.createElement('p');empty.className='no-match';empty.textContent=text?'没有匹配的文件':filter==='done'?'完成的文件会显示在这里':filter==='error'?'当前没有失败的文件':'没有待转换的文件';list.append(empty)}
 $('queue-empty').hidden=state.files.some(f=>f.tool===(state.activeTool||'svga-pag'));
 const total=state.files.filter(f=>f.tool===(state.activeTool||'svga-pag')).length;$('queue-count').textContent=total+' 个文件';$('nav-count').textContent=total;
 const done=state.files.filter(f=>f.status==='done'&&f.tool===(state.activeTool||'svga-pag')).length;$('done-count').textContent=done;$('clear-done').disabled=!done;
 $('queue-summary').textContent=total?`已完成 ${done} / ${total}`:'队列已就绪';
 document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('selected',b.dataset.filter===filter));
 $('nav-all').classList.toggle('active',filter!=='done');$('nav-done').classList.toggle('active',filter==='done');
}
function render(){
 renderQueue();renderTool();const file=current(),i=file?.info;
 $('selected-file').textContent=file?.name||'尚未选择文件';$('selected-file').classList.toggle('has-file',!!file);
 const audio=file?.tool==='mp3';
 $('meta-label-size').textContent=audio?'采样率':'画面尺寸';$('meta-label-fps').textContent=audio?'声道':'帧率';$('meta-label-duration').textContent=audio?'时长':file?.tool==='mp4-png'?'时长 / 预计帧数':'时长 / 总帧数';
 $('meta-size').textContent=i?(audio?`${(i.sampleRate/1000).toFixed(1)} kHz`:`${i.width} × ${i.height}`):'—';$('meta-fps').textContent=i?(audio?(i.channels===1?'单声道':i.channels===2?'立体声':i.channels+' 声道'):`${Number(i.fps.toFixed(2))} fps`):'—';$('meta-duration').textContent=i?(audio?`${i.duration.toFixed(2)}s`:`${i.duration.toFixed(2)}s / ${i.frames} 帧`):'—';$('meta-bytes').textContent=file?bytes(file.bytes):'—';
 $('bitrate-row').hidden=!audio;$('meta-bitrate').textContent=i&&i.bitrate?`${Math.round(i.bitrate/1000)} kbps`:'—';document.querySelector('.format-badge').textContent=audio?'MP3':file?.tool==='mp4-png'?'MP4':file?.tool==='pag-gif'?'PAG':'SVGA';
 const path=state.outputDir.split('/');$('folder-name').textContent=path.pop()||'选择输出文件夹';$('folder-parent').textContent=path.join('/').replace(/^\/Users\/[^/]+\//,'~/');document.querySelector('.folder-card').title=state.outputDir;
 $('choose-output').disabled=state.busy;
 const jobs=exportJobs(),ready=jobs.length,reexport=ready>0&&jobs.every(f=>f.status==='done');
 $('convert').classList.toggle('stop',state.busy);$('convert').disabled=state.cancelRequested||(!state.busy&&!ready);
 $('convert').querySelector('span').textContent=state.busy?(state.cancelRequested?'正在停止…':'停止转换'):ready?`${reexport?'重新导出':state.activeTool==='mp3'?'开始压缩':state.activeTool==='mp4-png'?'导出 PNG':'开始转换'} · ${ready} 个文件`:(state.activeTool==='mp3'?'开始压缩':state.activeTool==='mp4-png'?'导出 PNG':'开始转换');
 $('convert').querySelector('svg use').setAttribute('href','#i-'+(state.busy?'stop':'arrow'));
 $('convert-hint').textContent=state.busy?'已完成的文件会保留':ready?(reexport?'按当前设置生成新文件，保留上次结果':'Ctrl Enter 开始批量转换'):'添加文件后即可开始';
 const active=state.files.find(f=>f.status==='running');
 $('status').textContent=active?`${active.name} · ${active.stage} · ${active.progress}%`:state.busy?'正在准备转换队列':state.files.length?`队列 ${state.files.length} 个文件 · 已完成 ${state.files.filter(f=>f.status==='done'&&f.tool===(state.activeTool||'svga-pag')).length} 个`:'准备就绪';
 $('status-right').textContent=active?'请保持 App 打开':'Frame 3.2 · 全部在本机处理';
 const result=$('result');result.replaceChildren();result.hidden=true;result.className='result';
 if(file&&['done','error','cancelled','running','queued'].includes(file.status)){
  result.hidden=false;result.classList.add(file.status==='done'?'done':file.status==='error'||file.status==='cancelled'?'error':'running');
  const title=document.createElement('strong'),detail=document.createElement('p');title.textContent=file.status==='done'?(file.tool==='mp3'?'压缩完成':file.tool==='mp4-png'?'导出完成':'转换完成'):file.status==='running'?`转换中 · ${file.progress}%`:file.status==='queued'?'正在排队':file.status==='cancelled'?'转换已停止':'这个文件需要处理';
  if(file.status==='done'){
   const ratio=(1-file.outputBytes/file.bytes)*100;
   detail.textContent=file.tool==='mp4-png'?`${file.resultFrames} 张 PNG · ${bytes(file.outputBytes)}`:`${bytes(file.bytes)} → ${bytes(file.outputBytes)}${ratio>=1?` · 缩小 ${ratio.toFixed(0)}%`:file.tool==='mp3'?' · 体积基本不变':''}`;
   const reveal=document.createElement('button');reveal.className='text-button';reveal.innerHTML=icon('folder')+'在 文件夹 中显示';reveal.onclick=()=>post('reveal',{id:file.id});result.append(title,detail,reveal);
   if(file.resultNote){const note=document.createElement('p');note.className='result-note';note.textContent=file.resultNote;result.append(note)}
   if(file.resultSettingsKey!==settingsKey(file.tool)){const changed=document.createElement('p');changed.className='settings-changed';changed.textContent='设置已调整，上次结果保持不变。重新导出后生效。';result.append(changed)}
   const again=document.createElement('button');again.className='reexport-button';again.innerHTML=icon('retry')+'按当前设置重新导出';again.disabled=state.busy;again.onclick=()=>post('retry',{id:file.id});result.append(again);
   if(file.tool==='mp3'){const listen=document.createElement('button');listen.className='text-button listen-result';listen.innerHTML=icon('music')+'试听压缩结果';listen.onclick=()=>post('previewMedia',{id:file.id,result:true});result.append(listen)}
   else if(['svga-gif','pag-gif'].includes(file.tool)){const view=document.createElement('button');view.className='text-button';view.innerHTML=icon('play')+'预览 GIF 结果';view.onclick=()=>post('previewResult',{id:file.id});result.append(view)}
  }else if(file.status==='running'||file.status==='queued'){
   detail.textContent=file.stage;result.append(title,detail);const track=document.createElement('div');track.className='result-progress';track.setAttribute('role','progressbar');track.setAttribute('aria-label','转换进度');track.setAttribute('aria-valuenow',file.progress);track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax','100');const fill=document.createElement('span');fill.style.width=file.progress+'%';track.append(fill);result.append(track);
  }else{
   detail.textContent=file.error;result.append(title,detail);
   if(file.output){const previous=document.createElement('button');previous.className='text-button';previous.innerHTML=icon('folder')+'查看上次导出';previous.onclick=()=>post('reveal',{id:file.id});result.append(previous)}
   if(file.info){const retry=document.createElement('button');retry.className='text-button';retry.innerHTML=icon('retry')+'重新转换';retry.disabled=state.busy;retry.onclick=()=>post('retry',{id:file.id});result.append(retry)}
  }
 }
 if(!file||!file.info){clearPreview(false)}
}
function time(frame,fps){const total=frame/fps,m=Math.floor(total/60),s=total%60;return String(m).padStart(2,'0')+':'+s.toFixed(2).padStart(5,'0')}
function updateFrame(frame){if(!video)return;if(frame>=video.frames*.4&&!thumbs.has(previewId)){const canvas=$('stage').querySelector('canvas');if(canvas)try{thumbs.set(previewId,canvas.toDataURL('image/png'));renderQueue()}catch{}}$('timeline').value=frame;$('frame-number').textContent=`${frame+1} / ${video.frames}`;$('time').textContent=time(frame,video.FPS)}
function togglePlaying(value){playing=value;setIcon($('play'),playing?'pause':'play');$('play').setAttribute('aria-label',playing?'暂停动画':'播放动画')}
function resizeStage(){if(!video)return;const c=$('canvas'),v=$('zoom').value,scale=v==='fit'?Math.max(.01,Math.min((c.clientWidth-38)/video.videoSize.width,(c.clientHeight-46)/video.videoSize.height,1)):Number(v);$('stage').style.transform=`translate(-50%,-50%) scale(${scale})`}
function clearPreview(increment=true){$('media-preview').hidden=true;$('playback').hidden=false;if(increment)previewSeq++;try{player?.pauseAnimation();player?.clear()}catch{}player=null;video=null;previewId='';togglePlaying(false);$('stage').replaceChildren();$('stage-wrap').hidden=true;$('preview-empty').hidden=false;$('canvas-tag').hidden=true;$('loading-preview').hidden=true;for(const id of ['play','previous','next','timeline','loop'])$(id).disabled=true;$('timeline').value=0;$('frame-number').textContent='—';$('time').textContent=$('duration').textContent='00:00.00';const file=current();$('preview-empty').querySelector('h3').textContent=file?.error?'这个文件暂时无法预览':(toolDefinitions[state.activeTool||'svga-pag']?.empty||'让动效，换个格式。');$('preview-empty').querySelector('p').textContent=file?.error?'请查看右侧的具体原因，或选择其他文件。':'添加 SVGA，即可预览动画并转换为 PAG。尺寸、帧率与透明背景跟随原文件。'}
function loadPreview(payload){
 if(payload.id!==state.selectedId)return;
 $('media-preview').hidden=true;$('playback').hidden=false;
 if(payload.kind==='pag-gif'){loadPAGPreview(payload);return}
 const seq=++previewSeq;try{player?.pauseAnimation();player?.clear()}catch{}player=null;video=null;previewId=payload.id;
 $('stage').replaceChildren();$('preview-empty').hidden=true;$('loading-preview').hidden=false;$('stage-wrap').hidden=false;
 const local=new SVGA.Player('#stage'),parser=new SVGA.Parser('#stage');
 parser.load('data:svga/2.0;base64,'+payload.base64,v=>{
  if(seq!==previewSeq)return;
  v.audios=[];player=local;video=v;const w=v.videoSize.width,h=v.videoSize.height;$('stage').style.width=w+'px';$('stage').style.height=h+'px';
  local.setVideoItem(v);local.setContentMode('Fill');local.clearsAfterStop=false;local.loops=loop?0:1;
  local.stepToFrame(Math.floor(v.frames*.45),false);
  
  $('timeline').max=v.frames-1;$('duration').textContent=time(v.frames,v.FPS);$('canvas-tag').textContent=`${w} × ${h}`;$('canvas-tag').hidden=false;
  for(const id of ['play','previous','next','timeline','loop'])$(id).disabled=false;
  local.onFrame(f=>{if(seq===previewSeq)updateFrame(f)});local.onFinished(()=>{if(seq===previewSeq)togglePlaying(false)});
  $('loading-preview').hidden=true;resizeStage();renderQueue();local.startAnimation();togglePlaying(true);
 },()=>{if(seq!==previewSeq)return;clearPreview();toast('预览未能加载，请确认文件完整后重试。');post('previewError')});
}
window.receive=payload=>{
 if(payload.type==='state'){state=payload;render()}
 else if(payload.type==='preview')loadPreview(payload);
 else if(payload.type==='mediaPreview')loadMediaPreview(payload);
 else if(payload.type==='clearPreview')clearPreview();
 else if(payload.type==='toast')toast(payload.message);
 else if(payload.type==='help')$('help-dialog').showModal();
 else if(payload.type==='drag')$('drop-overlay').hidden=!payload.active;
};
for(const id of ['add-files','add-empty','add-canvas'])$(id).onclick=()=>post('chooseFiles');
$('choose-output').onclick=()=>post('chooseOutput');$('open-output').onclick=()=>post('openFolder');$('clear-done').onclick=()=>post('clearDone');
$('convert').onclick=()=>post(state.busy?'cancel':'start');$('search').oninput=renderQueue;
function changeFilter(value){filter=value;renderQueue()}
$('nav-all').onclick=()=>changeFilter('all');$('nav-done').onclick=()=>changeFilter('done');document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>changeFilter(b.dataset.filter));
$('help').onclick=()=>{if(!$('help-dialog').open)$('help-dialog').showModal()};for(const id of ['close-help','help-done'])$(id).onclick=()=>$('help-dialog').close();
$('play').onclick=()=>{if(!player)return;if(playing){player.pauseAnimation();togglePlaying(false)}else{const frame=Number($('timeline').value);player.stepToFrame(frame>=video.frames-1?0:frame,true);togglePlaying(true)}};
function step(delta){if(!player)return;const frame=Math.max(0,Math.min(video.frames-1,Number($('timeline').value)+delta));player.stepToFrame(frame,false);togglePlaying(false);updateFrame(frame)}
$('previous').onclick=()=>step(-1);$('next').onclick=()=>step(1);
$('timeline').oninput=()=>{if(player){player.stepToFrame(Number($('timeline').value),false);togglePlaying(false);updateFrame(Number($('timeline').value))}};
$('loop').onclick=()=>{loop=!loop;if(player)player.loops=loop?0:1;$('loop').setAttribute('aria-pressed',String(loop))};
$('zoom').onchange=resizeStage;new ResizeObserver(resizeStage).observe($('canvas'));
for(const b of document.querySelectorAll('[data-bg]'))b.onclick=()=>{$('canvas').className='canvas '+b.dataset.bg;document.querySelectorAll('[data-bg]').forEach(x=>x.classList.toggle('selected',x===b))};
let dragDepth=0;window.addEventListener('dragenter',e=>{e.preventDefault();dragDepth++;$('drop-overlay').hidden=false});window.addEventListener('dragleave',e=>{e.preventDefault();if(--dragDepth<=0){dragDepth=0;$('drop-overlay').hidden=true}});window.addEventListener('dragover',e=>e.preventDefault());window.addEventListener('drop',e=>{e.preventDefault();dragDepth=0;$('drop-overlay').hidden=true});
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select')||$('help-dialog').open)return;if(e.code==='Space'&&player){e.preventDefault();$('play').click()}else if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}else if(e.key==='ArrowRight'){e.preventDefault();step(1)}else if(e.key==='?'&&!e.metaKey){e.preventDefault();$('help-dialog').showModal()}else if((e.key==='Backspace'||e.key==='Delete')&&state.selectedId){e.preventDefault();post('remove',{id:state.selectedId})}});
const toolDefinitions={
 'svga-pag':{title:'SVGA → PAG',subtitle:'保留透明背景，迁移动效素材。',input:'SVGA',output:'PAG',empty:'让动效，换个格式。',hint:'添加 SVGA，预览后转换为 PAG。原图层会合并。',technical:'统一使用视频压缩，保留原尺寸、帧率与透明背景。小体积沿用旧版参数；向均衡调节只适度提高编码品质，改善幅度取决于素材。不再输出大体积逐帧无损序列。原图层仍会合并，支持无音轨的 SVGA 2.x。'},
 'svga-gif':{title:'SVGA → GIF',subtitle:'让动效走出播放器，方便分享与预览。',input:'SVGA',output:'GIF',empty:'让动效，随处播放。',hint:'添加 SVGA，选择尺寸、帧率和背景，导出循环 GIF。',technical:'GIF 无音轨，最多 256 色，只支持完全透明或不透明。白底或黑底可以保留柔和的半透明边缘。'},
 'pag-gif':{title:'PAG → GIF',subtitle:'逐帧读取 PAG，导出可分享的 GIF。',input:'PAG',output:'GIF',empty:'把 PAG，变成 GIF。',hint:'添加 PAG，预览真实画面，再导出循环 GIF。',technical:'GIF 无音轨，最多 256 色，只支持完全透明或不透明。PAG 字体会使用本机字体；复杂视频或缺失字体可能影响效果。'},
 'mp3':{title:'MP3 压缩',subtitle:'让声音更轻，尽量保留听感。',input:'MP3',output:'MP3',empty:'更轻的文件，熟悉的声音。',hint:'添加 MP3，选择压缩策略。处理后可对比试听原音频和结果。',technical:'低档优先缩小体积；中档自动选择 VBR 或复制低码率音频；100% 直接复制原音频流，避免再次损失音质。不能修复源文件已有的失真。清理封面与元数据；若结果更大，保留原文件。'},
 'mp4-png':{title:'MP4 → PNG 序列',subtitle:'把每一帧，变成一张可用的图片。',input:'MP4',output:'PNG 序列',empty:'让视频，逐帧展开。',hint:'添加 MP4，保留全部帧或指定提取帧率，导出自动编号的 PNG。',technical:'PNG 为无损图片，不包含音频。原始帧模式保留解码画面；降低尺寸会重采样。可变帧率视频的总帧数在处理前为估算值。'}
};
function renderTool(){
 const mode=state.activeTool||'svga-pag',def=toolDefinitions[mode],i=current()?.info,s=state.settings||{};
 $('tool-title').textContent=def.title;$('tool-subtitle').textContent=def.subtitle;$('queue-format').textContent=def.input==='SVGA'?'SVGA 2.x':def.input;
 $('output-format').textContent=def.output;$('settings-title').textContent=mode==='mp3'?'压缩设置':'转换设置';$('technical-title').textContent=mode==='mp3'?'音质与体积说明':mode==='mp4-png'?'帧数与画质说明':'格式与兼容说明';$('technical-text').textContent=def.technical;
 document.querySelector('.preview-options').hidden=['mp3','mp4-png'].includes(mode);$('canvas').classList.toggle('media-canvas',['mp3','mp4-png'].includes(mode));$('preview-heading').textContent=mode==='mp3'?'音频预览':mode==='mp4-png'?'视频预览':'动画预览';
 $('options-svga').hidden=mode!=='svga-pag';$('options-mp3').hidden=mode!=='mp3';$('options-gif').hidden=!mode.endsWith('-gif');$('options-png').hidden=mode!=='mp4-png';
 document.querySelectorAll('[data-tool]').forEach(b=>b.classList.toggle('active-tool',b.dataset.tool===mode));
 for(const control of document.querySelectorAll('[data-setting]')){control.disabled=state.busy;if(s[control.dataset.setting]!==undefined&&document.activeElement!==control)control.value=String(s[control.dataset.setting])}
 renderQuality();
 $('quality-hint').textContent=i&&i.bitrate>0?`源音频约 ${Math.round(i.bitrate/1000)} kbps。实际体积与听感取决于源文件。`:'处理后可对比试听原音频和压缩结果。';
 const estimate=$('export-estimate');estimate.hidden=!i||mode==='svga-pag';
 if(i&&mode.endsWith('-gif')){const scale=s.gifSize?Math.min(1,s.gifSize/Math.max(i.width,i.height)):1,fps=Math.min(s.gifFPS||15,i.fps);estimate.textContent=`${Math.floor(i.width*scale)} × ${Math.floor(i.height*scale)} · ${fps} fps · 约 ${Math.ceil(i.duration*fps)} 帧`}
 else if(i&&mode==='mp4-png'){estimate.textContent=s.pngFPS?`预计 ${Math.ceil(i.duration*s.pngFPS)} 张 PNG`:`预计 ${i.frames} 张 PNG · 保留全部原始帧`}
 else if(i&&mode==='mp3'){estimate.textContent='压缩效果取决于源音频，完成后显示实际大小。'}
 $('queue-empty').querySelector('p').textContent='还没有 '+def.input+' 文件';
 const caption=document.querySelector('.preview-caption>span:nth-child(2)');caption.textContent=mode==='mp3'?'原音频预览':mode==='mp4-png'?'原视频预览':'原动画预览';document.querySelector('.caption-right').hidden=['mp3','mp4-png'].includes(mode);
}
for(const button of document.querySelectorAll('[data-tool]'))button.onclick=()=>{filter='all';post('setTool',{tool:button.dataset.tool})};
for(const control of document.querySelectorAll('[data-setting]'))control.onchange=()=>{let value=control.value;if(['gifFPS','gifSize','pngFPS','pngSize'].includes(control.dataset.setting))value=Number(value);post('settings',{[control.dataset.setting]:value})};
function loadMediaPreview(payload){
 if(payload.id!==state.selectedId)return;clearPreview();$('preview-empty').hidden=true;$('media-preview').hidden=false;$('playback').hidden=true;$('loading-preview').hidden=true;
 const audio=payload.kind==='mp3',gif=payload.kind==='gif-result';$('audio-disc').hidden=!audio;$('media-poster').hidden=!payload.poster;
 if(payload.poster){$('media-poster').src='data:image/'+(gif?'gif':'png')+';base64,'+payload.poster;if(!gif){thumbs.set(payload.id,$('media-poster').src);renderQueue()}}
 $('media-title').textContent=gif?'GIF 结果预览':payload.name;
 $('media-info').textContent=audio?`${(payload.info.sampleRate/1000).toFixed(1)} kHz · ${payload.info.channels===2?'立体声':'单声道'} · ${payload.info.duration.toFixed(1)}s`:gif?'实际 GIF 输出 · 自动循环播放':`${payload.info.width} × ${payload.info.height} · ${payload.info.duration.toFixed(1)}s`;
 $('play-media').querySelector('span').textContent=gif?'返回原动画':audio?'试听原音频':'播放原视频';
 $('play-media').onclick=()=>gif?post('select',{id:payload.id}):post('previewMedia',{id:payload.id,result:false});
 $('media-preview').querySelector('.media-tip').textContent=gif?'GIF 不含声音，最多 256 色':'使用 系统默认播放器打开';
 document.querySelector('.preview-caption>span:nth-child(2)').textContent=gif?'GIF 输出结果':audio?'原音频预览':'原视频预览';
}
let pagModulePromise;
const decode64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function loadPAGPreview(payload){
 const seq=++previewSeq;try{player?.pauseAnimation();player?.clear()}catch{}player=null;video=null;previewId=payload.id;
 $('stage').replaceChildren();$('preview-empty').hidden=true;$('loading-preview').hidden=false;$('stage-wrap').hidden=false;
 try{
  if(!pagModulePromise)pagModulePromise=libpag.PAGInit({wasmBinary:decode64(payload.wasm)});
  const PAG=await pagModulePromise;if(seq!==previewSeq)return;
  const file=await PAG.PAGFile.load(decode64(payload.base64).buffer),canvas=document.createElement('canvas');canvas.width=file.width();canvas.height=file.height();$('stage').append(canvas);
  const view=await PAG.PAGView.init(file,canvas,{useCanvas2D:true,firstFrame:false});if(seq!==previewSeq){view.destroy();return}
  const fps=file.frameRate(),frames=Math.max(1,Math.ceil(file.duration()/1e6*fps));video={videoSize:{width:file.width(),height:file.height()},FPS:fps,frames};
  let frameCallback=()=>{},finishedCallback=()=>{},running=false,raf=0,start=0,destroyed=false,rendering=false,pending=-1;
  async function draw(frame){pending=frame;if(rendering)return;rendering=true;try{while(pending>=0&&!destroyed){const f=pending;pending=-1;if(!running)view.player.videoReaders.forEach(r=>r.pause());view.setProgress(Math.min(.999999,(f+.5)/frames));await view.flush();if(!running)view.player.videoReaders.forEach(r=>r.pause());if(!destroyed)frameCallback(f)}}finally{rendering=false}}
  function tick(now){if(!running||destroyed)return;let f=Math.floor((now-start)/1000*fps);if(f>=frames){if(loop){start=now;f=0}else{running=false;draw(frames-1);finishedCallback();return}}draw(f).catch(()=>{running=false;togglePlaying(false)});raf=requestAnimationFrame(tick)}
  player={loops:loop?0:1,pauseAnimation(){running=false;cancelAnimationFrame(raf);view.player.videoReaders.forEach(r=>r.pause())},clear(){destroyed=true;running=false;cancelAnimationFrame(raf);view.destroy()},stepToFrame(f,play=false){this.pauseAnimation();draw(f);if(play){running=true;start=performance.now()-f/fps*1000;raf=requestAnimationFrame(tick)}},startAnimation(){this.stepToFrame(0,true)},onFrame(fn){frameCallback=fn},onFinished(fn){finishedCallback=fn}};
  $('stage').style.width=video.videoSize.width+'px';$('stage').style.height=video.videoSize.height+'px';$('timeline').max=frames-1;$('duration').textContent=time(frames,fps);$('canvas-tag').textContent=`${video.videoSize.width} × ${video.videoSize.height}`;$('canvas-tag').hidden=false;
  player.onFrame(updateFrame);player.onFinished(()=>togglePlaying(false));for(const id of ['play','previous','next','timeline','loop'])$(id).disabled=false;
  $('loading-preview').hidden=true;resizeStage();player.startAnimation();togglePlaying(true);
 }catch(error){if(seq!==previewSeq)return;clearPreview();toast('PAG 预览失败：'+error.message);post('previewError')}
}

window.addEventListener('message',event=>{if(event.source===window&&event.data?.source==='frame-desktop'&&event.data.payload)window.receive(event.data.payload)});
render();post('ready');

function settingsKey(tool){const s=state.settings||{};if(tool==='svga-pag')return 'pag-video:'+(s.pagQuality??0);if(tool==='mp3')return 'mp3:'+(s.audioQuality??50);if(tool.endsWith('-gif'))return ['gif',s.gifQuality??50,s.gifFPS??15,s.gifSize??480,s.background??'white'].join(':');if(tool==='mp4-png')return ['png',s.pngFPS??0,s.pngSize??0].join(':');return tool}
function exportJobs(){const tool=state.activeTool||'svga-pag',jobs=state.files.filter(f=>f.tool===tool&&(f.status==='ready'||f.status==='done'&&f.resultSettingsKey!==settingsKey(tool)));if(jobs.length)return jobs;const f=current();return f?.tool===tool&&f.status==='done'?[f]:[]}
function qualityField(){return state.activeTool==='mp3'?'audioQuality':state.activeTool?.endsWith('-gif')?'gifQuality':'pagQuality'}
function renderQuality(){
 const tool=state.activeTool||'svga-pag',pag=tool==='svga-pag',q=Number(state.settings?.[qualityField()]??(pag?0:50)),level=pag?(q===0?'小体积':q<75?'偏小体积':'均衡'):(q<25?'低':q<75?'中':'高'),slider=$('output-quality');
 $('output-quality-control').hidden=tool==='mp4-png';$('output-quality-label').textContent=tool==='mp3'?'输出音质':'输出画质';$('output-quality-value').textContent=pag?level:level+' · '+q+'%';
 if(document.activeElement!==slider)slider.value=String(q);slider.style.setProperty('--quality-fill',q+'%');slider.setAttribute('aria-valuetext',pag?level:`${level}，${q}%`);slider.disabled=state.busy;
 [...document.querySelectorAll('[data-quality]')].forEach((button,index)=>{const value=pag?[0,100,100][index]:[0,50,100][index];button.dataset.quality=String(value);button.hidden=pag&&index===2;button.innerHTML=pag?['小体积','均衡',''][index]:['低 <span>0%</span>','中 <span>50%</span>','高 <span>100%</span>'][index];button.disabled=state.busy;button.classList.toggle('selected',value===q);button.setAttribute('aria-pressed',String(value===q));});
 let hint='';
 if(pag)hint=q===0?'优先小体积，沿用旧版压缩。保留原尺寸、帧率和透明背景。':'适度提高视频编码品质。体积小幅增加，画面改善幅度取决于素材。';
 else if(tool==='mp3')hint=q===100?'保留原音频流，避免重复压缩。体积可能基本不变。':q<50?'优先缩小体积，复杂音乐可能有可闻损失。':'兼顾体积与听感；低码率源音频优先避免重复压缩。';
 else hint=`${Math.max(64,Math.min(256,64+Math.floor(q*192/100)))} 色 · ${q>=75?'逐帧调色板，优先保留颜色细节':'全局调色板，优先控制体积'}。尺寸、帧率独立设置。`;
 $('output-quality-hint').textContent=hint;
 $('quality-scale-note').textContent=pag?'完成后可调整设置，再次导出并保留上次结果。':tool.endsWith('-gif')?'GIF 最多 256 色，不支持半透明，100% 也不能完全还原原图。':'百分比表示导出档位，不是画面还原率。';
}
$('output-quality').oninput=event=>{if(state.busy)return;state.settings[qualityField()]=Number(event.target.value);render()};
$('output-quality').onchange=()=>{if(!state.busy)post('settings',{[qualityField()]:Number($('output-quality').value)})};
for(const button of document.querySelectorAll('[data-quality]'))button.onclick=()=>{if(state.busy)return;const key=qualityField(),value=Number(button.dataset.quality);state.settings[key]=value;render();post('settings',{[key]:value})};


window.addEventListener('drop',event=>{if(event.dataTransfer?.files?.length)window.frameDesktop?.drop(Array.from(event.dataTransfer.files))});
