'use strict';
const {contextBridge,ipcRenderer,webUtils}=require('electron');
contextBridge.exposeInMainWorld('webkit',{messageHandlers:{frame:{postMessage:body=>ipcRenderer.send('frame:action',body)}}});
contextBridge.exposeInMainWorld('frameDesktop',{drop:files=>{const paths=Array.from(files).map(file=>webUtils.getPathForFile(file)).filter(Boolean);if(paths.length)ipcRenderer.send('frame:action',{action:'addPaths',paths});}});
ipcRenderer.on('frame:message',(_event,payload)=>window.postMessage({source:'frame-desktop',payload},'*'));
