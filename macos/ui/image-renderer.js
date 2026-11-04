/* Frame image pipeline: header limits precede decoding; all codecs stay local. */
(()=>{'use strict';
 const MAX_BYTES=64*1024*1024,MAX_PIXELS=40_000_000,MAX_EDGE=16384;
 const from64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
 const text=(b,start,n)=>String.fromCharCode(...b.subarray(start,start+n));
 function header(b){
  if(!b.length||b.length>MAX_BYTES)throw Error('图片为空或超过 64 MB。');
  const v=new DataView(b.buffer,b.byteOffset,b.byteLength);let width=0,height=0,format='',alpha=false,animated=false;
  if(b.length>=33&&text(b,1,3)==='PNG'&&b[0]===137&&b[4]===13&&b[5]===10&&b[6]===26&&b[7]===10){
   if(v.getUint32(8)!==13||text(b,12,4)!=='IHDR')throw Error('PNG 文件头无效。');
   format='png';width=v.getUint32(16);height=v.getUint32(20);alpha=[4,6].includes(b[25]);
   for(let p=8;p+12<=b.length;){const n=v.getUint32(p),kind=text(b,p+4,4);if(n>b.length-p-12)throw Error('PNG 数据不完整。');if(kind==='acTL')animated=true;if(kind==='tRNS')alpha=true;p+=12+n;if(kind==='IEND')break;}
  }else if(b.length>=12&&b[0]===255&&b[1]===216){
   format='jpeg';let p=2;
   while(p<b.length){if(b[p++]!==255)throw Error('JPEG 数据无效。');while(b[p]===255)p++;const m=b[p++];if(m===217||m===218)break;if(m===0||m===216||m===1||m>=208&&m<=215)continue;if(p+2>b.length)break;const n=v.getUint16(p);if(n<2||n>b.length-p)throw Error('JPEG 数据不完整。');if([192,193,194,195,197,198,199,201,202,203,205,206,207].includes(m)){if(n<8)throw Error('JPEG 尺寸无效。');height=v.getUint16(p+3);width=v.getUint16(p+5);break;}p+=n;}
  }else if(b.length>=20&&text(b,0,4)==='RIFF'&&text(b,8,4)==='WEBP'){
   format='webp';const end=v.getUint32(4,true)+8;if(end>b.length)throw Error('WebP 数据不完整。');
   for(let p=12;p+8<=end;){const kind=text(b,p,4),n=v.getUint32(p+4,true),d=p+8;if(n>end-d)throw Error('WebP 数据长度无效。');
    if(kind==='VP8X'&&n>=10){alpha=!!(b[d]&16);animated=!!(b[d]&2);width=1+b[d+4]+(b[d+5]<<8)+(b[d+6]<<16);height=1+b[d+7]+(b[d+8]<<8)+(b[d+9]<<16);}
    else if(kind==='VP8 '&&n>=10&&!width){width=v.getUint16(d+6,true)&16383;height=v.getUint16(d+8,true)&16383;}
    else if(kind==='VP8L'&&n>=5&&!width){const bits=v.getUint32(d+1,true);width=(bits&16383)+1;height=((bits>>>14)&16383)+1;alpha=!!(bits>>>28&1);}
    if(kind==='ANIM'||kind==='ANMF')animated=true;p=d+n+(n&1);
   }
  }else throw Error('支持 JPG、PNG 和 WebP 静态图片，请确认文件完整。');
  if(animated)throw Error('暂不支持动态 PNG / WebP，以免压缩后丢失动画。');
  if(!width||!height||width>MAX_EDGE||height>MAX_EDGE||width*height>MAX_PIXELS)throw Error('图片超过处理范围：最长边 16384 像素、总像素 4000 万。');
  return{width,height,imageFormat:format,alpha,mime:'image/'+format};
 }
 function load(bytes,info){return new Promise((resolve,reject)=>{const image=new Image(),url=URL.createObjectURL(new Blob([bytes],{type:info.mime})),timer=setTimeout(()=>{URL.revokeObjectURL(url);reject(Error('图片解码超时，请缩小图片后重试。'));},30000);image.onload=()=>{clearTimeout(timer);URL.revokeObjectURL(url);if(!image.naturalWidth||!image.naturalHeight||image.naturalWidth*image.naturalHeight>MAX_PIXELS){reject(Error('图片尺寸无效或超出范围。'));return;}resolve(image);};image.onerror=()=>{clearTimeout(timer);URL.revokeObjectURL(url);reject(Error('无法解码图片，请确认格式与文件内容一致。'));};image.src=url;});}
 window.inspectImage=async base64=>{const bytes=from64(base64),info=header(bytes),image=await load(bytes,info);return{...info,width:image.naturalWidth,height:image.naturalHeight,frames:1,fps:0,duration:0};};
 const blob=(canvas,mime,quality)=>new Promise((resolve,reject)=>canvas.toBlob(b=>b&&b.type===mime?resolve(b):reject(Error('当前系统不支持此图片编码格式。')),mime,quality));
 function base64(bytes){let s='';for(let p=0;p<bytes.length;p+=32768)s+=String.fromCharCode(...bytes.subarray(p,p+32768));return btoa(s);}
 window.compressImage=async(input,settings,wasm)=>{
  const bytes=from64(input),info=header(bytes),image=await load(bytes,info),originalWidth=image.naturalWidth,originalHeight=image.naturalHeight;
  const factor=settings.imageSize?Math.min(1,settings.imageSize/Math.max(originalWidth,originalHeight)):1,width=Math.max(1,Math.floor(originalWidth*factor)),height=Math.max(1,Math.floor(originalHeight*factor));
  const format=settings.imageFormat==='original'?info.imageFormat:settings.imageFormat,quality=Math.max(0,Math.min(100,Number(settings.imageQuality)));if(!['png','jpeg','webp'].includes(format)||!Number.isFinite(quality))throw Error('图片压缩设置无效。');
  let encoded;
  if(format==='png'&&info.imageFormat==='png'&&factor===1)encoded=await FrameImageCodecs.png(bytes,wasm.png);
  else{
   if(format==='webp'&&(width>16383||height>16383||width*height>25_000_000))throw Error('WebP 编码尺寸较大，请选择 4096 px 或更小的长边上限。');
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d',{willReadFrequently:format==='webp'});if(!ctx)throw Error('无法创建图片画布。');
   if(format==='jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);}ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(image,0,0,width,height);
   if(format==='webp')encoded=await FrameImageCodecs.webp(ctx.getImageData(0,0,width,height),quality,wasm.webp);
   else{const b=await blob(canvas,'image/'+format,format==='jpeg'?(quality<=50?35+quality*.9:80+(quality-50)*.3)/100:undefined);encoded=new Uint8Array(await b.arrayBuffer());if(format==='png')encoded=await FrameImageCodecs.png(encoded,wasm.png);}
   canvas.width=canvas.height=1;
  }
  const keepOriginal=format===info.imageFormat&&factor===1&&encoded.length>=bytes.length;
  if(!keepOriginal&&encoded.length>128*1024*1024)throw Error('输出图片过大，请降低长边尺寸后重试。');
  let note=keepOriginal?'当前设置没有得到更小的同格式文件，已保留原图片。':format==='png'?'PNG 无损优化，保留透明通道。':format==='webp'&&quality===100?'WebP 无损编码，保留解码后的画面。':(format==='jpeg'?'JPEG':'WebP')+' · 画质档位 '+quality+'。';
  if(!keepOriginal&&factor<1)note+=' 已调整为 '+width+'×'+height+'，缩放会重采样。';
  if(!keepOriginal&&format==='jpeg'&&info.alpha)note+=' 透明区域已使用白色背景。';
  else if(!keepOriginal&&info.alpha&&format==='webp')note+=' 保留透明背景。';
  if(!keepOriginal&&encoded.length>=bytes.length)note+=' 当前输出比原文件更大，可尝试降低画质或选择 WebP。';
  return{base64:keepOriginal?'':base64(encoded),keepOriginal,format,width,height,note};
 };
})();
