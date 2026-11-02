'use strict';
// PAG video tag layout follows Tencent/libpag's Apache-2.0 VideoSequence.cpp,
// VideoCompositionTag.cpp, CompositionAttributes.cpp and TagHeader.cpp.
const fs=require('node:fs/promises');
const u=value=>{const out=[];do{let b=value%128;value=Math.floor(value/128);out.push(b|(value?128:0));}while(value);return Buffer.from(out);};
const i=value=>u(Math.abs(value)*2+(value<0?1:0));
const f=value=>{const b=Buffer.alloc(4);b.writeFloatLE(value);return b;};
const tag=(code,body)=>{const h=Buffer.alloc(body.length<63?2:6);h.writeUInt16LE((code<<6)|Math.min(63,body.length));if(h.length===6)h.writeUInt32LE(body.length,2);return Buffer.concat([h,body]);};
function annexBNals(data){
 const markers=[];
 for(let p=0;p+3<data.length;){if(data[p]===0&&data[p+1]===0&&(data[p+2]===1||(data[p+2]===0&&data[p+3]===1))){const n=data[p+2]===1?3:4;markers.push([p,p+n]);p+=n;}else p++;}
 return markers.map((m,k)=>data.subarray(m[1],k+1<markers.length?markers[k+1][0]:data.length)).filter(b=>b.length);
}
function encodePAG(data,{width,height,fps,frames,alphaY}){
 const nals=annexBNals(data),sps=nals.find(n=>(n[0]&31)===7),pps=nals.find(n=>(n[0]&31)===8);
 const pictures=nals.filter(n=>[1,5].includes(n[0]&31));
 if(!sps||!pps||pictures.length!==frames)throw Error(`H.264 帧数不一致：${pictures.length}/${frames}。`);
 const flags=Buffer.alloc(Math.ceil(frames/8));pictures.forEach((n,k)=>{if((n[0]&31)===5)flags[k>>3]|=1<<(k%8);});
 const sequence=Buffer.concat([i(width),i(height),f(fps),i(0),i(alphaY),u(sps.length),sps,u(pps.length),pps,u(frames),flags,...pictures.flatMap((n,k)=>[u(k),u(n.length),n]),u(0)]);
 const attrs=Buffer.concat([i(width),i(height),u(frames),f(fps),Buffer.from([255,255,255])]);
 const composition=Buffer.concat([u(1),Buffer.from([1]),tag(3,attrs),tag(51,sequence),Buffer.alloc(2)]),body=Buffer.concat([tag(50,composition),Buffer.alloc(2)]);
 const header=Buffer.from([80,65,71,1,0,0,0,0,85]);header.writeUInt32LE(body.length,4);return Buffer.concat([header,body]);
}
function videoArgs(framesPath,info,quality,target){
 const width=Math.ceil(info.width/2)*2,alphaY=Math.ceil(info.height/2)*2+4,height=Math.ceil((alphaY+info.height)/2)*2;
 const graph=`[0:v]format=rgba,split[c][a];[a]alphaextract,format=rgb24[mask];[c]format=rgb24,pad=${width}:${height}:0:0:black[base];[base][mask]overlay=0:${alphaY}:format=auto,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[out]`;
 return {alphaY,args:['-framerate',String(info.fps),'-start_number','0','-i',framesPath,'-filter_complex',graph,'-map','[out]','-an','-c:v','libx264','-preset','medium','-profile:v','main','-bf','0','-g','60','-crf',String(26-Math.round(3*quality/100)),'-threads','2','-x264-params','aud=1:slices=1:repeat-headers=1:colorprim=bt709:transfer=iec61966-2-1:colormatrix=bt709','-frames:v',String(info.frames),'-f','h264',target]};
}
module.exports={encodePAG,videoArgs,annexBNals};
