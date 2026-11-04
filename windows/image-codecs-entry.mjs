import makeWebP from '@jsquash/webp/codec/enc/webp_enc.js';
import {defaultOptions as webpDefaults} from '@jsquash/webp/meta.js';
import initPNG,{optimise} from '@jsquash/oxipng/codec/pkg/squoosh_oxipng.js';
let webpReady,pngReady;
const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
window.FrameImageCodecs={
 async png(bytes,wasm){pngReady??=initPNG(decode(wasm));await pngReady;return optimise(bytes,2,false,false);},
 async webp(image,quality,wasm){webpReady??=makeWebP({wasmBinary:decode(wasm),locateFile:()=>new URL('../vendor/images/webp.wasm',document.baseURI).href});const module=await webpReady;const encoded=module.encode(image.data,image.width,image.height,{...webpDefaults,quality:quality<=50?40+quality*.7:75+(quality-50)*.4,lossless:quality===100?1:0,exact:1,alpha_quality:100,method:4});if(!encoded)throw Error('WebP 编码失败，请减小图片尺寸后重试。');return new Uint8Array(encoded);}
};
