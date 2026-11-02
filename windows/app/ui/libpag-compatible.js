/////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Tencent is pleased to support the open source community by making libpag available.
//
//  Copyright (C) 2025 Tencent. All rights reserved.
//
//  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
//  except in compliance with the License. You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  unless required by applicable law or agreed to in writing, software distributed under the
//  license is distributed on an "as is" basis, without warranties or conditions of any kind,
//  either express or implied. see the license for the specific language governing permissions
//  and limitations under the license.
//
/////////////////////////////////////////////////////////////////////////////////////////////////

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.libpag = {}));
})(this, (function (exports) { 'use strict';

  const getGlobalObject = () => {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    throw new Error("unable to locate global object");
  };
  const globalObject = getGlobalObject();
  if (typeof globalObject.globalThis === "undefined") {
    Object.defineProperty(globalObject, "globalThis", {
      get() {
        return globalObject;
      }
    });
  }

  let PAGModule;
  const setPAGModule = (module) => {
    PAGModule = module;
  };

  function destroyVerify$1(constructor) {
    let functions = Object.getOwnPropertyNames(constructor.prototype).filter(
      (name) => name !== "constructor" && typeof constructor.prototype[name] === "function"
    );
    const proxyFn = (target, methodName) => {
      const fn = target[methodName];
      target[methodName] = function(...args) {
        if (this["isDestroyed"]) {
          console.error(`Don't call ${methodName} of the ${constructor.name} that is destroyed.`);
          return;
        }
        return fn.call(this, ...args);
      };
    };
    functions.forEach((name) => proxyFn(constructor.prototype, name));
  }

  var PAGScaleMode = /* @__PURE__ */ ((PAGScaleMode2) => {
    PAGScaleMode2[PAGScaleMode2["None"] = 0] = "None";
    PAGScaleMode2[PAGScaleMode2["Stretch"] = 1] = "Stretch";
    PAGScaleMode2[PAGScaleMode2["LetterBox"] = 2] = "LetterBox";
    PAGScaleMode2[PAGScaleMode2["Zoom"] = 3] = "Zoom";
    return PAGScaleMode2;
  })(PAGScaleMode || {});
  var PAGViewListenerEvent = /* @__PURE__ */ ((PAGViewListenerEvent2) => {
    PAGViewListenerEvent2["onAnimationStart"] = "onAnimationStart";
    PAGViewListenerEvent2["onAnimationEnd"] = "onAnimationEnd";
    PAGViewListenerEvent2["onAnimationCancel"] = "onAnimationCancel";
    PAGViewListenerEvent2["onAnimationRepeat"] = "onAnimationRepeat";
    PAGViewListenerEvent2["onAnimationUpdate"] = "onAnimationUpdate";
    PAGViewListenerEvent2["onAnimationPlay"] = "onAnimationPlay";
    PAGViewListenerEvent2["onAnimationPause"] = "onAnimationPause";
    PAGViewListenerEvent2["onAnimationFlushed"] = "onAnimationFlushed";
    return PAGViewListenerEvent2;
  })(PAGViewListenerEvent || {});
  var ParagraphJustification = /* @__PURE__ */ ((ParagraphJustification2) => {
    ParagraphJustification2[ParagraphJustification2["LeftJustify"] = 0] = "LeftJustify";
    ParagraphJustification2[ParagraphJustification2["CenterJustify"] = 1] = "CenterJustify";
    ParagraphJustification2[ParagraphJustification2["RightJustify"] = 2] = "RightJustify";
    ParagraphJustification2[ParagraphJustification2["FullJustifyLastLineLeft"] = 3] = "FullJustifyLastLineLeft";
    ParagraphJustification2[ParagraphJustification2["FullJustifyLastLineRight"] = 4] = "FullJustifyLastLineRight";
    ParagraphJustification2[ParagraphJustification2["FullJustifyLastLineCenter"] = 5] = "FullJustifyLastLineCenter";
    ParagraphJustification2[ParagraphJustification2["FullJustifyLastLineFull"] = 6] = "FullJustifyLastLineFull";
    return ParagraphJustification2;
  })(ParagraphJustification || {});
  var TextDirection = /* @__PURE__ */ ((TextDirection2) => {
    TextDirection2[TextDirection2["Default"] = 0] = "Default";
    TextDirection2[TextDirection2["Horizontal"] = 1] = "Horizontal";
    TextDirection2[TextDirection2["Vertical"] = 2] = "Vertical";
    return TextDirection2;
  })(TextDirection || {});
  var LayerType = /* @__PURE__ */ ((LayerType2) => {
    LayerType2[LayerType2["Unknown"] = 0] = "Unknown";
    LayerType2[LayerType2["Null"] = 1] = "Null";
    LayerType2[LayerType2["Solid"] = 2] = "Solid";
    LayerType2[LayerType2["Text"] = 3] = "Text";
    LayerType2[LayerType2["Shape"] = 4] = "Shape";
    LayerType2[LayerType2["Image"] = 5] = "Image";
    LayerType2[LayerType2["PreCompose"] = 6] = "PreCompose";
    return LayerType2;
  })(LayerType || {});
  var PAGTimeStretchMode = /* @__PURE__ */ ((PAGTimeStretchMode2) => {
    PAGTimeStretchMode2[PAGTimeStretchMode2["None"] = 0] = "None";
    PAGTimeStretchMode2[PAGTimeStretchMode2["Scale"] = 1] = "Scale";
    PAGTimeStretchMode2[PAGTimeStretchMode2["Repeat"] = 2] = "Repeat";
    PAGTimeStretchMode2[PAGTimeStretchMode2["RepeatInverted"] = 3] = "RepeatInverted";
    return PAGTimeStretchMode2;
  })(PAGTimeStretchMode || {});
  var MatrixIndex$1 = /* @__PURE__ */ ((MatrixIndex2) => {
    MatrixIndex2[MatrixIndex2["a"] = 0] = "a";
    MatrixIndex2[MatrixIndex2["c"] = 1] = "c";
    MatrixIndex2[MatrixIndex2["tx"] = 2] = "tx";
    MatrixIndex2[MatrixIndex2["b"] = 3] = "b";
    MatrixIndex2[MatrixIndex2["d"] = 4] = "d";
    MatrixIndex2[MatrixIndex2["ty"] = 5] = "ty";
    return MatrixIndex2;
  })(MatrixIndex$1 || {});
  var DecoderResult = /* @__PURE__ */ ((DecoderResult2) => {
    DecoderResult2[DecoderResult2["Success"] = 0] = "Success";
    DecoderResult2[DecoderResult2["TryAgainLater"] = -1] = "TryAgainLater";
    DecoderResult2[DecoderResult2["Error"] = -2] = "Error";
    return DecoderResult2;
  })(DecoderResult || {});
  var ColorType = /* @__PURE__ */ ((ColorType2) => {
    ColorType2[ColorType2["Unknown"] = 0] = "Unknown";
    ColorType2[ColorType2["ALPHA_8"] = 1] = "ALPHA_8";
    ColorType2[ColorType2["RGBA_8888"] = 2] = "RGBA_8888";
    ColorType2[ColorType2["BGRA_8888"] = 3] = "BGRA_8888";
    return ColorType2;
  })(ColorType || {});
  var AlphaType = /* @__PURE__ */ ((AlphaType2) => {
    AlphaType2[AlphaType2["Unknown"] = 0] = "Unknown";
    AlphaType2[AlphaType2["Opaque"] = 1] = "Opaque";
    AlphaType2[AlphaType2["Premultiplied"] = 2] = "Premultiplied";
    AlphaType2[AlphaType2["Unpremultiplied"] = 3] = "Unpremultiplied";
    return AlphaType2;
  })(AlphaType || {});
  class VecArray extends Array {
    constructor(...items) {
      super(...items);
      this.isDeleted = false;
      Object.setPrototypeOf(this, VecArray.prototype);
    }
    static create() {
      return new VecArray();
    }
    get(index) {
      this.ensureNotDeleted();
      if (index < 0 || index >= this.length) {
        throw new RangeError("Index out of bounds");
      }
      return this[index];
    }
    push_back(value) {
      this.ensureNotDeleted();
      this.push(value);
    }
    size() {
      this.ensureNotDeleted();
      return this.length;
    }
    delete() {
      this.ensureNotDeleted();
      this.length = 0;
      this.isDeleted = true;
    }
    ensureNotDeleted() {
      if (this.isDeleted) {
        throw new Error("This VecArray instance has been deleted.");
      }
    }
  }

  var types = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PAGScaleMode: PAGScaleMode,
    PAGViewListenerEvent: PAGViewListenerEvent,
    ParagraphJustification: ParagraphJustification,
    TextDirection: TextDirection,
    LayerType: LayerType,
    PAGTimeStretchMode: PAGTimeStretchMode,
    MatrixIndex: MatrixIndex$1,
    DecoderResult: DecoderResult,
    ColorType: ColorType,
    AlphaType: AlphaType,
    VecArray: VecArray
  });

  var __defProp$f = Object.defineProperty;
  var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
  var __decorateClass$e = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$f(target, key, result);
    return result;
  };
  let Matrix$1 = class {
    constructor(wasmIns) {
      this.isDestroyed = false;
      this.wasmIns = wasmIns;
    }
    static makeAll(scaleX, skewX, transX, skewY, scaleY, transY, pers0 = 0, pers1 = 0, pers2 = 1) {
      const wasmIns = PAGModule._Matrix._MakeAll(scaleX, skewX, transX, skewY, scaleY, transY, pers0, pers1, pers2);
      if (!wasmIns)
        throw new Error("Matrix.makeAll fail, please check parameters valid!");
      return new Matrix$1(wasmIns);
    }
    static makeScale(scaleX, scaleY) {
      let wasmIns;
      if (scaleY !== void 0) {
        wasmIns = PAGModule._Matrix._MakeScale(scaleX, scaleY);
      } else {
        wasmIns = PAGModule._Matrix._MakeScale(scaleX);
      }
      if (!wasmIns)
        throw new Error("Matrix.makeScale fail, please check parameters valid!");
      return new Matrix$1(wasmIns);
    }
    static makeTrans(dx, dy) {
      const wasmIns = PAGModule._Matrix._MakeTrans(dx, dy);
      if (!wasmIns)
        throw new Error("Matrix.makeTrans fail, please check parameters valid!");
      return new Matrix$1(wasmIns);
    }
    get a() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex$1.a) : 0;
    }
    set a(value) {
      this.wasmIns?._set(MatrixIndex$1.a, value);
    }
    get b() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex$1.b) : 0;
    }
    set b(value) {
      this.wasmIns?._set(MatrixIndex$1.b, value);
    }
    get c() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex$1.c) : 0;
    }
    set c(value) {
      this.wasmIns?._set(MatrixIndex$1.c, value);
    }
    get d() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex$1.d) : 0;
    }
    set d(value) {
      this.wasmIns?._set(MatrixIndex$1.d, value);
    }
    get tx() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex$1.tx) : 0;
    }
    set tx(value) {
      this.wasmIns?._set(MatrixIndex$1.tx, value);
    }
    get ty() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex$1.ty) : 0;
    }
    set ty(value) {
      this.wasmIns?._set(MatrixIndex$1.ty, value);
    }
    get(index) {
      return this.wasmIns ? this.wasmIns._get(index) : 0;
    }
    set(index, value) {
      this.wasmIns?._set(index, value);
    }
    setAll(scaleX, skewX, transX, skewY, scaleY, transY) {
      this.wasmIns?._setAll(scaleX, skewX, transX, skewY, scaleY, transY, 0, 0, 1);
    }
    setAffine(a, b, c, d, tx, ty) {
      this.wasmIns?._setAffine(a, b, c, d, tx, ty);
    }
    reset() {
      this.wasmIns?._reset();
    }
    setTranslate(dx, dy) {
      this.wasmIns?._setTranslate(dx, dy);
    }
    setScale(sx, sy, px = 0, py = 0) {
      this.wasmIns?._setScale(sx, sy, px, py);
    }
    setRotate(degrees, px = 0, py = 0) {
      this.wasmIns?._setRotate(degrees, px, py);
    }
    setSinCos(sinV, cosV, px = 0, py = 0) {
      this.wasmIns?._setSinCos(sinV, cosV, px, py);
    }
    setSkew(kx, ky, px = 0, py = 0) {
      this.wasmIns?._setSkew(kx, ky, px, py);
    }
    setConcat(a, b) {
      this.wasmIns?._setConcat(a.wasmIns, b.wasmIns);
    }
    preTranslate(dx, dy) {
      this.wasmIns?._preTranslate(dx, dy);
    }
    preScale(sx, sy, px = 0, py = 0) {
      this.wasmIns?._preScale(sx, sy, px, py);
    }
    preRotate(degrees, px = 0, py = 0) {
      this.wasmIns?._preRotate(degrees, px, py);
    }
    preSkew(kx, ky, px = 0, py = 0) {
      this.wasmIns?._preSkew(kx, ky, px, py);
    }
    preConcat(other) {
      this.wasmIns?._preConcat(other.wasmIns);
    }
    postTranslate(dx, dy) {
      this.wasmIns?._postTranslate(dx, dy);
    }
    postScale(sx, sy, px = 0, py = 0) {
      this.wasmIns?._postScale(sx, sy, px, py);
    }
    postRotate(degrees, px = 0, py = 0) {
      this.wasmIns?._postRotate(degrees, px, py);
    }
    postSkew(kx, ky, px = 0, py = 0) {
      this.wasmIns?._postSkew(kx, ky, px, py);
    }
    postConcat(other) {
      this.wasmIns?._postConcat(other.wasmIns);
    }
    destroy() {
      this.wasmIns.delete();
    }
  };
  Matrix$1 = __decorateClass$e([
    destroyVerify$1
  ], Matrix$1);

  const rewindData = (fn, scope, ...args) => {
    return fn.call(scope, ...args);
  };
  const proxyVector = (vector, process) => {
    const proxy = new Proxy(vector, {
      get(target, property, receiver) {
        switch (property) {
          case "get":
            return (index) => {
              const wasmIns = rewindData(target.get, target, index);
              return !wasmIns ? wasmIns : process(wasmIns);
            };
          case "push_back":
            return (value) => {
              rewindData(target.push_back, target, value.wasmIns || value);
              return void 0;
            };
          case "size":
            return () => {
              return rewindData(target.size, target);
            };
          default:
            return Reflect.get(target, property, receiver);
        }
      }
    });
    return proxy;
  };
  const layer2typeLayer = (wasmIns) => {
    switch (rewindData(wasmIns._layerType, wasmIns)) {
      case LayerType.Solid:
        return new PAGModule.PAGSolidLayer(wasmIns);
      case LayerType.Text:
        return new PAGModule.PAGTextLayer(wasmIns);
      case LayerType.Image:
        return new PAGModule.PAGImageLayer(wasmIns);
      default:
        return new PAGModule.PAGLayer(wasmIns);
    }
  };
  const getLayerTypeName = (layerType) => {
    switch (layerType) {
      case LayerType.Solid:
        return "Solid";
      case LayerType.Text:
        return "Text";
      case LayerType.Shape:
        return "Shape";
      case LayerType.Image:
        return "Image";
      case LayerType.PreCompose:
        return "PreCompose";
      default:
        return "Unknown";
    }
  };
  const getWasmIns = (value) => {
    if (value?.wasmIns) {
      return value.wasmIns;
    }
    return value;
  };
  const isInstanceOf$1 = (value, type) => typeof type !== "undefined" && value instanceof type;

  var __defProp$e = Object.defineProperty;
  var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
  var __decorateClass$d = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$e(target, key, result);
    return result;
  };
  let PAGLayer = class {
    constructor(wasmIns) {
      this.isDestroyed = false;
      this.wasmIns = wasmIns;
    }
    uniqueID() {
      return this.wasmIns._uniqueID();
    }
    layerType() {
      return this.wasmIns._layerType();
    }
    layerName() {
      return this.wasmIns._layerName();
    }
    matrix() {
      const wasmIns = this.wasmIns._matrix();
      if (!wasmIns)
        throw new Error("Get matrix fail!");
      return new Matrix$1(wasmIns);
    }
    setMatrix(matrix) {
      this.wasmIns._setMatrix(matrix.wasmIns);
    }
    resetMatrix() {
      this.wasmIns._resetMatrix();
    }
    getTotalMatrix() {
      const wasmIns = this.wasmIns._getTotalMatrix();
      if (!wasmIns)
        throw new Error("Get total matrix fail!");
      return new Matrix$1(this.wasmIns._getTotalMatrix());
    }
    alpha() {
      return this.wasmIns._alpha();
    }
    setAlpha(opacity) {
      this.wasmIns._setAlpha(opacity);
    }
    visible() {
      return this.wasmIns._visible();
    }
    setVisible(visible) {
      this.wasmIns._setVisible(visible);
    }
    editableIndex() {
      return this.wasmIns._editableIndex();
    }
    parent() {
      const wasmIns = this.wasmIns._parent();
      if (!wasmIns)
        throw new Error("Get total matrix fail!");
      return new PAGComposition(wasmIns);
    }
    markers() {
      const wasmIns = this.wasmIns._markers();
      if (!wasmIns)
        throw new Error("Get markers fail!");
      return proxyVector(wasmIns, (wasmIns2) => wasmIns2);
    }
    localTimeToGlobal(localTime) {
      return this.wasmIns._localTimeToGlobal(localTime);
    }
    globalToLocalTime(globalTime) {
      return this.wasmIns._globalToLocalTime(globalTime);
    }
    duration() {
      return this.wasmIns._duration();
    }
    frameRate() {
      return this.wasmIns._frameRate();
    }
    startTime() {
      return this.wasmIns._startTime();
    }
    setStartTime(time) {
      this.wasmIns._setStartTime(time);
    }
    currentTime() {
      return this.wasmIns._currentTime();
    }
    setCurrentTime(time) {
      this.wasmIns._setCurrentTime(time);
    }
    getProgress() {
      return this.wasmIns._getProgress();
    }
    setProgress(percent) {
      this.wasmIns._setProgress(percent);
    }
    preFrame() {
      this.wasmIns._preFrame();
    }
    nextFrame() {
      this.wasmIns._nextFrame();
    }
    getBounds() {
      return this.wasmIns._getBounds();
    }
    trackMatteLayer() {
      const wasmIns = this.wasmIns._trackMatteLayer();
      if (!wasmIns)
        throw new Error("Get track matte layer fail!");
      return layer2typeLayer(wasmIns);
    }
    excludedFromTimeline() {
      return this.wasmIns._excludedFromTimeline();
    }
    setExcludedFromTimeline(value) {
      this.wasmIns._setExcludedFromTimeline(value);
    }
    isPAGFile() {
      return this.wasmIns._isPAGFile();
    }
    asTypeLayer() {
      return layer2typeLayer(this.wasmIns);
    }
    isDelete() {
      return this.wasmIns.isDelete();
    }
    destroy() {
      this.wasmIns.delete();
      this.isDestroyed = true;
    }
  };
  PAGLayer = __decorateClass$d([
    destroyVerify$1
  ], PAGLayer);

  var __defProp$d = Object.defineProperty;
  var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
  var __decorateClass$c = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$d(target, key, result);
    return result;
  };
  let PAGComposition = class extends PAGLayer {
    static make(width, height) {
      const wasmIns = PAGModule._PAGComposition._Make(width, height);
      if (!wasmIns)
        throw new Error("Make PAGComposition fail!");
      return new PAGComposition(wasmIns);
    }
    width() {
      return this.wasmIns._width();
    }
    height() {
      return this.wasmIns._height();
    }
    setContentSize(width, height) {
      this.wasmIns._setContentSize(width, height);
    }
    numChildren() {
      return this.wasmIns._numChildren();
    }
    getLayerAt(index) {
      const wasmIns = this.wasmIns._getLayerAt(index);
      if (!wasmIns)
        throw new Error(`Get layer at ${index} fail!`);
      return layer2typeLayer(wasmIns);
    }
    getLayerIndex(pagLayer) {
      return this.wasmIns._getLayerIndex(pagLayer.wasmIns);
    }
    setLayerIndex(pagLayer, index) {
      return this.wasmIns._setLayerIndex(pagLayer.wasmIns, index);
    }
    addLayer(pagLayer) {
      return this.wasmIns._addLayer(pagLayer.wasmIns);
    }
    addLayerAt(pagLayer, index) {
      return this.wasmIns._addLayerAt(pagLayer.wasmIns, index);
    }
    contains(pagLayer) {
      return this.wasmIns._contains(pagLayer.wasmIns);
    }
    removeLayer(pagLayer) {
      const wasmIns = this.wasmIns._removeLayer(pagLayer.wasmIns);
      if (!wasmIns)
        throw new Error("Remove layer fail!");
      return layer2typeLayer(wasmIns);
    }
    removeLayerAt(index) {
      const wasmIns = this.wasmIns._removeLayerAt(index);
      if (!wasmIns)
        throw new Error(`Remove layer at ${index} fail!`);
      return layer2typeLayer(wasmIns);
    }
    removeAllLayers() {
      this.wasmIns._removeAllLayers();
    }
    swapLayer(pagLayer1, pagLayer2) {
      this.wasmIns._swapLayer(pagLayer1.wasmIns, pagLayer2.wasmIns);
    }
    swapLayerAt(index1, index2) {
      this.wasmIns._swapLayerAt(index1, index2);
    }
    audioBytes() {
      return this.wasmIns._audioBytes();
    }
    audioMarkers() {
      const wasmIns = this.wasmIns._audioMarkers();
      if (!wasmIns)
        throw new Error(`Get audioMarkers fail!`);
      return proxyVector(wasmIns, (wasmIns2) => wasmIns2);
    }
    audioStartTime() {
      return this.wasmIns._audioStartTime();
    }
    getLayersByName(layerName) {
      const wasmIns = this.wasmIns._getLayersByName(layerName);
      if (!wasmIns)
        throw new Error(`Get layers by ${layerName} fail!`);
      const layerArray = VecArray.create();
      for (const wasmIn of wasmIns) {
        layerArray.push(layer2typeLayer(wasmIn));
      }
      return layerArray;
    }
    getLayersUnderPoint(localX, localY) {
      const wasmIns = this.wasmIns._getLayersUnderPoint(localX, localY);
      if (!wasmIns)
        throw new Error(`Get layers under point ${localX},${localY} fail!`);
      const layerArray = VecArray.create();
      for (const wasmIn of wasmIns) {
        layerArray.push(layer2typeLayer(wasmIn));
      }
      return layerArray;
    }
  };
  PAGComposition = __decorateClass$c([
    destroyVerify$1
  ], PAGComposition);

  const readFile = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      console.error(reader.error.message);
    };
    reader.readAsArrayBuffer(file);
  });
  const transferToArrayBuffer = (data) => {
    if (isInstanceOf$1(data, globalThis.File)) {
      return readFile(data);
    } else if (isInstanceOf$1(data, globalThis.Blob)) {
      return readFile(new File([data], ""));
    } else if (isInstanceOf$1(data, globalThis.ArrayBuffer)) {
      return Promise.resolve(data);
    }
    return Promise.resolve(null);
  };

  var __defProp$c = Object.defineProperty;
  var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
  var __decorateClass$b = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$c(target, key, result);
    return result;
  };
  let PAGFile = class extends PAGComposition {
    static async load(data) {
      const buffer = await transferToArrayBuffer(data);
      if (!buffer)
        throw new Error(
          "Initialize PAGFile data type error, please put check data type must to be File \uFF5C Blob | ArrayBuffer!"
        );
      return PAGFile.loadFromBuffer(buffer);
    }
    static loadFromBuffer(buffer) {
      if (!buffer || !(buffer.byteLength > 0))
        throw new Error("Initialize PAGFile data not be empty!");
      const uint8Buffer = new Uint8Array(buffer);
      const wasmIns = PAGModule._PAGFile._Load(uint8Buffer);
      if (!wasmIns)
        throw new Error("Load PAGFile fail!");
      const pagFile = new PAGFile(wasmIns);
      return pagFile;
    }
    static maxSupportedTagLevel() {
      return PAGModule._PAGFile._MaxSupportedTagLevel();
    }
    tagLevel() {
      return this.wasmIns._tagLevel();
    }
    numTexts() {
      return this.wasmIns._numTexts();
    }
    numImages() {
      return this.wasmIns._numImages();
    }
    numVideos() {
      return this.wasmIns._numVideos();
    }
    getTextData(editableTextIndex) {
      return this.wasmIns._getTextData(editableTextIndex);
    }
    replaceText(editableTextIndex, textData) {
      this.wasmIns._replaceText(editableTextIndex, textData);
    }
    replaceImage(editableImageIndex, pagImage) {
      this.wasmIns._replaceImage(editableImageIndex, pagImage.wasmIns);
    }
    getLayersByEditableIndex(editableIndex, layerType) {
      const wasmIns = this.wasmIns._getLayersByEditableIndex(editableIndex, layerType);
      if (!wasmIns)
        throw new Error(`Get ${getLayerTypeName(layerType)} layers by ${editableIndex} fail!`);
      const layerArray = VecArray.create();
      for (const wasmIn of wasmIns) {
        layerArray.push(layer2typeLayer(wasmIn));
      }
      return layerArray;
    }
    getEditableIndices(layerType) {
      return this.wasmIns._getEditableIndices(layerType);
    }
    timeStretchMode() {
      return this.wasmIns._timeStretchMode();
    }
    setTimeStretchMode(value) {
      this.wasmIns._setTimeStretchMode(value);
    }
    setDuration(duration) {
      this.wasmIns._setDuration(duration);
    }
    copyOriginal() {
      const wasmIns = this.wasmIns._copyOriginal();
      if (!wasmIns)
        throw new Error(`Copy original fail!`);
      return new PAGFile(wasmIns);
    }
  };
  PAGFile = __decorateClass$b([
    destroyVerify$1
  ], PAGFile);

  var __defProp$b = Object.defineProperty;
  var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
  var __decorateClass$a = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$b(target, key, result);
    return result;
  };
  let PAGSurface = class {
    constructor(wasmIns) {
      this.isDestroyed = false;
      this.wasmIns = wasmIns;
    }
    static fromCanvas(canvasID) {
      const wasmIns = PAGModule._PAGSurface._FromCanvas(canvasID);
      if (!wasmIns)
        throw new Error(`Make PAGSurface from canvas ${canvasID} fail!`);
      return new PAGSurface(wasmIns);
    }
    static fromTexture(textureID, width, height, flipY) {
      const wasmIns = PAGModule._PAGSurface._FromTexture(textureID, width, height, flipY);
      if (!wasmIns)
        throw new Error(`Make PAGSurface from texture ${textureID} fail!`);
      return new PAGSurface(wasmIns);
    }
    static fromRenderTarget(frameBufferID, width, height, flipY) {
      const wasmIns = PAGModule._PAGSurface._FromRenderTarget(frameBufferID, width, height, flipY);
      if (!wasmIns)
        throw new Error(`Make PAGSurface from frameBuffer ${frameBufferID} fail!`);
      return new PAGSurface(wasmIns);
    }
    width() {
      return this.wasmIns._width();
    }
    height() {
      return this.wasmIns._height();
    }
    updateSize() {
      this.wasmIns._updateSize();
    }
    clearAll() {
      return this.wasmIns._clearAll();
    }
    freeCache() {
      this.wasmIns._freeCache();
    }
    readPixels(colorType, alphaType) {
      if (colorType === ColorType.Unknown)
        return null;
      const rowBytes = this.wasmIns._width() * (colorType === ColorType.ALPHA_8 ? 1 : 4);
      return this.wasmIns._readPixels(colorType, alphaType, rowBytes);
    }
    destroy() {
      this.wasmIns.delete();
      this.isDestroyed = true;
    }
  };
  PAGSurface = __decorateClass$a([
    destroyVerify$1
  ], PAGSurface);

  var __defProp$a = Object.defineProperty;
  var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
  var __decorateClass$9 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$a(target, key, result);
    return result;
  };
  let VideoReaderManager = class {
    constructor(wasmIns) {
      this.videoIDs = [];
      this.isDestroyed = false;
      this.videoReaderMap = /* @__PURE__ */ new Map();
      this.wasmIns = PAGModule._videoInfoManager._Make(wasmIns);
      if (!this.wasmIns) {
        throw new Error("create VideoReaderManager fail!");
      }
      this.videoIDs = this.wasmIns._getVideoIDs();
      if (this.wasmIns._hasTimeRangeOverlap()) {
        console.error("The current file contains multiple layers referencing the same video with overlapping timelines. This scenario is not supported, and the rendered result may not match expectations. It is recommended to offset the timelines of these layers.");
      }
    }
    static HasVideo(wasmIns) {
      return PAGModule._videoInfoManager._HasVideo(wasmIns);
    }
    static async make(wasmIns) {
      const videoManage = new VideoReaderManager(wasmIns);
      await videoManage.createVideoReader();
      return videoManage;
    }
    async createVideoReader() {
      for (const id of this.videoIDs) {
        const mp4Data = this.wasmIns._getMp4DataByID(id);
        if (mp4Data !== null) {
          this.videoReaderMap.set(id, await PAGModule.VideoReader.create(
            mp4Data,
            this.wasmIns._getWidthByID(id),
            this.wasmIns._getHeightByID(id),
            this.wasmIns._getFrameRateByID(id),
            this.wasmIns._getStaticTimeRangesByID(id)
          ));
          await this.videoReaderMap.get(id)?.prepare(0, this.wasmIns._getPlaybackRateByID(id));
        }
      }
    }
    getVideoReaderByID(id) {
      if (this.videoReaderMap.get(id) === void 0) {
        console.error(`get VideoReader fail!,id:${id}`);
        return void 0;
      }
      return this.videoReaderMap.get(id);
    }
    async prepareTargetFrame() {
      for (const id of this.videoIDs) {
        if (this.isDestroyed)
          return;
        const targetFrame = this.wasmIns._getTargetFrameByID(id);
        if (targetFrame < 0) {
          continue;
        }
        if (this.videoReaderMap.get(id) !== void 0) {
          await this.videoReaderMap.get(id)?.prepare(targetFrame, this.wasmIns._getPlaybackRateByID(id));
        } else {
          console.error("videoReader is undefined,id:", id);
        }
      }
    }
    destroy() {
      this.wasmIns.delete();
      for (const key of this.videoReaderMap.keys()) {
        this.videoReaderMap.get(key)?.onDestroy();
      }
      this.videoReaderMap.clear();
      this.isDestroyed = true;
    }
  };
  VideoReaderManager = __decorateClass$9([
    destroyVerify$1
  ], VideoReaderManager);

  var __defProp$9 = Object.defineProperty;
  var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
  var __decorateClass$8 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$9(target, key, result);
    return result;
  };
  let PAGPlayer = class {
    constructor(wasmIns) {
      this.isDestroyed = false;
      this.videoReaders = [];
      this.pagComposition = null;
      this.videoReaderManager = null;
      this.wasmIns = wasmIns;
    }
    static create() {
      const wasmIns = new PAGModule._PAGPlayer();
      if (!wasmIns)
        throw new Error("Create PAGPlayer fail!");
      return new PAGPlayer(wasmIns);
    }
    setProgress(progress) {
      this.wasmIns._setProgress(progress);
    }
    async flush() {
      PAGModule.currentPlayer = this;
      await this.prepareVideoFrame();
      return PAGModule.webAssemblyQueue.exec(async () => {
        const res = await this.wasmIns._flush();
        PAGModule.currentPlayer = null;
        return res;
      }, this.wasmIns);
    }
    async flushInternal(callback) {
      PAGModule.currentPlayer = this;
      await this.prepareVideoFrame();
      const res = await PAGModule.webAssemblyQueue.exec(async () => {
        const res2 = await this.wasmIns._flush();
        PAGModule.currentPlayer = null;
        callback(res2);
        return res2;
      }, this.wasmIns);
      for (const videoReader of this.videoReaders) {
        const error = await videoReader.getError();
        if (error !== null) {
          console.warn("[PAGPlayer] VideoReader error:", error);
        }
      }
      return res;
    }
    duration() {
      return this.wasmIns._duration();
    }
    getProgress() {
      return this.wasmIns._getProgress();
    }
    currentFrame() {
      return this.wasmIns._currentFrame();
    }
    videoEnabled() {
      return this.wasmIns._videoEnabled();
    }
    setVideoEnabled(enabled) {
      this.wasmIns._setVideoEnabled(enabled);
    }
    cacheEnabled() {
      return this.wasmIns._cacheEnabled();
    }
    setCacheEnabled(enabled) {
      this.wasmIns._setCacheEnabled(enabled);
    }
    cacheScale() {
      return this.wasmIns._cacheScale();
    }
    setCacheScale(value) {
      this.wasmIns._setCacheScale(value);
    }
    maxFrameRate() {
      return this.wasmIns._maxFrameRate();
    }
    setMaxFrameRate(value) {
      this.wasmIns._setMaxFrameRate(value);
    }
    scaleMode() {
      return this.wasmIns._scaleMode();
    }
    setScaleMode(value) {
      this.wasmIns._setScaleMode(value);
    }
    setSurface(pagSurface) {
      this.wasmIns._setSurface(getWasmIns(pagSurface));
    }
    getComposition() {
      const wasmIns = this.wasmIns._getComposition();
      if (!wasmIns)
        throw new Error("Get composition fail!");
      if (wasmIns._isPAGFile()) {
        return new PAGFile(wasmIns);
      }
      return new PAGComposition(wasmIns);
    }
    setComposition(pagComposition) {
      this.destroyVideoReaderManager();
      this.pagComposition = pagComposition;
      this.wasmIns._setComposition(getWasmIns(pagComposition));
    }
    getSurface() {
      const wasmIns = this.wasmIns._getSurface();
      if (!wasmIns)
        throw new Error("Get surface fail!");
      return new PAGSurface(wasmIns);
    }
    matrix() {
      const wasmIns = this.wasmIns._matrix();
      if (!wasmIns)
        throw new Error("Get matrix fail!");
      return new Matrix$1(wasmIns);
    }
    setMatrix(matrix) {
      this.wasmIns._setMatrix(matrix.wasmIns);
    }
    nextFrame() {
      this.wasmIns._nextFrame();
    }
    preFrame() {
      this.wasmIns._preFrame();
    }
    autoClear() {
      return this.wasmIns._autoClear();
    }
    setAutoClear(value) {
      this.wasmIns._setAutoClear(value);
    }
    getBounds(pagLayer) {
      return this.wasmIns._getBounds(pagLayer.wasmIns);
    }
    getLayersUnderPoint(localX, localY) {
      const wasmIns = this.wasmIns._getLayersUnderPoint(localX, localY);
      if (!wasmIns)
        throw new Error(`Get layers under point, x: ${localX} y:${localY} fail!`);
      const layerArray = VecArray.create();
      for (const wasmIn of wasmIns) {
        layerArray.push(layer2typeLayer(wasmIn));
      }
      return layerArray;
    }
    hitTestPoint(pagLayer, surfaceX, surfaceY, pixelHitTest = false) {
      return this.wasmIns._hitTestPoint(pagLayer.wasmIns, surfaceX, surfaceY, pixelHitTest);
    }
    renderingTime() {
      return this.wasmIns._renderingTime();
    }
    imageDecodingTime() {
      return this.wasmIns._imageDecodingTime();
    }
    presentingTime() {
      return this.wasmIns._presentingTime();
    }
    graphicsMemory() {
      return this.wasmIns._graphicsMemory();
    }
    prepare() {
      return PAGModule.webAssemblyQueue.exec(async () => {
        PAGModule.currentPlayer = this;
        await this.wasmIns._prepare();
        PAGModule.currentPlayer = null;
      }, this.wasmIns);
    }
    destroy() {
      this.destroyVideoReaderManager();
      this.wasmIns.delete();
      this.isDestroyed = true;
    }
    linkVideoReader(videoReader) {
      this.videoReaders.push(videoReader);
    }
    unlinkVideoReader(videoReader) {
      const index = this.videoReaders.indexOf(videoReader);
      if (index !== -1) {
        this.videoReaders.splice(index, 1);
      }
    }
    async prepareVideoFrame() {
      if (PAGModule._useSoftwareDecoder !== void 0 && !PAGModule._useSoftwareDecoder) {
        if (this.pagComposition !== null) {
          if (this.videoReaderManager === null && VideoReaderManager.HasVideo(this.pagComposition?.wasmIns)) {
            this.videoReaderManager = await VideoReaderManager.make(this.pagComposition?.wasmIns);
            PAGModule.videoReaderManager = this.videoReaderManager;
          }
          if (this.videoReaderManager !== null) {
            await this.videoReaderManager.prepareTargetFrame();
          }
        } else {
          console.error("PAGComposition is null. A valid PAG file is missing.");
        }
      }
    }
    destroyVideoReaderManager() {
      if (this.videoReaderManager !== null) {
        this.videoReaderManager.destroy();
        this.videoReaderManager = null;
        PAGModule.videoReaderManage = null;
      }
    }
  };
  PAGPlayer = __decorateClass$8([
    destroyVerify$1
  ], PAGPlayer);

  var __defProp$8 = Object.defineProperty;
  var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
  var __decorateClass$7 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$8(target, key, result);
    return result;
  };
  let PAGImage = class {
    constructor(wasmIns) {
      this.isDestroyed = false;
      this.wasmIns = wasmIns;
    }
    static async fromFile(data) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = async () => {
          resolve(PAGImage.fromSource(image));
        };
        image.onerror = (error) => {
          reject(error);
        };
        image.src = URL.createObjectURL(data);
      });
    }
    static fromSource(source) {
      const wasmIns = PAGModule._PAGImage._FromNativeImage(source);
      if (!wasmIns)
        throw new Error("Make PAGImage from source fail!");
      return new PAGImage(wasmIns);
    }
    static fromPixels(pixels, width, height, colorType, alphaType) {
      const rowBytes = width * (colorType === ColorType.ALPHA_8 ? 1 : 4);
      const wasmIns = PAGModule._PAGImage._FromPixels(pixels, width, height, rowBytes, colorType, alphaType);
      if (!wasmIns)
        throw new Error("Make PAGImage from pixels fail!");
      return new PAGImage(wasmIns);
    }
    static fromTexture(textureID, width, height, flipY) {
      const wasmIns = PAGModule._PAGImage._FromTexture(textureID, width, height, flipY);
      if (!wasmIns)
        throw new Error("Make PAGImage from texture fail!");
      return new PAGImage(wasmIns);
    }
    width() {
      return this.wasmIns._width();
    }
    height() {
      return this.wasmIns._height();
    }
    scaleMode() {
      return this.wasmIns._scaleMode();
    }
    setScaleMode(scaleMode) {
      this.wasmIns._setScaleMode(scaleMode);
    }
    matrix() {
      const wasmIns = this.wasmIns._matrix();
      if (!wasmIns)
        throw new Error("Get matrix fail!");
      return new Matrix$1(wasmIns);
    }
    setMatrix(matrix) {
      this.wasmIns._setMatrix(matrix.wasmIns);
    }
    destroy() {
      this.wasmIns.delete();
      this.isDestroyed = true;
    }
  };
  PAGImage = __decorateClass$7([
    destroyVerify$1
  ], PAGImage);

  class EventManager {
    constructor() {
      this.listenerMap = /* @__PURE__ */ new Map();
    }
    on(eventName, listener) {
      let listenerList = [];
      if (this.listenerMap.has(eventName)) {
        listenerList = this.listenerMap.get(eventName);
      }
      listenerList.push(listener);
      this.listenerMap.set(eventName, listenerList);
    }
    off(eventName, listener) {
      if (!this.listenerMap.has(eventName))
        return false;
      const listenerList = this.listenerMap.get(eventName);
      if (listenerList.length === 0)
        return false;
      if (!listener) {
        this.listenerMap.delete(eventName);
        return true;
      }
      const index = listenerList.indexOf(listener);
      if (index === -1)
        return false;
      listenerList.splice(index, 1);
      return true;
    }
    emit(eventName, event) {
      if (!this.listenerMap.has(eventName))
        return false;
      const listenerList = this.listenerMap.get(eventName);
      if (listenerList.length === 0)
        return false;
      listenerList.forEach((listener) => listener(event));
      return true;
    }
  }

  const VIDEO_DECODE_WAIT_FRAME = 1;
  const VIDEO_DECODE_SEEK_TIMEOUT_FRAME = 12;
  const DEFAULT_CANVAS_SIZE = 2560;
  const WEBGL_CONTEXT_ATTRIBUTES = {
    depth: false,
    stencil: false,
    antialias: false
  };
  const VIDEO_PLAYBACK_RATE_MIN = 0.125;
  const VIDEO_PLAYBACK_RATE_MAX = 4;

  class BackendContext {
    constructor(handle, externallyOwned = false) {
      this.isDestroyed = false;
      this.oldHandle = 0;
      this.handle = handle;
      this.externallyOwned = externallyOwned;
    }
    static from(gl) {
      if (gl instanceof BackendContext) {
        return new BackendContext(gl.handle, true);
      } else {
        const majorVersion = isInstanceOf$1(gl, globalThis.WebGL2RenderingContext) ? 2 : 1;
        const { GL } = PAGModule;
        let id = 0;
        if (GL.contexts.length > 0) {
          id = GL.contexts.findIndex((context) => context?.GLctx === gl);
        }
        if (id < 1) {
          id = GL.registerContext(gl, {
            majorVersion,
            minorVersion: 0,
            ...WEBGL_CONTEXT_ATTRIBUTES
          });
          return new BackendContext(id);
        }
        return new BackendContext(id, true);
      }
    }
    getContext() {
      return PAGModule.GL.getContext(this.handle).GLctx;
    }
    makeCurrent() {
      if (this.isDestroyed)
        return false;
      this.oldHandle = PAGModule.GL.currentContext?.handle || 0;
      if (this.oldHandle === this.handle)
        return true;
      return PAGModule.GL.makeContextCurrent(this.handle);
    }
    clearCurrent() {
      if (this.isDestroyed)
        return;
      if (this.oldHandle === this.handle)
        return;
      PAGModule.GL.makeContextCurrent(0);
      if (this.oldHandle) {
        PAGModule.GL.makeContextCurrent(this.oldHandle);
      }
    }
    registerTexture(texture) {
      return this.register(PAGModule.GL.textures, texture);
    }
    getTexture(handled) {
      return PAGModule.GL.textures[handled];
    }
    unregisterTexture(handle) {
      PAGModule.GL.textures[handle] = null;
    }
    registerRenderTarget(framebuffer) {
      return this.register(PAGModule.GL.framebuffers, framebuffer);
    }
    getRenderTarget(handle) {
      return PAGModule.GL.framebuffers[handle];
    }
    unregisterRenderTarget(handle) {
      PAGModule.GL.framebuffers[handle] = null;
    }
    destroy() {
      if (this.externallyOwned) {
        return;
      }
      PAGModule.GL.deleteContext(this.handle);
    }
    register(table, item) {
      const handle = PAGModule.GL.getNewId(table);
      table[handle] = item;
      return handle;
    }
  }

  const renderCanvasList = [];
  class RenderCanvas {
    constructor(canvas, contextAttributes) {
      this._canvas = null;
      this._glContext = null;
      this.retainCount = 0;
      this._canvas = canvas;
      const gl = canvas.getContext("webgl", {
        ...WEBGL_CONTEXT_ATTRIBUTES,
        ...contextAttributes
      });
      if (!gl)
        throw new Error("Canvas context is not WebGL!");
      this._glContext = BackendContext.from(gl);
    }
    static from(canvas, contextAttributes) {
      let renderCanvas = renderCanvasList.find((targetCanvas) => targetCanvas.canvas === canvas);
      if (renderCanvas)
        return renderCanvas;
      renderCanvas = new RenderCanvas(canvas, contextAttributes);
      renderCanvasList.push(renderCanvas);
      return renderCanvas;
    }
    retain() {
      this.retainCount += 1;
    }
    release() {
      this.retainCount -= 1;
      if (this.retainCount === 0) {
        if (!this._glContext)
          return;
        this._glContext.destroy();
        this._glContext = null;
        this._canvas = null;
      }
    }
    get canvas() {
      return this._canvas;
    }
    get glContext() {
      return this._glContext;
    }
  }

  let getTime;
  try {
    getTime = performance.now.bind(performance);
  } catch (e) {
    getTime = Date.now.bind(Date);
  }
  class Clock {
    constructor() {
      this.startTime = getTime();
      this.markers = {};
    }
    reset() {
      this.startTime = getTime();
      this.markers = {};
    }
    mark(key) {
      if (!key) {
        console.log("Clock.mark(): An empty marker name was specified!");
        return;
      }
      if (Object.keys(this.markers).find((markerKey) => markerKey === key)) {
        console.log(`Clock.mark(): The specified marker name '${key}' already exists!`);
        return;
      }
      this.markers[key] = getTime();
    }
    measure(makerFrom, makerTo) {
      let start;
      let end;
      if (!makerFrom) {
        start = this.startTime;
      } else {
        if (!Object.keys(this.markers).find((markerKey) => markerKey === makerFrom)) {
          console.log(`Clock.measure(): The specified makerFrom '${makerFrom}' does not exist!`);
          return 0;
        }
        start = this.markers[makerFrom];
      }
      if (!makerTo) {
        end = getTime();
      } else {
        if (!Object.keys(this.markers).find((markerKey) => markerKey === makerTo)) {
          console.log(`Clock.measure(): The specified makerTo '${makerTo}' does not exist!`);
          return 0;
        }
        end = this.markers[makerTo];
      }
      return end - start;
    }
  }

  const CANVAS_POOL_MAX_SIZE = 10;

  const isInstanceOf = (value, type) => typeof type !== "undefined" && value instanceof type;

  const nav$1 = navigator?.userAgent || "";
  const ANDROID$1 = /android|adr/i.test(nav$1);
  const MOBILE$1 = /(mobile)/i.test(nav$1) && ANDROID$1;
  !(/(mobile)/i.test(nav$1) || MOBILE$1) && /Mac OS X/i.test(nav$1);
  const IPHONE$1 = /(iphone|ipad|ipod)/i.test(nav$1);
  /MicroMessenger/i.test(nav$1);
  const SAFARI_OR_IOS_WEBVIEW$1 = /^((?!chrome|android).)*safari/i.test(nav$1) || IPHONE$1;
  const WORKER = typeof globalThis.importScripts === "function";

  const canvasPool = new Array();
  const isOffscreenCanvas = (element) => isInstanceOf(element, globalThis.OffscreenCanvas);
  const isCanvas = (element) => isOffscreenCanvas(element) || isInstanceOf(element, globalThis.HTMLCanvasElement);
  const getCanvas2D = (width, height) => {
    let canvas = canvasPool.pop() || createCanvas2D();
    if (canvas !== null) {
      canvas.width = width;
      canvas.height = height;
    }
    return canvas;
  };
  const releaseCanvas2D = (canvas) => {
    if (canvasPool.length < CANVAS_POOL_MAX_SIZE) {
      canvasPool.push(canvas);
    }
  };
  const createCanvas2D = () => {
    if (SAFARI_OR_IOS_WEBVIEW$1 && !WORKER) {
      return document.createElement("canvas");
    }
    try {
      const offscreenCanvas = new OffscreenCanvas(0, 0);
      const context = offscreenCanvas.getContext("2d");
      if (typeof context.measureText === "function")
        return offscreenCanvas;
      return document.createElement("canvas");
    } catch (err) {
      return document.createElement("canvas");
    }
  };
  const calculateDisplaySize = (canvas) => {
    const styleDeclaration = globalThis.getComputedStyle(canvas, null);
    const computedSize = {
      width: Number(styleDeclaration.width.replace("px", "")),
      height: Number(styleDeclaration.height.replace("px", ""))
    };
    if (computedSize.width > 0 && computedSize.height > 0) {
      return computedSize;
    } else {
      const styleSize = {
        width: Number(canvas.style.width.replace("px", "")),
        height: Number(canvas.style.height.replace("px", ""))
      };
      if (styleSize.width > 0 && styleSize.height > 0) {
        return styleSize;
      } else {
        return {
          width: canvas.width,
          height: canvas.height
        };
      }
    }
  };

  var __defProp$7 = Object.defineProperty;
  var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
  var __decorateClass$6 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$7(target, key, result);
    return result;
  };
  let PAGView = class {
    constructor(pagPlayer, canvasElement) {
      this.repeatCount = 0;
      this.isPlaying = false;
      this.isDestroyed = false;
      this.pagViewOptions = {
        useScale: true,
        useCanvas2D: false,
        firstFrame: true
      };
      this.renderCanvas = null;
      this.pagGlContext = null;
      this.frameRate = 0;
      this.pagSurface = null;
      this.playFrame = -1;
      this.timer = null;
      this.flushingNextFrame = false;
      this.playTime = 0;
      this.startTime = 0;
      this.repeatedTimes = 0;
      this.eventManager = new EventManager();
      this.rawWidth = 0;
      this.rawHeight = 0;
      this.debugData = {
        FPS: 0,
        flushTime: 0
      };
      this.fpsBuffer = [];
      this.player = pagPlayer;
      this.canvasElement = canvasElement;
    }
    static async init(file, canvas, initOptions = {}) {
      let canvasElement = null;
      if (typeof canvas === "string") {
        canvasElement = document.getElementById(canvas.substr(1));
      } else if (typeof window !== "undefined" && isInstanceOf$1(canvas, globalThis.HTMLCanvasElement)) {
        canvasElement = canvas;
      } else if (isOffscreenCanvas(canvas)) {
        canvasElement = canvas;
      }
      if (!canvasElement)
        throw new Error("Canvas is not found!");
      const pagPlayer = PAGModule.PAGPlayer.create();
      const pagView = new PAGView(pagPlayer, canvasElement);
      pagView.pagViewOptions = { ...pagView.pagViewOptions, ...initOptions };
      if (pagView.pagViewOptions.useCanvas2D) {
        PAGModule.globalCanvas.retain();
        pagView.pagGlContext = BackendContext.from(PAGModule.globalCanvas.glContext);
      } else {
        pagView.renderCanvas = RenderCanvas.from(canvasElement);
        pagView.renderCanvas.retain();
        pagView.pagGlContext = BackendContext.from(pagView.renderCanvas.glContext);
      }
      pagView.resetSize(pagView.pagViewOptions.useScale);
      pagView.frameRate = file.frameRate();
      pagView.pagSurface = this.makePAGSurface(pagView.pagGlContext, pagView.rawWidth, pagView.rawHeight);
      pagView.player.setSurface(pagView.pagSurface);
      pagView.player.setComposition(file);
      pagView.setProgress(0);
      if (pagView.pagViewOptions.firstFrame) {
        await pagView.flush();
        pagView.playFrame = 0;
      }
      return pagView;
    }
    static makePAGSurface(pagGlContext, width, height) {
      if (!pagGlContext.makeCurrent())
        throw new Error("Make context current fail!");
      const pagSurface = PAGSurface.fromRenderTarget(0, width, height, true);
      pagGlContext.clearCurrent();
      return pagSurface;
    }
    duration() {
      return this.player.duration();
    }
    addListener(eventName, listener) {
      return this.eventManager.on(eventName, listener);
    }
    removeListener(eventName, listener) {
      return this.eventManager.off(eventName, listener);
    }
    async play() {
      if (this.isPlaying)
        return;
      this.isPlaying = true;
      this.startTime = this.getNowTime() * 1e3 - this.playTime;
      for (const videoReader of this.player.videoReaders) {
        videoReader.isPlaying = true;
      }
      const playTime = this.playTime;
      await this.flushLoop(true);
      if (playTime === 0) {
        this.eventManager.emit("onAnimationStart", this);
      }
      this.eventManager.emit("onAnimationPlay", this);
      if (this.playFrame === 0) {
        this.eventManager.emit("onAnimationUpdate", this);
      }
    }
    pause() {
      if (!this.isPlaying)
        return;
      this.clearTimer();
      for (const videoReader of this.player.videoReaders) {
        videoReader.pause();
      }
      this.isPlaying = false;
      this.eventManager.emit("onAnimationPause", this);
    }
    async stop(notification = true) {
      this.clearTimer();
      this.playTime = 0;
      this.player.setProgress(0);
      this.playFrame = 0;
      await this.flush();
      for (const videoReader of this.player.videoReaders) {
        videoReader.stop();
      }
      this.isPlaying = false;
      if (notification) {
        this.eventManager.emit("onAnimationCancel", this);
      }
    }
    setRepeatCount(repeatCount) {
      this.repeatCount = repeatCount < 0 ? 0 : repeatCount - 1;
    }
    getProgress() {
      return this.player.getProgress();
    }
    currentFrame() {
      return this.player.currentFrame();
    }
    setProgress(progress) {
      this.playTime = progress * this.duration();
      this.startTime = this.getNowTime() * 1e3 - this.playTime;
      if (!this.isPlaying) {
        this.player.setProgress(progress);
      }
      return progress;
    }
    videoEnabled() {
      return this.player.videoEnabled();
    }
    setVideoEnabled(enable) {
      this.player.setVideoEnabled(enable);
    }
    cacheEnabled() {
      return this.player.cacheEnabled();
    }
    setCacheEnabled(enable) {
      this.player.setCacheEnabled(enable);
    }
    cacheScale() {
      return this.player.cacheScale();
    }
    setCacheScale(value) {
      this.player.setCacheScale(value);
    }
    maxFrameRate() {
      return this.player.maxFrameRate();
    }
    setMaxFrameRate(value) {
      this.player.setMaxFrameRate(value);
    }
    scaleMode() {
      return this.player.scaleMode();
    }
    setScaleMode(value) {
      this.player.setScaleMode(value);
    }
    async flush() {
      const clock = new Clock();
      const res = await this.player.flushInternal((res2) => {
        if (this.pagViewOptions.useCanvas2D && res2 && PAGModule.globalCanvas.canvas) {
          if (!this.canvasContext)
            this.canvasContext = this.canvasElement?.getContext("2d");
          const compositeOperation = this.canvasContext.globalCompositeOperation;
          this.canvasContext.globalCompositeOperation = "copy";
          this.canvasContext?.drawImage(
            PAGModule.globalCanvas.canvas,
            0,
            PAGModule.globalCanvas.canvas.height - this.rawHeight,
            this.rawWidth,
            this.rawHeight,
            0,
            0,
            this.canvasContext.canvas.width,
            this.canvasContext.canvas.height
          );
          this.canvasContext.globalCompositeOperation = compositeOperation;
        }
        clock.mark("flush");
        this.setDebugData({ flushTime: clock.measure("", "flush") });
        this.updateFPS();
      });
      this.eventManager.emit("onAnimationUpdate", this);
      if (res) {
        this.eventManager.emit("onAnimationFlushed", this);
      }
      return res;
    }
    freeCache() {
      this.pagSurface?.freeCache();
    }
    getComposition() {
      return this.player.getComposition();
    }
    setComposition(pagComposition) {
      this.player.setComposition(pagComposition);
    }
    matrix() {
      return this.player.matrix();
    }
    setMatrix(matrix) {
      this.player.setMatrix(matrix);
    }
    getLayersUnderPoint(localX, localY) {
      return this.player.getLayersUnderPoint(localX, localY);
    }
    updateSize() {
      if (!this.canvasElement) {
        throw new Error("Canvas element is not found!");
      }
      this.rawWidth = this.canvasElement.width;
      this.rawHeight = this.canvasElement.height;
      if (!this.pagGlContext)
        return;
      const pagSurface = PAGView.makePAGSurface(this.pagGlContext, this.rawWidth, this.rawHeight);
      this.player.setSurface(pagSurface);
      this.pagSurface?.destroy();
      this.pagSurface = pagSurface;
    }
    prepare() {
      return this.player.prepare();
    }
    async makeSnapshot() {
      return await createImageBitmap(this.canvasElement);
    }
    destroy() {
      this.clearTimer();
      this.player.destroy();
      this.pagSurface?.destroy();
      if (this.pagViewOptions.useCanvas2D) {
        PAGModule.globalCanvas.release();
      } else {
        this.renderCanvas?.release();
      }
      this.pagGlContext?.destroy();
      this.pagGlContext = null;
      this.canvasContext = null;
      this.canvasElement = null;
      this.isDestroyed = true;
    }
    getDebugData() {
      return this.debugData;
    }
    setDebugData(data) {
      this.debugData = { ...this.debugData, ...data };
    }
    async flushLoop(force = false) {
      if (!this.isPlaying || this.isDestroyed) {
        return;
      }
      this.setTimer();
      if (this.flushingNextFrame)
        return;
      try {
        this.flushingNextFrame = true;
        await this.flushNextFrame(force);
        this.flushingNextFrame = false;
      } catch (e) {
        this.flushingNextFrame = false;
        if (e.message !== "The play() request was interrupted because the document was hidden!") {
          this.clearTimer();
        }
        console.error(e);
      }
    }
    async flushNextFrame(force = false) {
      const duration = this.duration();
      this.playTime = this.getNowTime() * 1e3 - this.startTime;
      const playFrame = Math.floor(this.playTime / 1e6 * this.frameRate);
      const count = Math.floor(this.playTime / duration);
      if (!force && this.repeatCount >= 0 && count > this.repeatCount) {
        this.clearTimer();
        this.player.setProgress(1);
        await this.flush();
        this.playTime = 0;
        this.isPlaying = false;
        this.repeatedTimes = 0;
        this.eventManager.emit("onAnimationEnd", this);
        return true;
      }
      if (!force && this.repeatedTimes === count && this.playFrame === playFrame) {
        return false;
      }
      if (this.repeatedTimes < count) {
        this.eventManager.emit("onAnimationRepeat", this);
      }
      this.player.setProgress(this.playTime % duration / duration);
      const res = await this.flush();
      if (this.needResetStartTime()) {
        this.startTime = this.getNowTime() * 1e3 - this.playTime;
      }
      this.playFrame = playFrame;
      this.repeatedTimes = count;
      return res;
    }
    getNowTime() {
      try {
        return performance.now();
      } catch {
        return Date.now();
      }
    }
    setTimer() {
      this.timer = globalThis.requestAnimationFrame(() => {
        this.flushLoop();
      });
    }
    clearTimer() {
      if (this.timer) {
        globalThis.cancelAnimationFrame(this.timer);
        this.timer = null;
      }
    }
    resetSize(useScale = true) {
      if (!this.canvasElement) {
        throw new Error("Canvas element is not found!");
      }
      if (!useScale || isOffscreenCanvas(this.canvasElement)) {
        this.rawWidth = this.canvasElement.width;
        this.rawHeight = this.canvasElement.height;
        return;
      }
      const canvas = this.canvasElement;
      const displaySize = calculateDisplaySize(canvas);
      canvas.style.width = `${displaySize.width}px`;
      canvas.style.height = `${displaySize.height}px`;
      this.rawWidth = displaySize.width * globalThis.devicePixelRatio;
      this.rawHeight = displaySize.height * globalThis.devicePixelRatio;
      canvas.width = this.rawWidth;
      canvas.height = this.rawHeight;
    }
    needResetStartTime() {
      for (const VideoReader of this.player.videoReaders) {
        if (VideoReader.isSought)
          return true;
      }
      return false;
    }
    updateFPS() {
      let now;
      try {
        now = performance.now();
      } catch {
        now = Date.now();
      }
      this.fpsBuffer = this.fpsBuffer.filter((value) => now - value <= 1e3);
      this.fpsBuffer.push(now);
      this.setDebugData({ FPS: this.fpsBuffer.length });
    }
  };
  PAGView = __decorateClass$6([
    destroyVerify$1
  ], PAGView);

  const fontNames = ["Arial", '"Courier New"', "Georgia", '"Times New Roman"', '"Trebuchet MS"', "Verdana"];
  const defaultFontNames = (() => {
    return ["emoji"].concat(...fontNames);
  })();
  const getFontFamilies = (name, style = "") => {
    if (!name)
      return [];
    const nameChars = name.split(" ");
    let names = [];
    if (nameChars.length === 1) {
      names.push(name);
    } else {
      names.push(nameChars.join(""));
      names.push(nameChars.join(" "));
    }
    const fontFamilies = names.reduce((pre, cur) => {
      if (!style) {
        pre.push(`"${cur}"`);
      } else {
        pre.push(`"${cur} ${style}"`);
        pre.push(`"${cur}-${style}"`);
      }
      return pre;
    }, []);
    if (style !== "") {
      fontFamilies.push(`"${name}"`);
    }
    return fontFamilies;
  };

  var __defProp$6 = Object.defineProperty;
  var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
  var __decorateClass$5 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$6(target, key, result);
    return result;
  };
  let PAGFont = class {
    constructor(wasmIns) {
      this.isDestroyed = false;
      this.wasmIns = wasmIns;
      this.fontFamily = this.wasmIns.fontFamily;
      this.fontStyle = this.wasmIns.fontStyle;
    }
    static create(fontFamily, fontStyle) {
      const wasmIns = PAGModule._PAGFont._create(fontFamily, fontStyle);
      if (!wasmIns)
        throw new Error("Create PAGFont fail!");
      return new PAGFont(wasmIns);
    }
    static async registerFont(family, data) {
      const buffer = await readFile(data);
      if (!buffer || !(buffer.byteLength > 0)) {
        throw new Error("Initialize PAGFont data not be empty!");
      }
      const dataUint8Array = new Uint8Array(buffer);
      const fontFace = new FontFace(family, dataUint8Array);
      document.fonts.add(fontFace);
      await fontFace.load();
    }
    static registerFallbackFontNames(fontNames = []) {
      const vectorNames = new PAGModule.VectorString();
      const names = fontNames.concat(defaultFontNames);
      for (const name of names) {
        vectorNames.push_back(name);
      }
      PAGModule._PAGFont._SetFallbackFontNames(vectorNames);
      vectorNames.delete();
    }
    destroy() {
      this.wasmIns.delete();
      this.isDestroyed = true;
    }
  };
  PAGFont = __decorateClass$5([
    destroyVerify$1
  ], PAGFont);

  let eventHandlers = {};
  const addListener = (node, event, handler, capture = false) => {
    if (!(event in eventHandlers)) {
      eventHandlers[event] = [];
    }
    eventHandlers[event]?.push({ node, handler, capture });
    node.addEventListener(event, handler, capture);
  };
  const removeListener = (targetNode, event, targetHandler) => {
    if (!(event in eventHandlers))
      return;
    eventHandlers[event]?.filter(({ node, handler }) => node === targetNode && handler === targetHandler).forEach(({ node, handler, capture }) => node.removeEventListener(event, handler, capture));
  };
  const removeAllListeners = (targetNode, event) => {
    if (!(event in eventHandlers))
      return;
    eventHandlers[event]?.filter(({ node }) => node === targetNode).forEach(({ node, handler, capture }) => node.removeEventListener(event, handler, capture));
    eventHandlers[event] = eventHandlers[event]?.filter(({ node }) => node !== targetNode);
  };

  const nav = navigator?.userAgent || "";
  const ANDROID = /android|adr/i.test(nav);
  const MOBILE = /(mobile)/i.test(nav) && ANDROID;
  !(/(mobile)/i.test(nav) || MOBILE) && /Mac OS X/i.test(nav);
  const IPHONE = /(iphone|ipad|ipod)/i.test(nav);
  const WECHAT = /MicroMessenger/i.test(nav);
  const SAFARI_OR_IOS_WEBVIEW = /^((?!chrome|android).)*safari/i.test(nav) || IPHONE;

  var __defProp$5 = Object.defineProperty;
  var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
  var __decorateClass$4 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$5(target, key, result);
    return result;
  };
  const UHD_RESOLUTION = 3840;
  const getWechatNetwork = () => {
    return new Promise((resolve) => {
      window.WeixinJSBridge.invoke(
        "getNetworkType",
        {},
        () => {
          resolve();
        },
        () => {
          resolve();
        }
      );
    });
  };
  const waitVideoCanPlay = (videoElement) => {
    return new Promise((resolve) => {
      const canplayHandle = () => {
        removeListener(videoElement, "canplay", canplayHandle);
        clearTimeout(timer);
        resolve(true);
      };
      addListener(videoElement, "canplay", canplayHandle);
      const timer = setTimeout(() => {
        removeListener(videoElement, "canplay", canplayHandle);
        resolve(false);
      }, 1e3);
    });
  };
  let VideoReader = class {
    constructor(source, width, height, frameRate, staticTimeRanges) {
      this.isSought = false;
      this.isPlaying = false;
      this.bitmap = null;
      this.isDestroyed = false;
      this.videoEl = null;
      this.frameRate = 0;
      this.canplay = false;
      this.staticTimeRanges = null;
      this.disablePlaybackRate = false;
      this.error = null;
      this.player = null;
      this.width = 0;
      this.height = 0;
      this.bitmapCanvas = null;
      this.bitmapCtx = null;
      this.currentFrame = -1;
      this.targetFrame = -1;
      this.visibilityHandle = null;
      if (isInstanceOf$1(source, globalThis.HTMLVideoElement)) {
        this.videoEl = source;
        this.canplay = true;
      } else {
        this.videoEl = document.createElement("video");
        this.videoEl.style.display = "none";
        this.videoEl.muted = true;
        this.videoEl.playsInline = true;
        this.videoEl.preload = "auto";
        this.videoEl.width = width;
        this.videoEl.height = height;
        waitVideoCanPlay(this.videoEl).then(() => {
          this.canplay = true;
        });
        const buffer = source.slice();
        const blob = new Blob([buffer], { type: "video/mp4" });
        this.videoEl.src = URL.createObjectURL(blob);
        if (IPHONE) {
          this.videoEl.load();
        }
      }
      this.frameRate = frameRate;
      this.width = width;
      this.height = height;
      this.staticTimeRanges = new StaticTimeRanges(staticTimeRanges);
      if (UHD_RESOLUTION < width || UHD_RESOLUTION < height) {
        this.disablePlaybackRate = true;
      }
      this.linkPlayer(PAGModule.currentPlayer);
    }
    static async create(source, width, height, frameRate, staticTimeRanges) {
      return new VideoReader(source, width, height, frameRate, staticTimeRanges);
    }
    async prepare(targetFrame, playbackRate) {
      if (this.isDestroyed || targetFrame === this.currentFrame) {
        return;
      }
      const promise = new Promise(async (resolve) => {
        this.setError(null);
        this.isSought = false;
        const { currentTime } = this.videoEl;
        const targetTime = targetFrame / this.frameRate;
        if (currentTime === 0 && targetTime === 0) {
          if (!this.canplay && !SAFARI_OR_IOS_WEBVIEW) {
            await waitVideoCanPlay(this.videoEl);
          } else {
            try {
              await waitVideoCanPlay(this.videoEl);
              await this.play();
            } catch (e) {
              this.setError(e);
              this.currentFrame = targetFrame;
              resolve();
              return;
            }
            await new Promise((resolveInner) => {
              requestAnimationFrame(() => {
                if (!this.isDestroyed) {
                  this.pause();
                }
                resolveInner();
              });
            });
          }
        } else {
          if (Math.round(targetTime * this.frameRate) === Math.round(currentTime * this.frameRate)) ; else if (this.staticTimeRanges?.contains(targetFrame)) {
            await this.seek(targetTime, false);
            this.currentFrame = targetFrame;
            resolve();
            return;
          } else if (Math.abs(currentTime - targetTime) < 1 / this.frameRate * VIDEO_DECODE_WAIT_FRAME && !this.videoEl.paused) ; else {
            this.isSought = true;
            await this.seek(targetTime);
            this.currentFrame = targetFrame;
            resolve();
            return;
          }
        }
        if (this.isDestroyed || !this.videoEl) {
          resolve();
          return;
        }
        const targetPlaybackRate = Math.min(Math.max(playbackRate, VIDEO_PLAYBACK_RATE_MIN), VIDEO_PLAYBACK_RATE_MAX);
        if (!this.disablePlaybackRate && this.videoEl.playbackRate !== targetPlaybackRate) {
          this.videoEl.playbackRate = targetPlaybackRate;
        }
        if (this.isPlaying && this.videoEl.paused) {
          try {
            await this.play();
          } catch (e) {
            this.setError(e);
            this.currentFrame = targetFrame;
            resolve();
            return;
          }
        }
        this.currentFrame = targetFrame;
        resolve();
      });
      await promise;
    }
    getCurrentFrame() {
      return this.currentFrame;
    }
    getVideo() {
      return this.videoEl;
    }
    async play() {
      if (!this.videoEl.paused)
        return;
      if (WECHAT && window.WeixinJSBridge) {
        await getWechatNetwork();
      }
      if (document.visibilityState !== "visible" && !globalThis.__FRAME_OFFSCREEN_RENDERER) {
        this.clearVisibilityListener();
        this.visibilityHandle = () => {
          if (this.isDestroyed) {
            this.clearVisibilityListener();
            return;
          }
          if (document.visibilityState === "visible") {
            if (this.videoEl)
              this.videoEl.play().catch((e) => {
                this.setError(e);
              });
            this.clearVisibilityListener();
          }
        };
        window.addEventListener("visibilitychange", this.visibilityHandle);
        throw new Error("The play() request was interrupted because the document was hidden!");
      }
      await this.videoEl?.play();
    }
    pause() {
      this.isPlaying = false;
      if (this.videoEl.paused)
        return;
      this.videoEl?.pause();
    }
    stop() {
      this.isPlaying = false;
      if (!this.videoEl.paused) {
        this.videoEl?.pause();
      }
    }
    getError() {
      return this.error;
    }
    onDestroy() {
      this.isDestroyed = true;
      if (this.player) {
        this.player.unlinkVideoReader(this);
        this.player = null;
      }
      this.clearVisibilityListener();
      removeAllListeners(this.videoEl, "playing");
      removeAllListeners(this.videoEl, "timeupdate");
      removeAllListeners(this.videoEl, "seeked");
      removeAllListeners(this.videoEl, "canplay");
      this.videoEl = null;
      this.bitmapCanvas = null;
      this.bitmapCtx = null;
    }
    seek(targetTime, play = true) {
      return new Promise((resolve, reject) => {
        if (!this.videoEl) {
          reject(new Error("Video element is not initialized."));
          return;
        }
        const onSeeked = () => {
          if (!this.videoEl || this.isDestroyed) {
            clearTimeout(seekTimeout);
            resolve();
            return;
          }
          removeListener(this.videoEl, "seeked", onSeeked);
          clearTimeout(seekTimeout);
          if (play) {
            if (this.videoEl.ended) {
              this.videoEl.currentTime = this.videoEl.currentTime;
            }
            this.videoEl.play().catch((e) => {
              this.setError(e);
            });
          } else if (!play && !this.videoEl.paused) {
            this.videoEl.pause();
          }
          resolve();
        };
        const onCanPlay = () => {
          if (!this.videoEl || this.isDestroyed) {
            clearTimeout(seekTimeout);
            resolve();
            return;
          }
          removeListener(this.videoEl, "canplay", onCanPlay);
          this.videoEl.currentTime = targetTime;
          addListener(this.videoEl, "seeked", onSeeked);
        };
        const seekTimeout = setTimeout(() => {
          if (this.videoEl) {
            removeListener(this.videoEl, "canplay", onCanPlay);
            removeListener(this.videoEl, "seeked", onSeeked);
          }
          this.setError("Seek operation timed out.");
          resolve();
        }, 1e3 / this.frameRate * VIDEO_DECODE_SEEK_TIMEOUT_FRAME);
        if (this.videoEl.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
          addListener(this.videoEl, "canplay", onCanPlay);
        } else {
          this.videoEl.currentTime = targetTime;
          addListener(this.videoEl, "seeked", onSeeked);
        }
      });
    }
    setError(e) {
      this.error = e;
    }
    clearVisibilityListener() {
      if (this.visibilityHandle) {
        window.removeEventListener("visibilitychange", this.visibilityHandle);
        this.visibilityHandle = null;
      }
    }
    linkPlayer(player) {
      this.player = player;
      if (player) {
        player.linkVideoReader(this);
      }
    }
  };
  VideoReader = __decorateClass$4([
    destroyVerify$1
  ], VideoReader);
  class StaticTimeRanges {
    constructor(timeRanges) {
      this.timeRanges = timeRanges;
    }
    contains(targetFrame) {
      if (this.timeRanges.length === 0)
        return false;
      for (let timeRange of this.timeRanges) {
        if (timeRange.start <= targetFrame && targetFrame < timeRange.end) {
          return true;
        }
      }
      return false;
    }
  }

  class GlobalCanvas {
    constructor() {
      this._canvas = null;
      this._glContext = null;
      this.width = DEFAULT_CANVAS_SIZE;
      this.height = DEFAULT_CANVAS_SIZE;
      this.retainCount = 0;
    }
    retain() {
      if (this.retainCount === 0) {
        try {
          this._canvas = new OffscreenCanvas(0, 0);
        } catch (error) {
          this._canvas = document.createElement("canvas");
        }
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        const gl = this._canvas.getContext("webgl", WEBGL_CONTEXT_ATTRIBUTES);
        if (!gl)
          throw new Error("Canvas context is not WebGL!");
        this._glContext = BackendContext.from(gl);
      }
      this.retainCount += 1;
    }
    release() {
      this.retainCount -= 1;
      if (this.retainCount === 0) {
        if (!this._glContext)
          return;
        this._glContext.destroy();
        this._glContext = null;
        this._canvas = null;
      }
    }
    get canvas() {
      return this._canvas;
    }
    get glContext() {
      return this._glContext;
    }
    setCanvasSize(width = DEFAULT_CANVAS_SIZE, height = DEFAULT_CANVAS_SIZE) {
      this.width = width;
      this.height = height;
      if (this._glContext && this._canvas) {
        this._canvas.width = width;
        this._canvas.height = height;
      }
    }
  }

  var __defProp$4 = Object.defineProperty;
  var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
  var __decorateClass$3 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$4(target, key, result);
    return result;
  };
  let PAGTextLayer = class extends PAGLayer {
    static make(duration, text, fontSize = 0, fontFamily = "", fontStyle = "") {
      if (typeof text === "string") {
        return new PAGTextLayer(PAGModule._PAGTextLayer._Make(duration, text, fontSize, fontFamily, fontStyle));
      } else {
        return new PAGTextLayer(PAGModule._PAGTextLayer._Make(duration, text));
      }
    }
    fillColor() {
      return this.wasmIns._fillColor();
    }
    setFillColor(value) {
      this.wasmIns._setFillColor(value);
    }
    font() {
      return new PAGFont(this.wasmIns._font());
    }
    setFont(pagFont) {
      this.wasmIns._setFont(pagFont.wasmIns);
    }
    fontSize() {
      return this.wasmIns._fontSize();
    }
    setFontSize(size) {
      this.wasmIns._setFontSize(size);
    }
    strokeColor() {
      return this.wasmIns._strokeColor();
    }
    setStrokeColor(value) {
      this.wasmIns._setStrokeColor(value);
    }
    text() {
      return this.wasmIns._text();
    }
    setText(text) {
      this.wasmIns._setText(text);
    }
    reset() {
      this.wasmIns._reset();
    }
  };
  PAGTextLayer = __decorateClass$3([
    destroyVerify$1
  ], PAGTextLayer);

  var __defProp$3 = Object.defineProperty;
  var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
  var __decorateClass$2 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$3(target, key, result);
    return result;
  };
  let PAGImageLayer = class extends PAGLayer {
    static make(width, height, duration) {
      const wasmIns = PAGModule._PAGImageLayer._Make(width, height, duration);
      if (!wasmIns)
        throw new Error("Make PAGImageLayer fail!");
      return new PAGImageLayer(wasmIns);
    }
    contentDuration() {
      return this.wasmIns._contentDuration();
    }
    getVideoRanges() {
      return this.wasmIns._getVideoRanges();
    }
    replaceImage(pagImage) {
      this.wasmIns._replaceImage(pagImage.wasmIns);
    }
    setImage(pagImage) {
      this.wasmIns._setImage(pagImage.wasmIns);
    }
    layerTimeToContent(layerTime) {
      return this.wasmIns._layerTimeToContent(layerTime);
    }
    contentTimeToLayer(contentTime) {
      return this.wasmIns._contentTimeToLayer(contentTime);
    }
    imageBytes() {
      return this.wasmIns._imageBytes();
    }
  };
  PAGImageLayer = __decorateClass$2([
    destroyVerify$1
  ], PAGImageLayer);

  var __defProp$2 = Object.defineProperty;
  var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
  var __decorateClass$1 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$2(target, key, result);
    return result;
  };
  let PAGSolidLayer = class extends PAGLayer {
    static make(duration, width, height, solidColor, opacity) {
      const wasmIns = PAGModule._PAGSolidLayer._Make(duration, width, height, solidColor, opacity);
      if (!wasmIns)
        throw new Error("Make PAGSolidLayer fail!");
      return new PAGSolidLayer(wasmIns);
    }
    solidColor() {
      return this.wasmIns._solidColor();
    }
    setSolidColor(color) {
      this.wasmIns._setSolidColor(color);
    }
  };
  PAGSolidLayer = __decorateClass$1([
    destroyVerify$1
  ], PAGSolidLayer);

  const setMixin = (module) => {
    module.traceImage = function(info, pixels) {
      const canvas = document.createElement("canvas");
      canvas.width = info.width;
      canvas.height = info.height;
      const context = canvas.getContext("2d");
      const imageData = new ImageData(new Uint8ClampedArray(pixels), canvas.width, canvas.height);
      context.putImageData(imageData, 0, 0);
      document.body.appendChild(canvas);
    };
    module.registerSoftwareDecoderFactory = function(factory = null) {
      module._registerSoftwareDecoderFactory(factory);
      module._useSoftwareDecoder = true;
    };
    module.SDKVersion = function() {
      return module._SDKVersion();
    };
    module.isIPhone = () => IPHONE;
  };

  let TGFXModule;
  const setTGFXModule = (module) => {
    TGFXModule = module;
  };

  class BitmapImage {
    constructor(bitmap) {
      this.bitmap = bitmap;
    }
    setBitmap(bitmap) {
      if (this.bitmap) {
        this.bitmap.close();
      }
      this.bitmap = bitmap;
    }
  }

  const createImage = (source) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      };
      image.onerror = function() {
        console.error("image create from bytes error.");
        resolve(null);
      };
      image.src = source;
    });
  };
  const createImageFromBytes = (bytes) => {
    const uint8Array = new Uint8Array(bytes);
    const blob = new Blob([uint8Array], { type: "image/*" });
    return createImage(URL.createObjectURL(blob));
  };
  const readImagePixels = (module, image, width, height) => {
    if (!image) {
      return null;
    }
    const canvas = getCanvas2D(width, height);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return null;
    }
    ctx.drawImage(image, 0, 0, width, height);
    const { data } = ctx.getImageData(0, 0, width, height);
    releaseCanvas2D(canvas);
    if (data.length === 0) {
      return null;
    }
    return new Uint8Array(data);
  };
  const hasWebpSupport = () => {
    try {
      return document.createElement("canvas").toDataURL("image/webp", 0.5).indexOf("data:image/webp") === 0;
    } catch (err) {
      return false;
    }
  };
  const getSourceSize = (source) => {
    if (isInstanceOf(source, globalThis.HTMLVideoElement)) {
      return {
        width: source.videoWidth,
        height: source.videoHeight
      };
    }
    return { width: source.width, height: source.height };
  };
  const uploadToTexture = (GL, source, textureID, alphaOnly) => {
    let renderSource = source instanceof BitmapImage ? source.bitmap : source;
    if (!renderSource)
      return;
    const gl = GL.currentContext?.GLctx;
    gl.bindTexture(gl.TEXTURE_2D, GL.textures[textureID]);
    if (alphaOnly) {
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.ALPHA, gl.UNSIGNED_BYTE, renderSource);
    } else {
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, renderSource);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    }
  };
  const isAndroidMiniprogram = () => {
    if (typeof wx !== "undefined" && wx.getSystemInfoSync) {
      return wx.getSystemInfoSync().platform === "android";
    }
  };
  const releaseNativeImage = (source) => {
    if (isInstanceOf(source, globalThis.ImageBitmap)) {
      source.close();
    } else if (isCanvas(source)) {
      releaseCanvas2D(source);
    }
  };
  const getBytesFromPath = async (module, path) => {
    const buffer = await fetch(path).then((res) => res.arrayBuffer());
    return new Uint8Array(buffer);
  };

  var tgfx = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createImage: createImage,
    createImageFromBytes: createImageFromBytes,
    readImagePixels: readImagePixels,
    hasWebpSupport: hasWebpSupport,
    getSourceSize: getSourceSize,
    uploadToTexture: uploadToTexture,
    isAndroidMiniprogram: isAndroidMiniprogram,
    releaseNativeImage: releaseNativeImage,
    getBytesFromPath: getBytesFromPath,
    createCanvas2D: getCanvas2D
  });

  function destroyVerify(constructor) {
    let functions = Object.getOwnPropertyNames(constructor.prototype).filter(
      (name) => name !== "constructor" && typeof constructor.prototype[name] === "function"
    );
    const proxyFn = (target, methodName) => {
      const fn = target[methodName];
      target[methodName] = function(...args) {
        if (this["isDestroyed"]) {
          console.error(`Don't call ${methodName} of the ${constructor.name} that is destroyed.`);
          return;
        }
        return fn.call(this, ...args);
      };
    };
    functions.forEach((name) => proxyFn(constructor.prototype, name));
  }

  var MatrixIndex = /* @__PURE__ */ ((MatrixIndex2) => {
    MatrixIndex2[MatrixIndex2["a"] = 0] = "a";
    MatrixIndex2[MatrixIndex2["c"] = 1] = "c";
    MatrixIndex2[MatrixIndex2["tx"] = 2] = "tx";
    MatrixIndex2[MatrixIndex2["b"] = 3] = "b";
    MatrixIndex2[MatrixIndex2["d"] = 4] = "d";
    MatrixIndex2[MatrixIndex2["ty"] = 5] = "ty";
    return MatrixIndex2;
  })(MatrixIndex || {});

  var __defProp$1 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp$1(target, key, result);
    return result;
  };
  let Matrix = class {
    constructor(wasmIns) {
      this.isDestroyed = false;
      this.wasmIns = wasmIns;
    }
    get a() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex.a) : 0;
    }
    set a(value) {
      this.wasmIns?._set(MatrixIndex.a, value);
    }
    get b() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex.b) : 0;
    }
    set b(value) {
      this.wasmIns?._set(MatrixIndex.b, value);
    }
    get c() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex.c) : 0;
    }
    set c(value) {
      this.wasmIns?._set(MatrixIndex.c, value);
    }
    get d() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex.d) : 0;
    }
    set d(value) {
      this.wasmIns?._set(MatrixIndex.d, value);
    }
    get tx() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex.tx) : 0;
    }
    set tx(value) {
      this.wasmIns?._set(MatrixIndex.tx, value);
    }
    get ty() {
      return this.wasmIns ? this.wasmIns._get(MatrixIndex.ty) : 0;
    }
    set ty(value) {
      this.wasmIns?._set(MatrixIndex.ty, value);
    }
    get(index) {
      return this.wasmIns ? this.wasmIns._get(index) : 0;
    }
    set(index, value) {
      this.wasmIns?._set(index, value);
    }
    destroy() {
      this.wasmIns.delete();
    }
  };
  Matrix = __decorateClass([
    destroyVerify
  ], Matrix);

  const measureText = (imageData) => {
    const imageDataInt32Array = new Int32Array(imageData.data.buffer);
    let left = getLeftPixel(imageDataInt32Array, imageData.width, imageData.height);
    let top = getTopPixel(imageDataInt32Array, imageData.width, imageData.height);
    let right = getRightPixel(imageDataInt32Array, imageData.width, imageData.height);
    let bottom = getBottomPixel(imageDataInt32Array, imageData.width, imageData.height);
    if (left > right || top > bottom) {
      left = 0;
      top = 0;
      right = 0;
      bottom = 0;
    }
    return { left, top, right, bottom };
  };
  const getLeftPixel = (imageDataArray, width, height) => {
    const verticalCount = imageDataArray.length / width;
    const acrossCount = imageDataArray.length / height;
    for (let i = 0; i < acrossCount; i++) {
      for (let j = 0; j < verticalCount; j++) {
        if (imageDataArray[i + j * width] !== 0)
          return i;
      }
    }
    return acrossCount;
  };
  const getTopPixel = (imageDataArray, width, height) => {
    const verticalCount = imageDataArray.length / width;
    const acrossCount = imageDataArray.length / height;
    for (let i = 0; i < verticalCount; i++) {
      for (let j = 0; j < acrossCount; j++) {
        if (imageDataArray[i * width + j] !== 0)
          return i;
      }
    }
    return verticalCount;
  };
  const getRightPixel = (imageDataArray, width, height) => {
    const verticalCount = imageDataArray.length / width;
    const acrossCount = imageDataArray.length / height;
    for (let i = acrossCount - 1; i > 0; i--) {
      for (let j = verticalCount - 1; j > 0; j--) {
        if (imageDataArray[i + width * j] !== 0)
          return i;
      }
    }
    return 0;
  };
  const getBottomPixel = (imageDataArray, width, height) => {
    const verticalCount = imageDataArray.length / width;
    const acrossCount = imageDataArray.length / height;
    for (let i = verticalCount - 1; i > 0; i--) {
      for (let j = acrossCount - 1; j > 0; j--) {
        if (imageDataArray[i * width + j] !== 0)
          return i;
      }
    }
    return 0;
  };

  const _ScalerContext = class {
    constructor(fontName, fontStyle, size) {
      this.fontBoundingBoxMap = [];
      this.fontName = fontName;
      this.fontStyle = fontStyle;
      this.size = size;
      this.loadCanvas();
    }
    static getLineCap(cap) {
      switch (cap) {
        case TGFXModule.TGFXLineCap.Round:
          return "round";
        case TGFXModule.TGFXLineCap.Square:
          return "square";
        default:
          return "butt";
      }
    }
    static getLineJoin(join) {
      switch (join) {
        case TGFXModule.TGFXLineJoin.Round:
          return "round";
        case TGFXModule.TGFXLineJoin.Bevel:
          return "bevel";
        default:
          return "miter";
      }
    }
    static setCanvas(canvas) {
      _ScalerContext.canvas = canvas;
    }
    static setContext(context) {
      _ScalerContext.context = context;
    }
    static isUnicodePropertyEscapeSupported() {
      try {
        const regex = new RegExp("\\p{L}", "u");
        return true;
      } catch (e) {
        return false;
      }
    }
    static isEmoji(text) {
      let emojiRegExp;
      if (this.isUnicodePropertyEscapeSupported()) {
        emojiRegExp = /\p{Extended_Pictographic}|[#*0-9]\uFE0F?\u20E3|[\uD83C\uDDE6-\uD83C\uDDFF]/u;
      } else {
        emojiRegExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
      }
      return emojiRegExp.test(text);
    }
    static measureDirectly(ctx) {
      if (_ScalerContext.hasMeasureBoundsAPI === void 0) {
        const metrics = ctx.measureText("x");
        _ScalerContext.hasMeasureBoundsAPI = metrics && metrics.actualBoundingBoxAscent > 0;
      }
      return _ScalerContext.hasMeasureBoundsAPI;
    }
    fontString(fauxBold, fauxItalic) {
      const attributes = [];
      if (fauxItalic) {
        attributes.push("italic");
      }
      if (fauxBold) {
        attributes.push("bold");
      }
      attributes.push(`${this.size}px`);
      const fallbackFontNames = defaultFontNames.concat();
      fallbackFontNames.unshift(...getFontFamilies(this.fontName, this.fontStyle));
      attributes.push(`${fallbackFontNames.join(",")}`);
      return attributes.join(" ");
    }
    getFontMetrics() {
      if (this.fontMetrics) {
        return this.fontMetrics;
      }
      const { context } = _ScalerContext;
      context.font = this.fontString(false, false);
      const metrics = this.measureText(context, "H");
      const capHeight = metrics.actualBoundingBoxAscent;
      const xMetrics = this.measureText(context, "x");
      const xHeight = xMetrics.actualBoundingBoxAscent;
      this.fontMetrics = {
        ascent: -metrics.fontBoundingBoxAscent,
        descent: metrics.fontBoundingBoxDescent,
        xHeight,
        capHeight
      };
      return this.fontMetrics;
    }
    getBounds(text, fauxBold, fauxItalic) {
      const { context } = _ScalerContext;
      context.font = this.fontString(fauxBold, fauxItalic);
      const metrics = this.measureText(context, text);
      const bounds = {
        left: Math.floor(-metrics.actualBoundingBoxLeft),
        top: Math.floor(-metrics.actualBoundingBoxAscent),
        right: Math.ceil(metrics.actualBoundingBoxRight),
        bottom: Math.ceil(metrics.actualBoundingBoxDescent)
      };
      if (bounds.left >= bounds.right || bounds.top >= bounds.bottom) {
        bounds.left = 0;
        bounds.top = 0;
        bounds.right = 0;
        bounds.bottom = 0;
      }
      return bounds;
    }
    getAdvance(text) {
      const { context } = _ScalerContext;
      context.font = this.fontString(false, false);
      return context.measureText(text).width;
    }
    readPixels(text, bounds, fauxBold, stroke) {
      const width = bounds.right - bounds.left;
      const height = bounds.bottom - bounds.top;
      const canvas = getCanvas2D(width, height);
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.clearRect(0, 0, width, height);
      context.font = this.fontString(fauxBold, false);
      if (stroke) {
        context.lineJoin = _ScalerContext.getLineJoin(stroke.join);
        context.miterLimit = stroke.miterLimit;
        context.lineCap = _ScalerContext.getLineCap(stroke.cap);
        context.lineWidth = stroke.width;
        context.strokeText(text, -bounds.left, -bounds.top);
      } else {
        context.fillText(text, -bounds.left, -bounds.top);
      }
      const { data } = context.getImageData(0, 0, width, height);
      releaseCanvas2D(canvas);
      if (data.length === 0) {
        return null;
      }
      return new Uint8Array(data);
    }
    loadCanvas() {
      if (!_ScalerContext.canvas) {
        _ScalerContext.setCanvas(getCanvas2D(10, 10));
        _ScalerContext.setContext(
          _ScalerContext.canvas.getContext("2d", { willReadFrequently: true })
        );
      }
    }
    measureText(ctx, text) {
      if (_ScalerContext.measureDirectly(ctx)) {
        return ctx.measureText(text);
      }
      ctx.canvas.width = this.size * 1.5;
      ctx.canvas.height = this.size * 1.5;
      const pos = [0, this.size];
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillText(text, pos[0], pos[1]);
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const { left, top, right, bottom } = measureText(imageData);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      let fontMeasure;
      const fontBoundingBox = this.fontBoundingBoxMap.find((item) => item.key === this.fontName);
      if (fontBoundingBox) {
        fontMeasure = fontBoundingBox.value;
      } else {
        ctx.fillText("\u6D4B", pos[0], pos[1]);
        const fontImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        fontMeasure = measureText(fontImageData);
        this.fontBoundingBoxMap.push({ key: this.fontName, value: fontMeasure });
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
      return {
        actualBoundingBoxAscent: pos[1] - top,
        actualBoundingBoxRight: right - pos[0],
        actualBoundingBoxDescent: bottom - pos[1],
        actualBoundingBoxLeft: pos[0] - left,
        fontBoundingBoxAscent: fontMeasure.bottom - fontMeasure.top,
        fontBoundingBoxDescent: 0,
        width: fontMeasure.right - fontMeasure.left
      };
    }
  };
  let ScalerContext = _ScalerContext;
  ScalerContext.hasMeasureBoundsAPI = void 0;

  class PathRasterizer {
    static readPixels(width, height, path, fillType) {
      let canvas = getCanvas2D(width, height);
      if (canvas == null) {
        return null;
      }
      let context = canvas.getContext("2d", { willReadFrequently: true });
      context.setTransform(1, 0, 0, 1, 0, 0);
      if (fillType === TGFXModule.TGFXPathFillType.InverseWinding || fillType === TGFXModule.TGFXPathFillType.InverseEvenOdd) {
        context.clip(path, fillType === TGFXModule.TGFXPathFillType.InverseEvenOdd ? "evenodd" : "nonzero");
        context.fillRect(0, 0, width, height);
      } else {
        context.fill(path, fillType === TGFXModule.TGFXPathFillType.EvenOdd ? "evenodd" : "nonzero");
      }
      const { data } = context.getImageData(0, 0, width, height);
      releaseCanvas2D(canvas);
      if (data.length === 0) {
        return null;
      }
      return new Uint8Array(data);
    }
  }

  const TGFXBind = (module) => {
    setTGFXModule(module);
    module.module = module;
    module.ScalerContext = ScalerContext;
    module.WebMask = PathRasterizer;
    module.Matrix = Matrix;
    module.tgfx = { ...tgfx };
  };

  const PAGBind = (module) => {
    TGFXBind(module);
    setPAGModule(module);
    module.module = module;
    module.PAGFile = PAGFile;
    module.PAGPlayer = PAGPlayer;
    module.PAGView = PAGView;
    module.PAGFont = PAGFont;
    module.PAGImage = PAGImage;
    module.PAGLayer = PAGLayer;
    module.PAGComposition = PAGComposition;
    module.PAGSurface = PAGSurface;
    module.PAGTextLayer = PAGTextLayer;
    module.PAGImageLayer = PAGImageLayer;
    module.PAGSolidLayer = PAGSolidLayer;
    module.VideoReader = VideoReader;
    module.GlobalCanvas = GlobalCanvas;
    module.BackendContext = BackendContext;
    module.Matrix = Matrix$1;
    module.RenderCanvas = RenderCanvas;
    module._useSoftwareDecoder = false;
    setMixin(module);
  };

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  async function PAGInit$1(moduleArg = {}) {
    var moduleRtn;
    var Module = moduleArg;
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
    typeof process == "object" && process.versions?.node && process.type != "renderer";
    var _scriptName = document.baseURI;
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var readAsync, readBinary;
    if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      try {
        scriptDirectory = new URL(".", _scriptName).href;
      } catch {
      }
      {
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response);
          };
        }
        readAsync = async (url) => {
          var response = await fetch(url, { credentials: "same-origin" });
          if (response.ok) {
            return response.arrayBuffer();
          }
          throw new Error(response.status + " : " + response.url);
        };
      }
    }
    var out = console.log.bind(console);
    var err = console.error.bind(console);
    var wasmBinary;
    var ABORT = false;
    var readyPromiseResolve, readyPromiseReject;
    var wasmMemory;
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
    var HEAP64, HEAPU64;
    var runtimeInitialized = false;
    function updateMemoryViews() {
      var b = wasmMemory.buffer;
      HEAP8 = new Int8Array(b);
      HEAP16 = new Int16Array(b);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
      HEAPU16 = new Uint16Array(b);
      HEAP32 = new Int32Array(b);
      HEAPU32 = new Uint32Array(b);
      HEAPF32 = new Float32Array(b);
      HEAPF64 = new Float64Array(b);
      HEAP64 = new BigInt64Array(b);
      HEAPU64 = new BigUint64Array(b);
    }
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(onPreRuns);
    }
    function initRuntime() {
      runtimeInitialized = true;
      if (!Module["noFSInit"] && !FS.initialized)
        FS.init();
      wasmExports["Bc"]();
      FS.ignorePermissions = false;
    }
    function postRun() {
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(onPostRuns);
    }
    function abort(what) {
      Module["onAbort"]?.(what);
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      what += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject?.(e);
      throw e;
    }
    var wasmBinaryFile;
    function findWasmBinary() {
      if (Module["locateFile"]) {
        return locateFile("libpag.wasm");
      }
      return new URL("libpag.wasm", document.baseURI).href;
    }
    function getBinarySync(file) {
      if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary);
      }
      if (readBinary) {
        return readBinary(file);
      }
      throw "both async and sync fetching of the wasm failed";
    }
    async function getWasmBinary(binaryFile) {
      if (!wasmBinary) {
        try {
          var response = await readAsync(binaryFile);
          return new Uint8Array(response);
        } catch {
        }
      }
      return getBinarySync(binaryFile);
    }
    async function instantiateArrayBuffer(binaryFile, imports) {
      try {
        var binary = await getWasmBinary(binaryFile);
        var instance = await WebAssembly.instantiate(binary, imports);
        return instance;
      } catch (reason) {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        abort(reason);
      }
    }
    async function instantiateAsync(binary, binaryFile, imports) {
      if (!binary) {
        try {
          var response = fetch(binaryFile, { credentials: "same-origin" });
          var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
          return instantiationResult;
        } catch (reason) {
          err(`wasm streaming compile failed: ${reason}`);
          err("falling back to ArrayBuffer instantiation");
        }
      }
      return instantiateArrayBuffer(binaryFile, imports);
    }
    function getWasmImports() {
      return { a: wasmImports };
    }
    async function createWasm() {
      function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        wasmMemory = wasmExports["Ac"];
        updateMemoryViews();
        wasmTable = wasmExports["Dc"];
        assignWasmExports(wasmExports);
        return wasmExports;
      }
      function receiveInstantiationResult(result2) {
        return receiveInstance(result2["instance"]);
      }
      var info = getWasmImports();
      if (Module["instantiateWasm"]) {
        return new Promise((resolve, reject) => {
          Module["instantiateWasm"](info, (mod, inst) => {
            resolve(receiveInstance(mod));
          });
        });
      }
      wasmBinaryFile ?? (wasmBinaryFile = findWasmBinary());
      var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
      var exports = receiveInstantiationResult(result);
      return exports;
    }
    var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    };
    var onPostRuns = [];
    var addOnPostRun = (cb) => onPostRuns.push(cb);
    var onPreRuns = [];
    var addOnPreRun = (cb) => onPreRuns.push(cb);
    class ExceptionInfo {
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
      set_type(type) {
        HEAPU32[this.ptr + 4 >> 2] = type;
      }
      get_type() {
        return HEAPU32[this.ptr + 4 >> 2];
      }
      set_destructor(destructor) {
        HEAPU32[this.ptr + 8 >> 2] = destructor;
      }
      get_destructor() {
        return HEAPU32[this.ptr + 8 >> 2];
      }
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[this.ptr + 12] = caught;
      }
      get_caught() {
        return HEAP8[this.ptr + 12] != 0;
      }
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[this.ptr + 13] = rethrown;
      }
      get_rethrown() {
        return HEAP8[this.ptr + 13] != 0;
      }
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
      }
      get_adjusted_ptr() {
        return HEAPU32[this.ptr + 16 >> 2];
      }
    }
    var exceptionLast = 0;
    var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      info.init(type, destructor);
      exceptionLast = ptr;
      throw exceptionLast;
    };
    var syscallGetVarargI = () => {
      var ret = HEAP32[+SYSCALLS.varargs >> 2];
      SYSCALLS.varargs += 4;
      return ret;
    };
    var syscallGetVarargP = syscallGetVarargI;
    var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return splitPathRe.exec(filename).slice(1);
    }, normalizeArray: (parts, allowAboveRoot) => {
      var up = 0;
      for (var i2 = parts.length - 1; i2 >= 0; i2--) {
        var last = parts[i2];
        if (last === ".") {
          parts.splice(i2, 1);
        } else if (last === "..") {
          parts.splice(i2, 1);
          up++;
        } else if (up) {
          parts.splice(i2, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift("..");
        }
      }
      return parts;
    }, normalize: (path) => {
      var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
      path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
      if (!path && !isAbsolute) {
        path = ".";
      }
      if (path && trailingSlash) {
        path += "/";
      }
      return (isAbsolute ? "/" : "") + path;
    }, dirname: (path) => {
      var result = PATH.splitPath(path), root = result[0], dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.slice(0, -1);
      }
      return root + dir;
    }, basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1], join: (...paths) => PATH.normalize(paths.join("/")), join2: (l, r) => PATH.normalize(l + "/" + r) };
    var initRandomFill = () => (view) => crypto.getRandomValues(view);
    var randomFill = (view) => {
      (randomFill = initRandomFill())(view);
    };
    var PATH_FS = { resolve: (...args) => {
      var resolvedPath = "", resolvedAbsolute = false;
      for (var i2 = args.length - 1; i2 >= -1 && !resolvedAbsolute; i2--) {
        var path = i2 >= 0 ? args[i2] : FS.cwd();
        if (typeof path != "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!path) {
          return "";
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = PATH.isAbs(path);
      }
      resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    }, relative: (from, to) => {
      from = PATH_FS.resolve(from).slice(1);
      to = PATH_FS.resolve(to).slice(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== "")
            break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== "")
            break;
        }
        if (start > end)
          return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split("/"));
      var toParts = trim(to.split("/"));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i2 = 0; i2 < length; i2++) {
        if (fromParts[i2] !== toParts[i2]) {
          samePartsLength = i2;
          break;
        }
      }
      var outputParts = [];
      for (var i2 = samePartsLength; i2 < fromParts.length; i2++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    } };
    var UTF8Decoder = new TextDecoder();
    var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul)
        return maxIdx;
      while (heapOrArray[idx] && !(idx >= maxIdx))
        ++idx;
      return idx;
    };
    var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
      return UTF8Decoder.decode(heapOrArray.buffer ? heapOrArray.subarray(idx, endPtr) : new Uint8Array(heapOrArray.slice(idx, endPtr)));
    };
    var FS_stdin_getChar_buffer = [];
    var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var c = str.charCodeAt(i2);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i2;
        } else {
          len += 3;
        }
      }
      return len;
    };
    var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      if (!(maxBytesToWrite > 0))
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var u = str.codePointAt(i2);
        if (u <= 127) {
          if (outIdx >= endIdx)
            break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx)
            break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx)
            break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx)
            break;
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
          i2++;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
    var intArrayFromString = (stringy, dontAddNull, length) => {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull)
        u8array.length = numBytesWritten;
      return u8array;
    };
    var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (typeof window != "undefined" && typeof window.prompt == "function") {
          result = window.prompt("Input: ");
          if (result !== null) {
            result += "\n";
          }
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
    var TTY = { ttys: [], init() {
    }, shutdown() {
    }, register(dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops };
      FS.registerDevice(dev, TTY.stream_ops);
    }, stream_ops: { open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    }, close(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    }, read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i2 = 0; i2 < length; i2++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === void 0 && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === void 0)
          break;
        bytesRead++;
        buffer[offset + i2] = result;
      }
      if (bytesRead) {
        stream.node.atime = Date.now();
      }
      return bytesRead;
    }, write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i2 = 0; i2 < length; i2++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i2]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.mtime = stream.node.ctime = Date.now();
      }
      return i2;
    } }, default_tty_ops: { get_char(tty) {
      return FS_stdin_getChar();
    }, put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0)
          tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output?.length > 0) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    }, ioctl_tcgets(tty) {
      return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
    }, ioctl_tcsets(tty, optional_actions, data) {
      return 0;
    }, ioctl_tiocgwinsz(tty) {
      return [24, 80];
    } }, default_tty1_ops: { put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0)
          tty.output.push(val);
      }
    }, fsync(tty) {
      if (tty.output?.length > 0) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    } } };
    var mmapAlloc = (size) => {
      abort();
    };
    var MEMFS = { ops_table: null, mount(mount) {
      return MEMFS.createNode(null, "/", 16895, 0);
    }, createNode(parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63);
      }
      MEMFS.ops_table || (MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } });
      var node = FS.createNode(parent, name, mode, dev);
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node;
        node.stream_ops = MEMFS.ops_table.dir.stream;
        node.contents = {};
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node;
        node.stream_ops = MEMFS.ops_table.file.stream;
        node.usedBytes = 0;
        node.contents = null;
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node;
        node.stream_ops = MEMFS.ops_table.link.stream;
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node;
        node.stream_ops = MEMFS.ops_table.chrdev.stream;
      }
      node.atime = node.mtime = node.ctime = Date.now();
      if (parent) {
        parent.contents[name] = node;
        parent.atime = parent.mtime = parent.ctime = node.atime;
      }
      return node;
    }, getFileDataAsTypedArray(node) {
      if (!node.contents)
        return new Uint8Array(0);
      if (node.contents.subarray)
        return node.contents.subarray(0, node.usedBytes);
      return new Uint8Array(node.contents);
    }, expandFileStorage(node, newCapacity) {
      var prevCapacity = node.contents ? node.contents.length : 0;
      if (prevCapacity >= newCapacity)
        return;
      var CAPACITY_DOUBLING_MAX = 1024 * 1024;
      newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
      if (prevCapacity != 0)
        newCapacity = Math.max(newCapacity, 256);
      var oldContents = node.contents;
      node.contents = new Uint8Array(newCapacity);
      if (node.usedBytes > 0)
        node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
    }, resizeFileStorage(node, newSize) {
      if (node.usedBytes == newSize)
        return;
      if (newSize == 0) {
        node.contents = null;
        node.usedBytes = 0;
      } else {
        var oldContents = node.contents;
        node.contents = new Uint8Array(newSize);
        if (oldContents) {
          node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
        }
        node.usedBytes = newSize;
      }
    }, node_ops: { getattr(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.atime);
      attr.mtime = new Date(node.mtime);
      attr.ctime = new Date(node.ctime);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    }, setattr(node, attr) {
      for (const key of ["mode", "atime", "mtime", "ctime"]) {
        if (attr[key] != null) {
          node[key] = attr[key];
        }
      }
      if (attr.size !== void 0) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    }, lookup(parent, name) {
      if (!MEMFS.doesNotExistError) {
        MEMFS.doesNotExistError = new FS.ErrnoError(44);
        MEMFS.doesNotExistError.stack = "<generic error, no stack>";
      }
      throw MEMFS.doesNotExistError;
    }, mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    }, rename(old_node, new_dir, new_name) {
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (new_node) {
        if (FS.isDir(old_node.mode)) {
          for (var i2 in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
        FS.hashRemoveNode(new_node);
      }
      delete old_node.parent.contents[old_node.name];
      new_dir.contents[new_name] = old_node;
      old_node.name = new_name;
      new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
    }, unlink(parent, name) {
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    }, rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i2 in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    }, readdir(node) {
      return [".", "..", ...Object.keys(node.contents)];
    }, symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    }, readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    } }, stream_ops: { read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes)
        return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i2 = 0; i2 < size; i2++)
          buffer[offset + i2] = contents[position + i2];
      }
      return size;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length)
        return 0;
      var node = stream.node;
      node.mtime = node.ctime = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = buffer.slice(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) {
        node.contents.set(buffer.subarray(offset, offset + length), position);
      } else {
        for (var i2 = 0; i2 < length; i2++) {
          node.contents[position + i2] = buffer[offset + i2];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    }, llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    }, mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        allocated = true;
        ptr = mmapAlloc();
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        if (contents) {
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length);
            }
          }
          HEAP8.set(contents, ptr);
        }
      }
      return { ptr, allocated };
    }, msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      return 0;
    } } };
    var FS_modeStringToFlags = (str) => {
      var flagModes = { r: 0, "r+": 2, w: 512 | 64 | 1, "w+": 512 | 64 | 2, a: 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
      var flags = flagModes[str];
      if (typeof flags == "undefined") {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
    var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead)
        mode |= 292 | 73;
      if (canWrite)
        mode |= 146;
      return mode;
    };
    var asyncLoad = async (url) => {
      var arrayBuffer = await readAsync(url);
      return new Uint8Array(arrayBuffer);
    };
    var FS_createDataFile = (...args) => FS.createDataFile(...args);
    var runDependencies = 0;
    var dependenciesFulfilled = null;
    var removeRunDependency = (id) => {
      runDependencies--;
      Module["monitorRunDependencies"]?.(runDependencies);
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    };
    var addRunDependency = (id) => {
      runDependencies++;
      Module["monitorRunDependencies"]?.(runDependencies);
    };
    var preloadPlugins = [];
    var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
      if (typeof Browser != "undefined")
        Browser.init();
      for (var plugin of preloadPlugins) {
        if (plugin["canHandle"](fullname)) {
          return plugin["handle"](byteArray, fullname);
        }
      }
      return byteArray;
    };
    var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      addRunDependency();
      try {
        var byteArray = url;
        if (typeof url == "string") {
          byteArray = await asyncLoad(url);
        }
        byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
        preFinish?.();
        if (!dontCreateFile) {
          FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
        }
      } finally {
        removeRunDependency();
      }
    };
    var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
    };
    var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, filesystems: null, syncFSRequests: 0, readFiles: {}, ErrnoError: class {
      constructor(errno) {
        __publicField(this, "name", "ErrnoError");
        this.errno = errno;
      }
    }, FSStream: class {
      constructor() {
        __publicField(this, "shared", {});
      }
      get object() {
        return this.node;
      }
      set object(val) {
        this.node = val;
      }
      get isRead() {
        return (this.flags & 2097155) !== 1;
      }
      get isWrite() {
        return (this.flags & 2097155) !== 0;
      }
      get isAppend() {
        return this.flags & 1024;
      }
      get flags() {
        return this.shared.flags;
      }
      set flags(val) {
        this.shared.flags = val;
      }
      get position() {
        return this.shared.position;
      }
      set position(val) {
        this.shared.position = val;
      }
    }, FSNode: class {
      constructor(parent, name, mode, rdev) {
        __publicField(this, "node_ops", {});
        __publicField(this, "stream_ops", {});
        __publicField(this, "readMode", 292 | 73);
        __publicField(this, "writeMode", 146);
        __publicField(this, "mounted", null);
        if (!parent) {
          parent = this;
        }
        this.parent = parent;
        this.mount = parent.mount;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.rdev = rdev;
        this.atime = this.mtime = this.ctime = Date.now();
      }
      get read() {
        return (this.mode & this.readMode) === this.readMode;
      }
      set read(val) {
        val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
      }
      get write() {
        return (this.mode & this.writeMode) === this.writeMode;
      }
      set write(val) {
        val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
      }
      get isFolder() {
        return FS.isDir(this.mode);
      }
      get isDevice() {
        return FS.isChrdev(this.mode);
      }
    }, lookupPath(path, opts = {}) {
      if (!path) {
        throw new FS.ErrnoError(44);
      }
      opts.follow_mount ?? (opts.follow_mount = true);
      if (!PATH.isAbs(path)) {
        path = FS.cwd() + "/" + path;
      }
      linkloop:
        for (var nlinks = 0; nlinks < 40; nlinks++) {
          var parts = path.split("/").filter((p) => !!p);
          var current = FS.root;
          var current_path = "/";
          for (var i2 = 0; i2 < parts.length; i2++) {
            var islast = i2 === parts.length - 1;
            if (islast && opts.parent) {
              break;
            }
            if (parts[i2] === ".") {
              continue;
            }
            if (parts[i2] === "..") {
              current_path = PATH.dirname(current_path);
              if (FS.isRoot(current)) {
                path = current_path + "/" + parts.slice(i2 + 1).join("/");
                nlinks--;
                continue linkloop;
              } else {
                current = current.parent;
              }
              continue;
            }
            current_path = PATH.join2(current_path, parts[i2]);
            try {
              current = FS.lookupNode(current, parts[i2]);
            } catch (e) {
              if (e?.errno === 44 && islast && opts.noent_okay) {
                return { path: current_path };
              }
              throw e;
            }
            if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
              current = current.mounted.root;
            }
            if (FS.isLink(current.mode) && (!islast || opts.follow)) {
              if (!current.node_ops.readlink) {
                throw new FS.ErrnoError(52);
              }
              var link = current.node_ops.readlink(current);
              if (!PATH.isAbs(link)) {
                link = PATH.dirname(current_path) + "/" + link;
              }
              path = link + "/" + parts.slice(i2 + 1).join("/");
              continue linkloop;
            }
          }
          return { path: current_path, node: current };
        }
      throw new FS.ErrnoError(32);
    }, getPath(node) {
      var path;
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint;
          if (!path)
            return mount;
          return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
        }
        path = path ? `${node.name}/${path}` : node.name;
        node = node.parent;
      }
    }, hashName(parentid, name) {
      var hash = 0;
      for (var i2 = 0; i2 < name.length; i2++) {
        hash = (hash << 5) - hash + name.charCodeAt(i2) | 0;
      }
      return (parentid + hash >>> 0) % FS.nameTable.length;
    }, hashAddNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      node.name_next = FS.nameTable[hash];
      FS.nameTable[hash] = node;
    }, hashRemoveNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next;
      } else {
        var current = FS.nameTable[hash];
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next;
            break;
          }
          current = current.name_next;
        }
      }
    }, lookupNode(parent, name) {
      var errCode = FS.mayLookup(parent);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      var hash = FS.hashName(parent.id, name);
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name;
        if (node.parent.id === parent.id && nodeName === name) {
          return node;
        }
      }
      return FS.lookup(parent, name);
    }, createNode(parent, name, mode, rdev) {
      var node = new FS.FSNode(parent, name, mode, rdev);
      FS.hashAddNode(node);
      return node;
    }, destroyNode(node) {
      FS.hashRemoveNode(node);
    }, isRoot(node) {
      return node === node.parent;
    }, isMountpoint(node) {
      return !!node.mounted;
    }, isFile(mode) {
      return (mode & 61440) === 32768;
    }, isDir(mode) {
      return (mode & 61440) === 16384;
    }, isLink(mode) {
      return (mode & 61440) === 40960;
    }, isChrdev(mode) {
      return (mode & 61440) === 8192;
    }, isBlkdev(mode) {
      return (mode & 61440) === 24576;
    }, isFIFO(mode) {
      return (mode & 61440) === 4096;
    }, isSocket(mode) {
      return (mode & 49152) === 49152;
    }, flagsToPermissionString(flag) {
      var perms = ["r", "w", "rw"][flag & 3];
      if (flag & 512) {
        perms += "w";
      }
      return perms;
    }, nodePermissions(node, perms) {
      if (FS.ignorePermissions) {
        return 0;
      }
      if (perms.includes("r") && !(node.mode & 292)) {
        return 2;
      } else if (perms.includes("w") && !(node.mode & 146)) {
        return 2;
      } else if (perms.includes("x") && !(node.mode & 73)) {
        return 2;
      }
      return 0;
    }, mayLookup(dir) {
      if (!FS.isDir(dir.mode))
        return 54;
      var errCode = FS.nodePermissions(dir, "x");
      if (errCode)
        return errCode;
      if (!dir.node_ops.lookup)
        return 2;
      return 0;
    }, mayCreate(dir, name) {
      if (!FS.isDir(dir.mode)) {
        return 54;
      }
      try {
        var node = FS.lookupNode(dir, name);
        return 20;
      } catch (e) {
      }
      return FS.nodePermissions(dir, "wx");
    }, mayDelete(dir, name, isdir) {
      var node;
      try {
        node = FS.lookupNode(dir, name);
      } catch (e) {
        return e.errno;
      }
      var errCode = FS.nodePermissions(dir, "wx");
      if (errCode) {
        return errCode;
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54;
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10;
        }
      } else {
        if (FS.isDir(node.mode)) {
          return 31;
        }
      }
      return 0;
    }, mayOpen(node, flags) {
      if (!node) {
        return 44;
      }
      if (FS.isLink(node.mode)) {
        return 32;
      } else if (FS.isDir(node.mode)) {
        if (FS.flagsToPermissionString(flags) !== "r" || flags & (512 | 64)) {
          return 31;
        }
      }
      return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
    }, checkOpExists(op, err2) {
      if (!op) {
        throw new FS.ErrnoError(err2);
      }
      return op;
    }, MAX_OPEN_FDS: 4096, nextfd() {
      for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
        if (!FS.streams[fd]) {
          return fd;
        }
      }
      throw new FS.ErrnoError(33);
    }, getStreamChecked(fd) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      return stream;
    }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
      stream = Object.assign(new FS.FSStream(), stream);
      if (fd == -1) {
        fd = FS.nextfd();
      }
      stream.fd = fd;
      FS.streams[fd] = stream;
      return stream;
    }, closeStream(fd) {
      FS.streams[fd] = null;
    }, dupStream(origStream, fd = -1) {
      var stream = FS.createStream(origStream, fd);
      stream.stream_ops?.dup?.(stream);
      return stream;
    }, doSetAttr(stream, node, attr) {
      var setattr = stream?.stream_ops.setattr;
      var arg = setattr ? stream : node;
      setattr ?? (setattr = node.node_ops.setattr);
      FS.checkOpExists(setattr, 63);
      setattr(arg, attr);
    }, chrdev_stream_ops: { open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      stream.stream_ops.open?.(stream);
    }, llseek() {
      throw new FS.ErrnoError(70);
    } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
      FS.devices[dev] = { stream_ops: ops };
    }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
      var mounts = [];
      var check = [mount];
      while (check.length) {
        var m = check.pop();
        mounts.push(m);
        check.push(...m.mounts);
      }
      return mounts;
    }, syncfs(populate, callback) {
      if (typeof populate == "function") {
        callback = populate;
        populate = false;
      }
      FS.syncFSRequests++;
      if (FS.syncFSRequests > 1) {
        err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      }
      var mounts = FS.getMounts(FS.root.mount);
      var completed = 0;
      function doCallback(errCode) {
        FS.syncFSRequests--;
        return callback(errCode);
      }
      function done(errCode) {
        if (errCode) {
          if (!done.errored) {
            done.errored = true;
            return doCallback(errCode);
          }
          return;
        }
        if (++completed >= mounts.length) {
          doCallback(null);
        }
      }
      mounts.forEach((mount) => {
        if (!mount.type.syncfs) {
          return done(null);
        }
        mount.type.syncfs(mount, populate, done);
      });
    }, mount(type, opts, mountpoint) {
      var root = mountpoint === "/";
      var pseudo = !mountpoint;
      var node;
      if (root && FS.root) {
        throw new FS.ErrnoError(10);
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        mountpoint = lookup.path;
        node = lookup.node;
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
      }
      var mount = { type, opts, mountpoint, mounts: [] };
      var mountRoot = type.mount(mount);
      mountRoot.mount = mount;
      mount.root = mountRoot;
      if (root) {
        FS.root = mountRoot;
      } else if (node) {
        node.mounted = mount;
        if (node.mount) {
          node.mount.mounts.push(mount);
        }
      }
      return mountRoot;
    }, unmount(mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28);
      }
      var node = lookup.node;
      var mount = node.mounted;
      var mounts = FS.getMounts(mount);
      Object.keys(FS.nameTable).forEach((hash) => {
        var current = FS.nameTable[hash];
        while (current) {
          var next = current.name_next;
          if (mounts.includes(current.mount)) {
            FS.destroyNode(current);
          }
          current = next;
        }
      });
      node.mounted = null;
      var idx = node.mount.mounts.indexOf(mount);
      node.mount.mounts.splice(idx, 1);
    }, lookup(parent, name) {
      return parent.node_ops.lookup(parent, name);
    }, mknod(path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      if (!name) {
        throw new FS.ErrnoError(28);
      }
      if (name === "." || name === "..") {
        throw new FS.ErrnoError(20);
      }
      var errCode = FS.mayCreate(parent, name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.mknod(parent, name, mode, dev);
    }, statfs(path) {
      return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
    }, statfsStream(stream) {
      return FS.statfsNode(stream.node);
    }, statfsNode(node) {
      var rtn = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
      if (node.node_ops.statfs) {
        Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
      }
      return rtn;
    }, create(path, mode = 438) {
      mode &= 4095;
      mode |= 32768;
      return FS.mknod(path, mode, 0);
    }, mkdir(path, mode = 511) {
      mode &= 511 | 512;
      mode |= 16384;
      return FS.mknod(path, mode, 0);
    }, mkdirTree(path, mode) {
      var dirs = path.split("/");
      var d = "";
      for (var dir of dirs) {
        if (!dir)
          continue;
        if (d || PATH.isAbs(path))
          d += "/";
        d += dir;
        try {
          FS.mkdir(d, mode);
        } catch (e) {
          if (e.errno != 20)
            throw e;
        }
      }
    }, mkdev(path, mode, dev) {
      if (typeof dev == "undefined") {
        dev = mode;
        mode = 438;
      }
      mode |= 8192;
      return FS.mknod(path, mode, dev);
    }, symlink(oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44);
      }
      var lookup = FS.lookupPath(newpath, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var newname = PATH.basename(newpath);
      var errCode = FS.mayCreate(parent, newname);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.symlink(parent, newname, oldpath);
    }, rename(old_path, new_path) {
      var old_dirname = PATH.dirname(old_path);
      var new_dirname = PATH.dirname(new_path);
      var old_name = PATH.basename(old_path);
      var new_name = PATH.basename(new_path);
      var lookup, old_dir, new_dir;
      lookup = FS.lookupPath(old_path, { parent: true });
      old_dir = lookup.node;
      lookup = FS.lookupPath(new_path, { parent: true });
      new_dir = lookup.node;
      if (!old_dir || !new_dir)
        throw new FS.ErrnoError(44);
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75);
      }
      var old_node = FS.lookupNode(old_dir, old_name);
      var relative = PATH_FS.relative(old_path, new_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(28);
      }
      relative = PATH_FS.relative(new_path, old_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(55);
      }
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (old_node === new_node) {
        return;
      }
      var isdir = FS.isDir(old_node.mode);
      var errCode = FS.mayDelete(old_dir, old_name, isdir);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
        throw new FS.ErrnoError(10);
      }
      if (new_dir !== old_dir) {
        errCode = FS.nodePermissions(old_dir, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      FS.hashRemoveNode(old_node);
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name);
        old_node.parent = new_dir;
      } catch (e) {
        throw e;
      } finally {
        FS.hashAddNode(old_node);
      }
    }, rmdir(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, true);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.rmdir(parent, name);
      FS.destroyNode(node);
    }, readdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
      return readdir(node);
    }, unlink(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, false);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.unlink(parent, name);
      FS.destroyNode(node);
    }, readlink(path) {
      var lookup = FS.lookupPath(path);
      var link = lookup.node;
      if (!link) {
        throw new FS.ErrnoError(44);
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28);
      }
      return link.node_ops.readlink(link);
    }, stat(path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      var node = lookup.node;
      var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
      return getattr(node);
    }, fstat(fd) {
      var stream = FS.getStreamChecked(fd);
      var node = stream.node;
      var getattr = stream.stream_ops.getattr;
      var arg = getattr ? stream : node;
      getattr ?? (getattr = node.node_ops.getattr);
      FS.checkOpExists(getattr, 63);
      return getattr(arg);
    }, lstat(path) {
      return FS.stat(path, true);
    }, doChmod(stream, node, mode, dontFollow) {
      FS.doSetAttr(stream, node, { mode: mode & 4095 | node.mode & ~4095, ctime: Date.now(), dontFollow });
    }, chmod(path, mode, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doChmod(null, node, mode, dontFollow);
    }, lchmod(path, mode) {
      FS.chmod(path, mode, true);
    }, fchmod(fd, mode) {
      var stream = FS.getStreamChecked(fd);
      FS.doChmod(stream, stream.node, mode, false);
    }, doChown(stream, node, dontFollow) {
      FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
    }, chown(path, uid, gid, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doChown(null, node, dontFollow);
    }, lchown(path, uid, gid) {
      FS.chown(path, uid, gid, true);
    }, fchown(fd, uid, gid) {
      var stream = FS.getStreamChecked(fd);
      FS.doChown(stream, stream.node, false);
    }, doTruncate(stream, node, len) {
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      var errCode = FS.nodePermissions(node, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
    }, truncate(path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28);
      }
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doTruncate(null, node, len);
    }, ftruncate(fd, len) {
      var stream = FS.getStreamChecked(fd);
      if (len < 0 || (stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28);
      }
      FS.doTruncate(stream, stream.node, len);
    }, utime(path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
      setattr(node, { atime, mtime });
    }, open(path, flags, mode = 438) {
      if (path === "") {
        throw new FS.ErrnoError(44);
      }
      flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
      if (flags & 64) {
        mode = mode & 4095 | 32768;
      } else {
        mode = 0;
      }
      var node;
      var isDirPath;
      if (typeof path == "object") {
        node = path;
      } else {
        isDirPath = path.endsWith("/");
        var lookup = FS.lookupPath(path, { follow: !(flags & 131072), noent_okay: true });
        node = lookup.node;
        path = lookup.path;
      }
      var created = false;
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20);
          }
        } else if (isDirPath) {
          throw new FS.ErrnoError(31);
        } else {
          node = FS.mknod(path, mode | 511, 0);
          created = true;
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512;
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
      if (!created) {
        var errCode = FS.mayOpen(node, flags);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      if (flags & 512 && !created) {
        FS.truncate(node, 0);
      }
      flags &= ~(128 | 512 | 131072);
      var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
      if (created) {
        FS.chmod(node, mode & 511);
      }
      if (Module["logReadFiles"] && !(flags & 1)) {
        if (!(path in FS.readFiles)) {
          FS.readFiles[path] = 1;
        }
      }
      return stream;
    }, close(stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (stream.getdents)
        stream.getdents = null;
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream);
        }
      } catch (e) {
        throw e;
      } finally {
        FS.closeStream(stream.fd);
      }
      stream.fd = null;
    }, isClosed(stream) {
      return stream.fd === null;
    }, llseek(stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70);
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28);
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence);
      stream.ungotten = [];
      return stream.position;
    }, read(stream, buffer, offset, length, position) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
      if (!seeking)
        stream.position += bytesRead;
      return bytesRead;
    }, write(stream, buffer, offset, length, position, canOwn) {
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28);
      }
      if (stream.seekable && stream.flags & 1024) {
        FS.llseek(stream, 0, 2);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
      if (!seeking)
        stream.position += bytesWritten;
      return bytesWritten;
    }, mmap(stream, length, position, prot, flags) {
      if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
        throw new FS.ErrnoError(2);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2);
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43);
      }
      if (!length) {
        throw new FS.ErrnoError(28);
      }
      return stream.stream_ops.mmap(stream, length, position, prot, flags);
    }, msync(stream, buffer, offset, length, mmapFlags) {
      if (!stream.stream_ops.msync) {
        return 0;
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
    }, ioctl(stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59);
      }
      return stream.stream_ops.ioctl(stream, cmd, arg);
    }, readFile(path, opts = {}) {
      opts.flags = opts.flags || 0;
      opts.encoding = opts.encoding || "binary";
      if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
        throw new Error(`Invalid encoding type "${opts.encoding}"`);
      }
      var stream = FS.open(path, opts.flags);
      var stat = FS.stat(path);
      var length = stat.size;
      var buf = new Uint8Array(length);
      FS.read(stream, buf, 0, length, 0);
      if (opts.encoding === "utf8") {
        buf = UTF8ArrayToString(buf);
      }
      FS.close(stream);
      return buf;
    }, writeFile(path, data, opts = {}) {
      opts.flags = opts.flags || 577;
      var stream = FS.open(path, opts.flags, opts.mode);
      if (typeof data == "string") {
        data = new Uint8Array(intArrayFromString(data, true));
      }
      if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
      } else {
        throw new Error("Unsupported data type");
      }
      FS.close(stream);
    }, cwd: () => FS.currentPath, chdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      if (lookup.node === null) {
        throw new FS.ErrnoError(44);
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54);
      }
      var errCode = FS.nodePermissions(lookup.node, "x");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.currentPath = lookup.path;
    }, createDefaultDirectories() {
      FS.mkdir("/tmp");
      FS.mkdir("/home");
      FS.mkdir("/home/web_user");
    }, createDefaultDevices() {
      FS.mkdir("/dev");
      FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length, llseek: () => 0 });
      FS.mkdev("/dev/null", FS.makedev(1, 3));
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
      FS.mkdev("/dev/tty", FS.makedev(5, 0));
      FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var randomBuffer = new Uint8Array(1024), randomLeft = 0;
      var randomByte = () => {
        if (randomLeft === 0) {
          randomFill(randomBuffer);
          randomLeft = randomBuffer.byteLength;
        }
        return randomBuffer[--randomLeft];
      };
      FS.createDevice("/dev", "random", randomByte);
      FS.createDevice("/dev", "urandom", randomByte);
      FS.mkdir("/dev/shm");
      FS.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories() {
      FS.mkdir("/proc");
      var proc_self = FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd");
      FS.mount({ mount() {
        var node = FS.createNode(proc_self, "fd", 16895, 73);
        node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
        node.node_ops = { lookup(parent, name) {
          var fd = +name;
          var stream = FS.getStreamChecked(fd);
          var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path }, id: fd + 1 };
          ret.parent = ret;
          return ret;
        }, readdir() {
          return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
        } };
        return node;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams(input, output, error) {
      if (input) {
        FS.createDevice("/dev", "stdin", input);
      } else {
        FS.symlink("/dev/tty", "/dev/stdin");
      }
      if (output) {
        FS.createDevice("/dev", "stdout", null, output);
      } else {
        FS.symlink("/dev/tty", "/dev/stdout");
      }
      if (error) {
        FS.createDevice("/dev", "stderr", null, error);
      } else {
        FS.symlink("/dev/tty1", "/dev/stderr");
      }
      FS.open("/dev/stdin", 0);
      FS.open("/dev/stdout", 1);
      FS.open("/dev/stderr", 1);
    }, staticInit() {
      FS.nameTable = new Array(4096);
      FS.mount(MEMFS, {}, "/");
      FS.createDefaultDirectories();
      FS.createDefaultDevices();
      FS.createSpecialDirectories();
      FS.filesystems = { MEMFS };
    }, init(input, output, error) {
      FS.initialized = true;
      input ?? (input = Module["stdin"]);
      output ?? (output = Module["stdout"]);
      error ?? (error = Module["stderr"]);
      FS.createStandardStreams(input, output, error);
    }, quit() {
      FS.initialized = false;
      for (var stream of FS.streams) {
        if (stream) {
          FS.close(stream);
        }
      }
    }, findObject(path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink);
      if (!ret.exists) {
        return null;
      }
      return ret.object;
    }, analyzePath(path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        path = lookup.path;
      } catch (e) {
      }
      var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
      try {
        var lookup = FS.lookupPath(path, { parent: true });
        ret.parentExists = true;
        ret.parentPath = lookup.path;
        ret.parentObject = lookup.node;
        ret.name = PATH.basename(path);
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        ret.exists = true;
        ret.path = lookup.path;
        ret.object = lookup.node;
        ret.name = lookup.node.name;
        ret.isRoot = lookup.path === "/";
      } catch (e) {
        ret.error = e.errno;
      }
      return ret;
    }, createPath(parent, path, canRead, canWrite) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      var parts = path.split("/").reverse();
      while (parts.length) {
        var part = parts.pop();
        if (!part)
          continue;
        var current = PATH.join2(parent, part);
        try {
          FS.mkdir(current);
        } catch (e) {
          if (e.errno != 20)
            throw e;
        }
        parent = current;
      }
      return current;
    }, createFile(parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(canRead, canWrite);
      return FS.create(path, mode);
    }, createDataFile(parent, name, data, canRead, canWrite, canOwn) {
      var path = name;
      if (parent) {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        path = name ? PATH.join2(parent, name) : parent;
      }
      var mode = FS_getMode(canRead, canWrite);
      var node = FS.create(path, mode);
      if (data) {
        if (typeof data == "string") {
          var arr = new Array(data.length);
          for (var i2 = 0, len = data.length; i2 < len; ++i2)
            arr[i2] = data.charCodeAt(i2);
          data = arr;
        }
        FS.chmod(node, mode | 146);
        var stream = FS.open(node, 577);
        FS.write(stream, data, 0, data.length, 0, canOwn);
        FS.close(stream);
        FS.chmod(node, mode);
      }
    }, createDevice(parent, name, input, output) {
      var _a;
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(!!input, !!output);
      (_a = FS.createDevice).major ?? (_a.major = 64);
      var dev = FS.makedev(FS.createDevice.major++, 0);
      FS.registerDevice(dev, { open(stream) {
        stream.seekable = false;
      }, close(stream) {
        if (output?.buffer?.length) {
          output(10);
        }
      }, read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i2 = 0; i2 < length; i2++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === void 0 && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === void 0)
            break;
          bytesRead++;
          buffer[offset + i2] = result;
        }
        if (bytesRead) {
          stream.node.atime = Date.now();
        }
        return bytesRead;
      }, write(stream, buffer, offset, length, pos) {
        for (var i2 = 0; i2 < length; i2++) {
          try {
            output(buffer[offset + i2]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.mtime = stream.node.ctime = Date.now();
        }
        return i2;
      } });
      return FS.mkdev(path, mode, dev);
    }, forceLoadFile(obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
        return true;
      if (typeof XMLHttpRequest != "undefined") {
        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      } else {
        try {
          obj.contents = readBinary(obj.url);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
      }
    }, createLazyFile(parent, name, url, canRead, canWrite) {
      class LazyUint8Array {
        constructor() {
          __publicField(this, "lengthKnown", false);
          __publicField(this, "chunks", []);
        }
        get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return void 0;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = idx / this.chunkSize | 0;
          return this.getter(chunkNum)[chunkOffset];
        }
        setDataGetter(getter) {
          this.getter = getter;
        }
        cacheLength() {
          var xhr = new XMLHttpRequest();
          xhr.open("HEAD", url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
            throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
          var chunkSize = 1024 * 1024;
          if (!hasByteServing)
            chunkSize = datalength;
          var doXHR = (from, to) => {
            if (from > to)
              throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength - 1)
              throw new Error("only " + datalength + " bytes available! programmer error!");
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url, false);
            if (datalength !== chunkSize)
              xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
            xhr2.responseType = "arraybuffer";
            if (xhr2.overrideMimeType) {
              xhr2.overrideMimeType("text/plain; charset=x-user-defined");
            }
            xhr2.send(null);
            if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
              throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
            if (xhr2.response !== void 0) {
              return new Uint8Array(xhr2.response || []);
            }
            return intArrayFromString(xhr2.responseText || "", true);
          };
          var lazyArray2 = this;
          lazyArray2.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum + 1) * chunkSize - 1;
            end = Math.min(end, datalength - 1);
            if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
              lazyArray2.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray2.chunks[chunkNum] == "undefined")
              throw new Error("doXHR failed!");
            return lazyArray2.chunks[chunkNum];
          });
          if (usesGzip || !datalength) {
            chunkSize = datalength = 1;
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        get length() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._length;
        }
        get chunkSize() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._chunkSize;
        }
      }
      if (typeof XMLHttpRequest != "undefined") {
        if (!ENVIRONMENT_IS_WORKER)
          throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var lazyArray = new LazyUint8Array();
        var properties = { isDevice: false, contents: lazyArray };
      } else {
        var properties = { isDevice: false, url };
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite);
      if (properties.contents) {
        node.contents = properties.contents;
      } else if (properties.url) {
        node.contents = null;
        node.url = properties.url;
      }
      Object.defineProperties(node, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var stream_ops = {};
      var keys = Object.keys(node.stream_ops);
      keys.forEach((key) => {
        var fn = node.stream_ops[key];
        stream_ops[key] = (...args) => {
          FS.forceLoadFile(node);
          return fn(...args);
        };
      });
      function writeChunks(stream, buffer, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= contents.length)
          return 0;
        var size = Math.min(contents.length - position, length);
        if (contents.slice) {
          for (var i2 = 0; i2 < size; i2++) {
            buffer[offset + i2] = contents[position + i2];
          }
        } else {
          for (var i2 = 0; i2 < size; i2++) {
            buffer[offset + i2] = contents.get(position + i2);
          }
        }
        return size;
      }
      stream_ops.read = (stream, buffer, offset, length, position) => {
        FS.forceLoadFile(node);
        return writeChunks(stream, buffer, offset, length, position);
      };
      stream_ops.mmap = (stream, length, position, prot, flags) => {
        FS.forceLoadFile(node);
        var ptr = mmapAlloc();
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        writeChunks(stream, HEAP8, ptr, length, position);
        return { ptr, allocated: true };
      };
      node.stream_ops = stream_ops;
      return node;
    } };
    var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
      if (!ptr)
        return "";
      var end = findStringEnd(HEAPU8, ptr, maxBytesToRead, ignoreNul);
      return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
    };
    var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(dirfd, path, allowEmpty) {
      if (PATH.isAbs(path)) {
        return path;
      }
      var dir;
      if (dirfd === -100) {
        dir = FS.cwd();
      } else {
        var dirstream = SYSCALLS.getStreamFromFD(dirfd);
        dir = dirstream.path;
      }
      if (path.length == 0) {
        if (!allowEmpty) {
          throw new FS.ErrnoError(44);
        }
        return dir;
      }
      return dir + "/" + path;
    }, writeStat(buf, stat) {
      HEAPU32[buf >> 2] = stat.dev;
      HEAPU32[buf + 4 >> 2] = stat.mode;
      HEAPU32[buf + 8 >> 2] = stat.nlink;
      HEAPU32[buf + 12 >> 2] = stat.uid;
      HEAPU32[buf + 16 >> 2] = stat.gid;
      HEAPU32[buf + 20 >> 2] = stat.rdev;
      HEAP64[buf + 24 >> 3] = BigInt(stat.size);
      HEAP32[buf + 32 >> 2] = 4096;
      HEAP32[buf + 36 >> 2] = stat.blocks;
      var atime = stat.atime.getTime();
      var mtime = stat.mtime.getTime();
      var ctime = stat.ctime.getTime();
      HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
      HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
      HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
      HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
      return 0;
    }, writeStatFs(buf, stats) {
      HEAPU32[buf + 4 >> 2] = stats.bsize;
      HEAPU32[buf + 60 >> 2] = stats.bsize;
      HEAP64[buf + 8 >> 3] = BigInt(stats.blocks);
      HEAP64[buf + 16 >> 3] = BigInt(stats.bfree);
      HEAP64[buf + 24 >> 3] = BigInt(stats.bavail);
      HEAP64[buf + 32 >> 3] = BigInt(stats.files);
      HEAP64[buf + 40 >> 3] = BigInt(stats.ffree);
      HEAPU32[buf + 48 >> 2] = stats.fsid;
      HEAPU32[buf + 64 >> 2] = stats.flags;
      HEAPU32[buf + 56 >> 2] = stats.namelen;
    }, doMsync(addr, stream, len, flags, offset) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (flags & 2) {
        return 0;
      }
      var buffer = HEAPU8.slice(addr, addr + len);
      FS.msync(stream, buffer, offset, len, flags);
    }, getStreamFromFD(fd) {
      var stream = FS.getStreamChecked(fd);
      return stream;
    }, varargs: void 0, getStr(ptr) {
      var ret = UTF8ToString(ptr);
      return ret;
    } };
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
          case 0: {
            var arg = syscallGetVarargI();
            if (arg < 0) {
              return -28;
            }
            while (FS.streams[arg]) {
              arg++;
            }
            var newStream;
            newStream = FS.dupStream(stream, arg);
            return newStream.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return stream.flags;
          case 4: {
            var arg = syscallGetVarargI();
            stream.flags |= arg;
            return 0;
          }
          case 12: {
            var arg = syscallGetVarargP();
            var offset = 0;
            HEAP16[arg + offset >> 1] = 2;
            return 0;
          }
          case 13:
          case 14:
            return 0;
        }
        return -28;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    function ___syscall_getdents64(fd, dirp, count) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        stream.getdents || (stream.getdents = FS.readdir(stream.path));
        var struct_size = 280;
        var pos = 0;
        var off = FS.llseek(stream, 0, 1);
        var startIdx = Math.floor(off / struct_size);
        var endIdx = Math.min(stream.getdents.length, startIdx + Math.floor(count / struct_size));
        for (var idx = startIdx; idx < endIdx; idx++) {
          var id;
          var type;
          var name = stream.getdents[idx];
          if (name === ".") {
            id = stream.node.id;
            type = 4;
          } else if (name === "..") {
            var lookup = FS.lookupPath(stream.path, { parent: true });
            id = lookup.node.id;
            type = 4;
          } else {
            var child;
            try {
              child = FS.lookupNode(stream.node, name);
            } catch (e) {
              if (e?.errno === 28) {
                continue;
              }
              throw e;
            }
            id = child.id;
            type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
          }
          HEAP64[dirp + pos >> 3] = BigInt(id);
          HEAP64[dirp + pos + 8 >> 3] = BigInt((idx + 1) * struct_size);
          HEAP16[dirp + pos + 16 >> 1] = 280;
          HEAP8[dirp + pos + 18] = type;
          stringToUTF8(name, dirp + pos + 19, 256);
          pos += struct_size;
        }
        FS.llseek(stream, idx * struct_size, 0);
        return pos;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (op) {
          case 21509: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21505: {
            if (!stream.tty)
              return -59;
            if (stream.tty.ops.ioctl_tcgets) {
              var termios = stream.tty.ops.ioctl_tcgets(stream);
              var argp = syscallGetVarargP();
              HEAP32[argp >> 2] = termios.c_iflag || 0;
              HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
              HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
              HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
              for (var i2 = 0; i2 < 32; i2++) {
                HEAP8[argp + i2 + 17] = termios.c_cc[i2] || 0;
              }
              return 0;
            }
            return 0;
          }
          case 21510:
          case 21511:
          case 21512: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty)
              return -59;
            if (stream.tty.ops.ioctl_tcsets) {
              var argp = syscallGetVarargP();
              var c_iflag = HEAP32[argp >> 2];
              var c_oflag = HEAP32[argp + 4 >> 2];
              var c_cflag = HEAP32[argp + 8 >> 2];
              var c_lflag = HEAP32[argp + 12 >> 2];
              var c_cc = [];
              for (var i2 = 0; i2 < 32; i2++) {
                c_cc.push(HEAP8[argp + i2 + 17]);
              }
              return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
            }
            return 0;
          }
          case 21519: {
            if (!stream.tty)
              return -59;
            var argp = syscallGetVarargP();
            HEAP32[argp >> 2] = 0;
            return 0;
          }
          case 21520: {
            if (!stream.tty)
              return -59;
            return -28;
          }
          case 21537:
          case 21531: {
            var argp = syscallGetVarargP();
            return FS.ioctl(stream, op, argp);
          }
          case 21523: {
            if (!stream.tty)
              return -59;
            if (stream.tty.ops.ioctl_tiocgwinsz) {
              var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
              var argp = syscallGetVarargP();
              HEAP16[argp >> 1] = winsize[0];
              HEAP16[argp + 2 >> 1] = winsize[1];
            }
            return 0;
          }
          case 21524: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          case 21515: {
            if (!stream.tty)
              return -59;
            return 0;
          }
          default:
            return -28;
        }
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_mkdirat(dirfd, path, mode) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        FS.mkdir(path, mode, 0);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_openat(dirfd, path, flags, varargs) {
      SYSCALLS.varargs = varargs;
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        var mode = varargs ? syscallGetVarargI() : 0;
        return FS.open(path, flags, mode).fd;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_renameat(olddirfd, oldpath, newdirfd, newpath) {
      try {
        oldpath = SYSCALLS.getStr(oldpath);
        newpath = SYSCALLS.getStr(newpath);
        oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
        newpath = SYSCALLS.calculateAt(newdirfd, newpath);
        FS.rename(oldpath, newpath);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_rmdir(path) {
      try {
        path = SYSCALLS.getStr(path);
        FS.rmdir(path);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_stat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.writeStat(buf, FS.stat(path));
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    function ___syscall_unlinkat(dirfd, path, flags) {
      try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (!flags) {
          FS.unlink(path);
        } else if (flags === 512) {
          FS.rmdir(path);
        } else {
          return -28;
        }
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return -e.errno;
      }
    }
    var __abort_js = () => abort("");
    var structRegistrations = {};
    var runDestructors = (destructors) => {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    };
    function readPointer(pointer) {
      return this.fromWireType(HEAPU32[pointer >> 2]);
    }
    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var InternalError = class InternalError extends Error {
      constructor(message) {
        super(message);
        this.name = "InternalError";
      }
    };
    var throwInternalError = (message) => {
      throw new InternalError(message);
    };
    var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
      myTypes.forEach((type) => typeDependencies[type] = dependentTypes);
      function onComplete(typeConverters2) {
        var myTypeConverters = getTypeConverters(typeConverters2);
        if (myTypeConverters.length !== myTypes.length) {
          throwInternalError("Mismatched type converter count");
        }
        for (var i2 = 0; i2 < myTypes.length; ++i2) {
          registerType(myTypes[i2], myTypeConverters[i2]);
        }
      }
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach((dt, i2) => {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i2] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i2] = registeredTypes[dt];
            ++registered;
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    };
    var __embind_finalize_value_object = (structType) => {
      var reg = structRegistrations[structType];
      delete structRegistrations[structType];
      var rawConstructor = reg.rawConstructor;
      var rawDestructor = reg.rawDestructor;
      var fieldRecords = reg.fields;
      var fieldTypes = fieldRecords.map((field) => field.getterReturnType).concat(fieldRecords.map((field) => field.setterArgumentType));
      whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes2) => {
        var fields = {};
        fieldRecords.forEach((field, i2) => {
          var fieldName = field.fieldName;
          var getterReturnType = fieldTypes2[i2];
          var optional = fieldTypes2[i2].optional;
          var getter = field.getter;
          var getterContext = field.getterContext;
          var setterArgumentType = fieldTypes2[i2 + fieldRecords.length];
          var setter = field.setter;
          var setterContext = field.setterContext;
          fields[fieldName] = { read: (ptr) => getterReturnType.fromWireType(getter(getterContext, ptr)), write: (ptr, o) => {
            var destructors = [];
            setter(setterContext, ptr, setterArgumentType.toWireType(destructors, o));
            runDestructors(destructors);
          }, optional };
        });
        return [{ name: reg.name, fromWireType: (ptr) => {
          var rv = {};
          for (var i2 in fields) {
            rv[i2] = fields[i2].read(ptr);
          }
          rawDestructor(ptr);
          return rv;
        }, toWireType: (destructors, o) => {
          for (var fieldName in fields) {
            if (!(fieldName in o) && !fields[fieldName].optional) {
              throw new TypeError(`Missing field: "${fieldName}"`);
            }
          }
          var ptr = rawConstructor();
          for (fieldName in fields) {
            fields[fieldName].write(ptr, o[fieldName]);
          }
          if (destructors !== null) {
            destructors.push(rawDestructor, ptr);
          }
          return ptr;
        }, readValueFromPointer: readPointer, destructorFunction: rawDestructor }];
      });
    };
    var AsciiToString = (ptr) => {
      var str = "";
      while (1) {
        var ch = HEAPU8[ptr++];
        if (!ch)
          return str;
        str += String.fromCharCode(ch);
      }
    };
    var BindingError = class BindingError extends Error {
      constructor(message) {
        super(message);
        this.name = "BindingError";
      }
    };
    var throwBindingError = (message) => {
      throw new BindingError(message);
    };
    function sharedRegisterType(rawType, registeredInstance, options = {}) {
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError(`Cannot register type '${name}' twice`);
        }
      }
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
    function registerType(rawType, registeredInstance, options = {}) {
      return sharedRegisterType(rawType, registeredInstance, options);
    }
    var integerReadValueFromPointer = (name, width, signed) => {
      switch (width) {
        case 1:
          return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
        case 2:
          return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
        case 4:
          return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
        case 8:
          return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
        default:
          throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    };
    var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
      const isUnsignedType = minRange === 0n;
      let fromWireType = (value) => value;
      if (isUnsignedType) {
        const bitSize = size * 8;
        fromWireType = (value) => BigInt.asUintN(bitSize, value);
        maxRange = fromWireType(maxRange);
      }
      registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => {
        if (typeof value == "number") {
          value = BigInt(value);
        }
        return value;
      }, readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType), destructorFunction: null });
    };
    var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: function(wt) {
        return !!wt;
      }, toWireType: function(destructors, o) {
        return o ? trueValue : falseValue;
      }, readValueFromPointer: function(pointer) {
        return this.fromWireType(HEAPU8[pointer]);
      }, destructorFunction: null });
    };
    var shallowCopyInternalPointer = (o) => ({ count: o.count, deleteScheduled: o.deleteScheduled, preservePointerOnDelete: o.preservePointerOnDelete, ptr: o.ptr, ptrType: o.ptrType, smartPtr: o.smartPtr, smartPtrType: o.smartPtrType });
    var throwInstanceAlreadyDeleted = (obj) => {
      function getInstanceTypeName(handle) {
        return handle.$$.ptrType.registeredClass.name;
      }
      throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
    };
    var finalizationRegistry = false;
    var detachFinalizer = (handle) => {
    };
    var runDestructor = ($$) => {
      if ($$.smartPtr) {
        $$.smartPtrType.rawDestructor($$.smartPtr);
      } else {
        $$.ptrType.registeredClass.rawDestructor($$.ptr);
      }
    };
    var releaseClassHandle = ($$) => {
      $$.count.value -= 1;
      var toDelete = 0 === $$.count.value;
      if (toDelete) {
        runDestructor($$);
      }
    };
    var attachFinalizer = (handle) => {
      if ("undefined" === typeof FinalizationRegistry) {
        attachFinalizer = (handle2) => handle2;
        return handle;
      }
      finalizationRegistry = new FinalizationRegistry((info) => {
        releaseClassHandle(info.$$);
      });
      attachFinalizer = (handle2) => {
        var $$ = handle2.$$;
        var hasSmartPtr = !!$$.smartPtr;
        if (hasSmartPtr) {
          var info = { $$ };
          finalizationRegistry.register(handle2, info, handle2);
        }
        return handle2;
      };
      detachFinalizer = (handle2) => finalizationRegistry.unregister(handle2);
      return attachFinalizer(handle);
    };
    var deletionQueue = [];
    var flushPendingDeletes = () => {
      while (deletionQueue.length) {
        var obj = deletionQueue.pop();
        obj.$$.deleteScheduled = false;
        obj["delete"]();
      }
    };
    var delayFunction;
    var init_ClassHandle = () => {
      let proto = ClassHandle.prototype;
      Object.assign(proto, { isAliasOf(other) {
        if (!(this instanceof ClassHandle)) {
          return false;
        }
        if (!(other instanceof ClassHandle)) {
          return false;
        }
        var leftClass = this.$$.ptrType.registeredClass;
        var left = this.$$.ptr;
        other.$$ = other.$$;
        var rightClass = other.$$.ptrType.registeredClass;
        var right = other.$$.ptr;
        while (leftClass.baseClass) {
          left = leftClass.upcast(left);
          leftClass = leftClass.baseClass;
        }
        while (rightClass.baseClass) {
          right = rightClass.upcast(right);
          rightClass = rightClass.baseClass;
        }
        return leftClass === rightClass && left === right;
      }, clone() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.preservePointerOnDelete) {
          this.$$.count.value += 1;
          return this;
        } else {
          var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } }));
          clone.$$.count.value += 1;
          clone.$$.deleteScheduled = false;
          return clone;
        }
      }, delete() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        detachFinalizer(this);
        releaseClassHandle(this.$$);
        if (!this.$$.preservePointerOnDelete) {
          this.$$.smartPtr = void 0;
          this.$$.ptr = void 0;
        }
      }, isDeleted() {
        return !this.$$.ptr;
      }, deleteLater() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        deletionQueue.push(this);
        if (deletionQueue.length === 1 && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
        this.$$.deleteScheduled = true;
        return this;
      } });
      const symbolDispose = Symbol.dispose;
      if (symbolDispose) {
        proto[symbolDispose] = proto["delete"];
      }
    };
    function ClassHandle() {
    }
    var createNamedFunction = (name, func) => Object.defineProperty(func, "name", { value: name });
    var registeredPointers = {};
    var ensureOverloadTable = (proto, methodName, humanName) => {
      if (void 0 === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        proto[methodName] = function(...args) {
          if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
            throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
          }
          return proto[methodName].overloadTable[args.length].apply(this, args);
        };
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    };
    var exposePublicSymbol = (name, value, numArguments) => {
      if (Module.hasOwnProperty(name)) {
        if (void 0 === numArguments || void 0 !== Module[name].overloadTable && void 0 !== Module[name].overloadTable[numArguments]) {
          throwBindingError(`Cannot register public name '${name}' twice`);
        }
        ensureOverloadTable(Module, name, name);
        if (Module[name].overloadTable.hasOwnProperty(numArguments)) {
          throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
        }
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    };
    var char_0 = 48;
    var char_9 = 57;
    var makeLegalFunctionName = (name) => {
      name = name.replace(/[^a-zA-Z0-9_]/g, "$");
      var f = name.charCodeAt(0);
      if (f >= char_0 && f <= char_9) {
        return `_${name}`;
      }
      return name;
    };
    function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
      this.name = name;
      this.constructor = constructor;
      this.instancePrototype = instancePrototype;
      this.rawDestructor = rawDestructor;
      this.baseClass = baseClass;
      this.getActualType = getActualType;
      this.upcast = upcast;
      this.downcast = downcast;
      this.pureVirtualFunctions = [];
    }
    var upcastPointer = (ptr, ptrClass, desiredClass) => {
      while (ptrClass !== desiredClass) {
        if (!ptrClass.upcast) {
          throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
        }
        ptr = ptrClass.upcast(ptr);
        ptrClass = ptrClass.baseClass;
      }
      return ptr;
    };
    var embindRepr = (v) => {
      if (v === null) {
        return "null";
      }
      var t = typeof v;
      if (t === "object" || t === "array" || t === "function") {
        return v.toString();
      } else {
        return "" + v;
      }
    };
    function constNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError(`null is not a valid ${this.name}`);
        }
        return 0;
      }
      if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
      }
      if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }
    function genericPointerToWireType(destructors, handle) {
      var ptr;
      if (handle === null) {
        if (this.isReference) {
          throwBindingError(`null is not a valid ${this.name}`);
        }
        if (this.isSmartPointer) {
          ptr = this.rawConstructor();
          if (destructors !== null) {
            destructors.push(this.rawDestructor, ptr);
          }
          return ptr;
        } else {
          return 0;
        }
      }
      if (!handle || !handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
      }
      if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
      }
      if (!this.isConst && handle.$$.ptrType.isConst) {
        throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      if (this.isSmartPointer) {
        if (void 0 === handle.$$.smartPtr) {
          throwBindingError("Passing raw pointer to smart pointer is illegal");
        }
        switch (this.sharingPolicy) {
          case 0:
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
            }
            break;
          case 1:
            ptr = handle.$$.smartPtr;
            break;
          case 2:
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              var clonedHandle = handle["clone"]();
              ptr = this.rawShare(ptr, Emval.toHandle(() => clonedHandle["delete"]()));
              if (destructors !== null) {
                destructors.push(this.rawDestructor, ptr);
              }
            }
            break;
          default:
            throwBindingError("Unsupporting sharing policy");
        }
      }
      return ptr;
    }
    function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError(`null is not a valid ${this.name}`);
        }
        return 0;
      }
      if (!handle.$$) {
        throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
      }
      if (!handle.$$.ptr) {
        throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
      }
      if (handle.$$.ptrType.isConst) {
        throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }
    var downcastPointer = (ptr, ptrClass, desiredClass) => {
      if (ptrClass === desiredClass) {
        return ptr;
      }
      if (void 0 === desiredClass.baseClass) {
        return null;
      }
      var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
      if (rv === null) {
        return null;
      }
      return desiredClass.downcast(rv);
    };
    var registeredInstances = {};
    var getBasestPointer = (class_, ptr) => {
      if (ptr === void 0) {
        throwBindingError("ptr should not be undefined");
      }
      while (class_.baseClass) {
        ptr = class_.upcast(ptr);
        class_ = class_.baseClass;
      }
      return ptr;
    };
    var getInheritedInstance = (class_, ptr) => {
      ptr = getBasestPointer(class_, ptr);
      return registeredInstances[ptr];
    };
    var makeClassHandle = (prototype, record) => {
      if (!record.ptrType || !record.ptr) {
        throwInternalError("makeClassHandle requires ptr and ptrType");
      }
      var hasSmartPtrType = !!record.smartPtrType;
      var hasSmartPtr = !!record.smartPtr;
      if (hasSmartPtrType !== hasSmartPtr) {
        throwInternalError("Both smartPtrType and smartPtr must be specified");
      }
      record.count = { value: 1 };
      return attachFinalizer(Object.create(prototype, { $$: { value: record, writable: true } }));
    };
    function RegisteredPointer_fromWireType(ptr) {
      var rawPointer = this.getPointee(ptr);
      if (!rawPointer) {
        this.destructor(ptr);
        return null;
      }
      var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
      if (void 0 !== registeredInstance) {
        if (0 === registeredInstance.$$.count.value) {
          registeredInstance.$$.ptr = rawPointer;
          registeredInstance.$$.smartPtr = ptr;
          return registeredInstance["clone"]();
        } else {
          var rv = registeredInstance["clone"]();
          this.destructor(ptr);
          return rv;
        }
      }
      function makeDefaultHandle() {
        if (this.isSmartPointer) {
          return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: rawPointer, smartPtrType: this, smartPtr: ptr });
        } else {
          return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr });
        }
      }
      var actualType = this.registeredClass.getActualType(rawPointer);
      var registeredPointerRecord = registeredPointers[actualType];
      if (!registeredPointerRecord) {
        return makeDefaultHandle.call(this);
      }
      var toType;
      if (this.isConst) {
        toType = registeredPointerRecord.constPointerType;
      } else {
        toType = registeredPointerRecord.pointerType;
      }
      var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
      if (dp === null) {
        return makeDefaultHandle.call(this);
      }
      if (this.isSmartPointer) {
        return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp, smartPtrType: this, smartPtr: ptr });
      } else {
        return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp });
      }
    }
    var init_RegisteredPointer = () => {
      Object.assign(RegisteredPointer.prototype, { getPointee(ptr) {
        if (this.rawGetPointee) {
          ptr = this.rawGetPointee(ptr);
        }
        return ptr;
      }, destructor(ptr) {
        this.rawDestructor?.(ptr);
      }, readValueFromPointer: readPointer, fromWireType: RegisteredPointer_fromWireType });
    };
    function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
      this.name = name;
      this.registeredClass = registeredClass;
      this.isReference = isReference;
      this.isConst = isConst;
      this.isSmartPointer = isSmartPointer;
      this.pointeeType = pointeeType;
      this.sharingPolicy = sharingPolicy;
      this.rawGetPointee = rawGetPointee;
      this.rawConstructor = rawConstructor;
      this.rawShare = rawShare;
      this.rawDestructor = rawDestructor;
      if (!isSmartPointer && registeredClass.baseClass === void 0) {
        if (isConst) {
          this.toWireType = constNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        } else {
          this.toWireType = nonConstNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        }
      } else {
        this.toWireType = genericPointerToWireType;
      }
    }
    var replacePublicSymbol = (name, value, numArguments) => {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError("Replacing nonexistent public symbol");
      }
      if (void 0 !== Module[name].overloadTable && void 0 !== numArguments) {
        Module[name].overloadTable[numArguments] = value;
      } else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    };
    var wasmTable;
    var getWasmTableEntry = (funcPtr) => wasmTable.get(funcPtr);
    var embind__requireFunction = (signature, rawFunction, isAsync = false) => {
      signature = AsciiToString(signature);
      function makeDynCaller() {
        var rtn = getWasmTableEntry(rawFunction);
        return rtn;
      }
      var fp = makeDynCaller();
      if (typeof fp != "function") {
        throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
      }
      return fp;
    };
    class UnboundTypeError extends Error {
    }
    var getTypeName = (type) => {
      var ptr = ___getTypeName(type);
      var rv = AsciiToString(ptr);
      _free(ptr);
      return rv;
    };
    var throwUnboundTypeError = (message, types) => {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
        if (seen[type]) {
          return;
        }
        if (registeredTypes[type]) {
          return;
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }
        unboundTypes.push(type);
        seen[type] = true;
      }
      types.forEach(visit);
      throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([", "]));
    };
    var __embind_register_class = (rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) => {
      name = AsciiToString(name);
      getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
      upcast && (upcast = embind__requireFunction(upcastSignature, upcast));
      downcast && (downcast = embind__requireFunction(downcastSignature, downcast));
      rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
      var legalFunctionName = makeLegalFunctionName(name);
      exposePublicSymbol(legalFunctionName, function() {
        throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [baseClassRawType]);
      });
      whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], (base) => {
        var _a;
        base = base[0];
        var baseClass;
        var basePrototype;
        if (baseClassRawType) {
          baseClass = base.registeredClass;
          basePrototype = baseClass.instancePrototype;
        } else {
          basePrototype = ClassHandle.prototype;
        }
        var constructor = createNamedFunction(name, function(...args) {
          if (Object.getPrototypeOf(this) !== instancePrototype) {
            throw new BindingError(`Use 'new' to construct ${name}`);
          }
          if (void 0 === registeredClass.constructor_body) {
            throw new BindingError(`${name} has no accessible constructor`);
          }
          var body = registeredClass.constructor_body[args.length];
          if (void 0 === body) {
            throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
          }
          return body.apply(this, args);
        });
        var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } });
        constructor.prototype = instancePrototype;
        var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
        if (registeredClass.baseClass) {
          (_a = registeredClass.baseClass).__derivedClasses ?? (_a.__derivedClasses = []);
          registeredClass.baseClass.__derivedClasses.push(registeredClass);
        }
        var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
        var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
        var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
        registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter };
        replacePublicSymbol(legalFunctionName, constructor);
        return [referenceConverter, pointerConverter, constPointerConverter];
      });
    };
    function usesDestructorStack(argTypes) {
      for (var i2 = 1; i2 < argTypes.length; ++i2) {
        if (argTypes[i2] !== null && argTypes[i2].destructorFunction === void 0) {
          return true;
        }
      }
      return false;
    }
    function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
      var needsDestructorStack = usesDestructorStack(argTypes);
      var argCount = argTypes.length - 2;
      var argsList = [];
      var argsListWired = ["fn"];
      if (isClassMethodFunc) {
        argsListWired.push("thisWired");
      }
      for (var i2 = 0; i2 < argCount; ++i2) {
        argsList.push(`arg${i2}`);
        argsListWired.push(`arg${i2}Wired`);
      }
      argsList = argsList.join(",");
      argsListWired = argsListWired.join(",");
      var invokerFnBody = `return function (${argsList}) {
`;
      if (needsDestructorStack) {
        invokerFnBody += "var destructors = [];\n";
      }
      var dtorStack = needsDestructorStack ? "destructors" : "null";
      var args1 = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
      if (isClassMethodFunc) {
        invokerFnBody += `var thisWired = toClassParamWire(${dtorStack}, this);
`;
      }
      for (var i2 = 0; i2 < argCount; ++i2) {
        var argName = `toArg${i2}Wire`;
        invokerFnBody += `var arg${i2}Wired = ${argName}(${dtorStack}, arg${i2});
`;
        args1.push(argName);
      }
      invokerFnBody += (returns || isAsync ? "var rv = " : "") + `invoker(${argsListWired});
`;
      if (needsDestructorStack) {
        invokerFnBody += "runDestructors(destructors);\n";
      } else {
        for (var i2 = isClassMethodFunc ? 1 : 2; i2 < argTypes.length; ++i2) {
          var paramName = i2 === 1 ? "thisWired" : "arg" + (i2 - 2) + "Wired";
          if (argTypes[i2].destructorFunction !== null) {
            invokerFnBody += `${paramName}_dtor(${paramName});
`;
            args1.push(`${paramName}_dtor`);
          }
        }
      }
      if (returns) {
        invokerFnBody += "var ret = fromRetWire(rv);\nreturn ret;\n";
      }
      invokerFnBody += "}\n";
      return new Function(args1, invokerFnBody);
    }
    function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
      var argCount = argTypes.length;
      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
      }
      var isClassMethodFunc = argTypes[1] !== null && classType !== null;
      var needsDestructorStack = usesDestructorStack(argTypes);
      var returns = !argTypes[0].isVoid;
      var retType = argTypes[0];
      var instType = argTypes[1];
      var closureArgs = [humanName, throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, retType.fromWireType.bind(retType), instType?.toWireType.bind(instType)];
      for (var i2 = 2; i2 < argCount; ++i2) {
        var argType = argTypes[i2];
        closureArgs.push(argType.toWireType.bind(argType));
      }
      if (!needsDestructorStack) {
        for (var i2 = isClassMethodFunc ? 1 : 2; i2 < argTypes.length; ++i2) {
          if (argTypes[i2].destructorFunction !== null) {
            closureArgs.push(argTypes[i2].destructorFunction);
          }
        }
      }
      let invokerFactory = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
      var invokerFn = invokerFactory(...closureArgs);
      return createNamedFunction(humanName, invokerFn);
    }
    var heap32VectorToArray = (count, firstElement) => {
      var array = [];
      for (var i2 = 0; i2 < count; i2++) {
        array.push(HEAPU32[firstElement + i2 * 4 >> 2]);
      }
      return array;
    };
    var getFunctionName = (signature) => {
      signature = signature.trim();
      const argsIndex = signature.indexOf("(");
      if (argsIndex === -1)
        return signature;
      return signature.slice(0, argsIndex);
    };
    var __embind_register_class_class_function = (rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, fn, isAsync, isNonnullReturn) => {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      methodName = AsciiToString(methodName);
      methodName = getFunctionName(methodName);
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker, isAsync);
      whenDependentTypesAreResolved([], [rawClassType], (classType) => {
        classType = classType[0];
        var humanName = `${classType.name}.${methodName}`;
        function unboundTypesHandler() {
          throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
        }
        if (methodName.startsWith("@@")) {
          methodName = Symbol[methodName.substring(2)];
        }
        var proto = classType.registeredClass.constructor;
        if (void 0 === proto[methodName]) {
          unboundTypesHandler.argCount = argCount - 1;
          proto[methodName] = unboundTypesHandler;
        } else {
          ensureOverloadTable(proto, methodName, humanName);
          proto[methodName].overloadTable[argCount - 1] = unboundTypesHandler;
        }
        whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
          var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
          var func = craftInvokerFunction(humanName, invokerArgsArray, null, rawInvoker, fn, isAsync);
          if (void 0 === proto[methodName].overloadTable) {
            func.argCount = argCount - 1;
            proto[methodName] = func;
          } else {
            proto[methodName].overloadTable[argCount - 1] = func;
          }
          if (classType.registeredClass.__derivedClasses) {
            for (const derivedClass of classType.registeredClass.__derivedClasses) {
              if (!derivedClass.constructor.hasOwnProperty(methodName)) {
                derivedClass.constructor[methodName] = func;
              }
            }
          }
          return [];
        });
        return [];
      });
    };
    var __embind_register_class_constructor = (rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) => {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      invoker = embind__requireFunction(invokerSignature, invoker);
      whenDependentTypesAreResolved([], [rawClassType], (classType) => {
        classType = classType[0];
        var humanName = `constructor ${classType.name}`;
        if (void 0 === classType.registeredClass.constructor_body) {
          classType.registeredClass.constructor_body = [];
        }
        if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) {
          throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount - 1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
        }
        classType.registeredClass.constructor_body[argCount - 1] = () => {
          throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, rawArgTypes);
        };
        whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
          argTypes.splice(1, 0, null);
          classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
          return [];
        });
        return [];
      });
    };
    var __embind_register_class_function = (rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual, isAsync, isNonnullReturn) => {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      methodName = AsciiToString(methodName);
      methodName = getFunctionName(methodName);
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker, isAsync);
      whenDependentTypesAreResolved([], [rawClassType], (classType) => {
        classType = classType[0];
        var humanName = `${classType.name}.${methodName}`;
        if (methodName.startsWith("@@")) {
          methodName = Symbol[methodName.substring(2)];
        }
        if (isPureVirtual) {
          classType.registeredClass.pureVirtualFunctions.push(methodName);
        }
        function unboundTypesHandler() {
          throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
        }
        var proto = classType.registeredClass.instancePrototype;
        var method = proto[methodName];
        if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
          unboundTypesHandler.argCount = argCount - 2;
          unboundTypesHandler.className = classType.name;
          proto[methodName] = unboundTypesHandler;
        } else {
          ensureOverloadTable(proto, methodName, humanName);
          proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
        }
        whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
          var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
          if (void 0 === proto[methodName].overloadTable) {
            memberFunction.argCount = argCount - 2;
            proto[methodName] = memberFunction;
          } else {
            proto[methodName].overloadTable[argCount - 2] = memberFunction;
          }
          return [];
        });
        return [];
      });
    };
    var validateThis = (this_, classType, humanName) => {
      if (!(this_ instanceof Object)) {
        throwBindingError(`${humanName} with invalid "this": ${this_}`);
      }
      if (!(this_ instanceof classType.registeredClass.constructor)) {
        throwBindingError(`${humanName} incompatible with "this" of type ${this_.constructor.name}`);
      }
      if (!this_.$$.ptr) {
        throwBindingError(`cannot call emscripten binding method ${humanName} on deleted object`);
      }
      return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass);
    };
    var __embind_register_class_property = (classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) => {
      fieldName = AsciiToString(fieldName);
      getter = embind__requireFunction(getterSignature, getter);
      whenDependentTypesAreResolved([], [classType], (classType2) => {
        classType2 = classType2[0];
        var humanName = `${classType2.name}.${fieldName}`;
        var desc = { get() {
          throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [getterReturnType, setterArgumentType]);
        }, enumerable: true, configurable: true };
        if (setter) {
          desc.set = () => throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [getterReturnType, setterArgumentType]);
        } else {
          desc.set = (v) => throwBindingError(humanName + " is a read-only property");
        }
        Object.defineProperty(classType2.registeredClass.instancePrototype, fieldName, desc);
        whenDependentTypesAreResolved([], setter ? [getterReturnType, setterArgumentType] : [getterReturnType], (types) => {
          var getterReturnType2 = types[0];
          var desc2 = { get() {
            var ptr = validateThis(this, classType2, humanName + " getter");
            return getterReturnType2.fromWireType(getter(getterContext, ptr));
          }, enumerable: true };
          if (setter) {
            setter = embind__requireFunction(setterSignature, setter);
            var setterArgumentType2 = types[1];
            desc2.set = function(v) {
              var ptr = validateThis(this, classType2, humanName + " setter");
              var destructors = [];
              setter(setterContext, ptr, setterArgumentType2.toWireType(destructors, v));
              runDestructors(destructors);
            };
          }
          Object.defineProperty(classType2.registeredClass.instancePrototype, fieldName, desc2);
          return [];
        });
        return [];
      });
    };
    var emval_freelist = [];
    var emval_handles = [0, 1, , 1, null, 1, true, 1, false, 1];
    var __emval_decref = (handle) => {
      if (handle > 9 && 0 === --emval_handles[handle + 1]) {
        emval_handles[handle] = void 0;
        emval_freelist.push(handle);
      }
    };
    var Emval = { toValue: (handle) => {
      if (!handle) {
        throwBindingError(`Cannot use deleted val. handle = ${handle}`);
      }
      return emval_handles[handle];
    }, toHandle: (value) => {
      switch (value) {
        case void 0:
          return 2;
        case null:
          return 4;
        case true:
          return 6;
        case false:
          return 8;
        default: {
          const handle = emval_freelist.pop() || emval_handles.length;
          emval_handles[handle] = value;
          emval_handles[handle + 1] = 1;
          return handle;
        }
      }
    } };
    var EmValType = { name: "emscripten::val", fromWireType: (handle) => {
      var rv = Emval.toValue(handle);
      __emval_decref(handle);
      return rv;
    }, toWireType: (destructors, value) => Emval.toHandle(value), readValueFromPointer: readPointer, destructorFunction: null };
    var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
    var enumReadValueFromPointer = (name, width, signed) => {
      switch (width) {
        case 1:
          return signed ? function(pointer) {
            return this.fromWireType(HEAP8[pointer]);
          } : function(pointer) {
            return this.fromWireType(HEAPU8[pointer]);
          };
        case 2:
          return signed ? function(pointer) {
            return this.fromWireType(HEAP16[pointer >> 1]);
          } : function(pointer) {
            return this.fromWireType(HEAPU16[pointer >> 1]);
          };
        case 4:
          return signed ? function(pointer) {
            return this.fromWireType(HEAP32[pointer >> 2]);
          } : function(pointer) {
            return this.fromWireType(HEAPU32[pointer >> 2]);
          };
        default:
          throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    };
    var __embind_register_enum = (rawType, name, size, isSigned) => {
      name = AsciiToString(name);
      function ctor() {
      }
      ctor.values = {};
      registerType(rawType, { name, constructor: ctor, fromWireType: function(c) {
        return this.constructor.values[c];
      }, toWireType: (destructors, c) => c.value, readValueFromPointer: enumReadValueFromPointer(name, size, isSigned), destructorFunction: null });
      exposePublicSymbol(name, ctor);
    };
    var requireRegisteredType = (rawType, humanName) => {
      var impl = registeredTypes[rawType];
      if (void 0 === impl) {
        throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
      }
      return impl;
    };
    var __embind_register_enum_value = (rawEnumType, name, enumValue) => {
      var enumType = requireRegisteredType(rawEnumType, "enum");
      name = AsciiToString(name);
      var Enum = enumType.constructor;
      var Value = Object.create(enumType.constructor.prototype, { value: { value: enumValue }, constructor: { value: createNamedFunction(`${enumType.name}_${name}`, function() {
      }) } });
      Enum.values[enumValue] = Value;
      Enum[name] = Value;
    };
    var floatReadValueFromPointer = (name, width) => {
      switch (width) {
        case 4:
          return function(pointer) {
            return this.fromWireType(HEAPF32[pointer >> 2]);
          };
        case 8:
          return function(pointer) {
            return this.fromWireType(HEAPF64[pointer >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${width}): ${name}`);
      }
    };
    var __embind_register_float = (rawType, name, size) => {
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: (value) => value, toWireType: (destructors, value) => value, readValueFromPointer: floatReadValueFromPointer(name, size), destructorFunction: null });
    };
    var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync, isNonnullReturn) => {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = AsciiToString(name);
      name = getFunctionName(name);
      rawInvoker = embind__requireFunction(signature, rawInvoker, isAsync);
      exposePublicSymbol(name, function() {
        throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
      }, argCount - 1);
      whenDependentTypesAreResolved([], argTypes, (argTypes2) => {
        var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
        return [];
      });
    };
    var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
      const isUnsignedType = minRange === 0;
      let fromWireType = (value) => value;
      if (isUnsignedType) {
        var bitshift = 32 - 8 * size;
        fromWireType = (value) => value << bitshift >>> bitshift;
        maxRange = fromWireType(maxRange);
      }
      registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => value, readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0), destructorFunction: null });
    };
    var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
      var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
      var TA = typeMapping[dataTypeIndex];
      function decodeMemoryView(handle) {
        var size = HEAPU32[handle >> 2];
        var data = HEAPU32[handle + 4 >> 2];
        return new TA(HEAP8.buffer, data, size);
      }
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType: decodeMemoryView, readValueFromPointer: decodeMemoryView }, { ignoreDuplicateRegistrations: true });
    };
    var EmValOptionalType = Object.assign({ optional: true }, EmValType);
    var __embind_register_optional = (rawOptionalType, rawType) => {
      registerType(rawOptionalType, EmValOptionalType);
    };
    var __embind_register_smart_ptr = (rawType, rawPointeeType, name, sharingPolicy, getPointeeSignature, rawGetPointee, constructorSignature, rawConstructor, shareSignature, rawShare, destructorSignature, rawDestructor) => {
      name = AsciiToString(name);
      rawGetPointee = embind__requireFunction(getPointeeSignature, rawGetPointee);
      rawConstructor = embind__requireFunction(constructorSignature, rawConstructor);
      rawShare = embind__requireFunction(shareSignature, rawShare);
      rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
      whenDependentTypesAreResolved([rawType], [rawPointeeType], (pointeeType) => {
        pointeeType = pointeeType[0];
        var registeredPointer = new RegisteredPointer(name, pointeeType.registeredClass, false, false, true, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor);
        return [registeredPointer];
      });
    };
    var __embind_register_std_string = (rawType, name) => {
      name = AsciiToString(name);
      registerType(rawType, { name, fromWireType(value) {
        var length = HEAPU32[value >> 2];
        var payload = value + 4;
        var str;
        {
          str = UTF8ToString(payload, length, true);
        }
        _free(value);
        return str;
      }, toWireType(destructors, value) {
        if (value instanceof ArrayBuffer) {
          value = new Uint8Array(value);
        }
        var length;
        var valueIsOfTypeString = typeof value == "string";
        if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
          throwBindingError("Cannot pass non-string to std::string");
        }
        if (valueIsOfTypeString) {
          length = lengthBytesUTF8(value);
        } else {
          length = value.length;
        }
        var base = _malloc(4 + length + 1);
        var ptr = base + 4;
        HEAPU32[base >> 2] = length;
        if (valueIsOfTypeString) {
          {
            stringToUTF8(value, ptr, length + 1);
          }
        } else {
          HEAPU8.set(value, ptr);
        }
        if (destructors !== null) {
          destructors.push(_free, base);
        }
        return base;
      }, readValueFromPointer: readPointer, destructorFunction(ptr) {
        _free(ptr);
      } });
    };
    var UTF16Decoder = new TextDecoder("utf-16le");
    var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
      var idx = ptr >> 1;
      var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
      return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
    };
    var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
      maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
      if (maxBytesToWrite < 2)
        return 0;
      maxBytesToWrite -= 2;
      var startPtr = outPtr;
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
      for (var i2 = 0; i2 < numCharsToWrite; ++i2) {
        var codeUnit = str.charCodeAt(i2);
        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      }
      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    };
    var lengthBytesUTF16 = (str) => str.length * 2;
    var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
      var str = "";
      var startIdx = ptr >> 2;
      for (var i2 = 0; !(i2 >= maxBytesToRead / 4); i2++) {
        var utf32 = HEAPU32[startIdx + i2];
        if (!utf32 && !ignoreNul)
          break;
        str += String.fromCodePoint(utf32);
      }
      return str;
    };
    var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
      maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
      if (maxBytesToWrite < 4)
        return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var codePoint = str.codePointAt(i2);
        if (codePoint > 65535) {
          i2++;
        }
        HEAP32[outPtr >> 2] = codePoint;
        outPtr += 4;
        if (outPtr + 4 > endPtr)
          break;
      }
      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    };
    var lengthBytesUTF32 = (str) => {
      var len = 0;
      for (var i2 = 0; i2 < str.length; ++i2) {
        var codePoint = str.codePointAt(i2);
        if (codePoint > 65535) {
          i2++;
        }
        len += 4;
      }
      return len;
    };
    var __embind_register_std_wstring = (rawType, charSize, name) => {
      name = AsciiToString(name);
      var decodeString, encodeString, lengthBytesUTF;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
      } else {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
      }
      registerType(rawType, { name, fromWireType: (value) => {
        var length = HEAPU32[value >> 2];
        var str = decodeString(value + 4, length * charSize, true);
        _free(value);
        return str;
      }, toWireType: (destructors, value) => {
        if (!(typeof value == "string")) {
          throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
        }
        var length = lengthBytesUTF(value);
        var ptr = _malloc(4 + length + charSize);
        HEAPU32[ptr >> 2] = length / charSize;
        encodeString(value, ptr + 4, length + charSize);
        if (destructors !== null) {
          destructors.push(_free, ptr);
        }
        return ptr;
      }, readValueFromPointer: readPointer, destructorFunction(ptr) {
        _free(ptr);
      } });
    };
    var __embind_register_value_object = (rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) => {
      structRegistrations[rawType] = { name: AsciiToString(name), rawConstructor: embind__requireFunction(constructorSignature, rawConstructor), rawDestructor: embind__requireFunction(destructorSignature, rawDestructor), fields: [] };
    };
    var __embind_register_value_object_field = (structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) => {
      structRegistrations[structType].fields.push({ fieldName: AsciiToString(fieldName), getterReturnType, getter: embind__requireFunction(getterSignature, getter), getterContext, setterArgumentType, setter: embind__requireFunction(setterSignature, setter), setterContext });
    };
    var __embind_register_void = (rawType, name) => {
      name = AsciiToString(name);
      registerType(rawType, { isVoid: true, name, fromWireType: () => void 0, toWireType: (destructors, o) => void 0 });
    };
    var emval_methodCallers = [];
    var emval_addMethodCaller = (caller) => {
      var id = emval_methodCallers.length;
      emval_methodCallers.push(caller);
      return id;
    };
    var emval_lookupTypes = (argCount, argTypes) => {
      var a = new Array(argCount);
      for (var i2 = 0; i2 < argCount; ++i2) {
        a[i2] = requireRegisteredType(HEAPU32[argTypes + i2 * 4 >> 2], `parameter ${i2}`);
      }
      return a;
    };
    var emval_returnValue = (toReturnWire, destructorsRef, handle) => {
      var destructors = [];
      var result = toReturnWire(destructors, handle);
      if (destructors.length) {
        HEAPU32[destructorsRef >> 2] = Emval.toHandle(destructors);
      }
      return result;
    };
    var emval_symbols = {};
    var getStringOrSymbol = (address) => {
      var symbol = emval_symbols[address];
      if (symbol === void 0) {
        return AsciiToString(address);
      }
      return symbol;
    };
    var __emval_create_invoker = (argCount, argTypesPtr, kind) => {
      var GenericWireTypeSize = 8;
      var [retType, ...argTypes] = emval_lookupTypes(argCount, argTypesPtr);
      var toReturnWire = retType.toWireType.bind(retType);
      var argFromPtr = argTypes.map((type) => type.readValueFromPointer.bind(type));
      argCount--;
      var captures = { toValue: Emval.toValue };
      var args = argFromPtr.map((argFromPtr2, i2) => {
        var captureName = `argFromPtr${i2}`;
        captures[captureName] = argFromPtr2;
        return `${captureName}(args${i2 ? "+" + i2 * GenericWireTypeSize : ""})`;
      });
      var functionBody;
      switch (kind) {
        case 0:
          functionBody = "toValue(handle)";
          break;
        case 2:
          functionBody = "new (toValue(handle))";
          break;
        case 3:
          functionBody = "";
          break;
        case 1:
          captures["getStringOrSymbol"] = getStringOrSymbol;
          functionBody = "toValue(handle)[getStringOrSymbol(methodName)]";
          break;
      }
      functionBody += `(${args})`;
      if (!retType.isVoid) {
        captures["toReturnWire"] = toReturnWire;
        captures["emval_returnValue"] = emval_returnValue;
        functionBody = `return emval_returnValue(toReturnWire, destructorsRef, ${functionBody})`;
      }
      functionBody = `return function (handle, methodName, destructorsRef, args) {
  ${functionBody}
  }`;
      var invokerFunction = new Function(Object.keys(captures), functionBody)(...Object.values(captures));
      var functionName = `methodCaller<(${argTypes.map((t) => t.name)}) => ${retType.name}>`;
      return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
    };
    var __emval_equals = (first, second) => {
      first = Emval.toValue(first);
      second = Emval.toValue(second);
      return first == second;
    };
    var emval_get_global = () => globalThis;
    var __emval_get_global = (name) => {
      if (name === 0) {
        return Emval.toHandle(emval_get_global());
      } else {
        name = getStringOrSymbol(name);
        return Emval.toHandle(emval_get_global()[name]);
      }
    };
    var __emval_get_module_property = (name) => {
      name = getStringOrSymbol(name);
      return Emval.toHandle(Module[name]);
    };
    var __emval_get_property = (handle, key) => {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      return Emval.toHandle(handle[key]);
    };
    var __emval_incref = (handle) => {
      if (handle > 9) {
        emval_handles[handle + 1] += 1;
      }
    };
    var __emval_instanceof = (object, constructor) => {
      object = Emval.toValue(object);
      constructor = Emval.toValue(constructor);
      return object instanceof constructor;
    };
    var __emval_invoke = (caller, handle, methodName, destructorsRef, args) => emval_methodCallers[caller](handle, methodName, destructorsRef, args);
    var __emval_new_array = () => Emval.toHandle([]);
    var __emval_new_cstring = (v) => Emval.toHandle(getStringOrSymbol(v));
    var __emval_new_object = () => Emval.toHandle({});
    var __emval_run_destructors = (handle) => {
      var destructors = Emval.toValue(handle);
      runDestructors(destructors);
      __emval_decref(handle);
    };
    var __emval_set_property = (handle, key, value) => {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      value = Emval.toValue(value);
      handle[key] = value;
    };
    var _emscripten_get_now = () => performance.now();
    var _emscripten_date_now = () => Date.now();
    var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
    var INT53_MAX = 9007199254740992;
    var INT53_MIN = -9007199254740992;
    var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
    function _clock_time_get(clk_id, ignored_precision, ptime) {
      if (!checkWasiClock(clk_id)) {
        return 28;
      }
      var now;
      if (clk_id === 0) {
        now = _emscripten_date_now();
      } else {
        now = _emscripten_get_now();
      }
      var nsec = Math.round(now * 1e3 * 1e3);
      HEAP64[ptime >> 3] = BigInt(nsec);
      return 0;
    }
    var maybeCStringToJsString = (cString) => cString > 2 ? UTF8ToString(cString) : cString;
    var specialHTMLTargets = [0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0];
    var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : null);
      return domElement;
    };
    var findCanvasEventTarget = findEventTarget;
    var _emscripten_get_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas)
        return -4;
      HEAP32[width >> 2] = canvas.width;
      HEAP32[height >> 2] = canvas.height;
    };
    var GLctx;
    var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      var ext = ctx.getExtension("ANGLE_instanced_arrays");
      if (ext) {
        ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
        ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
        ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
        return 1;
      }
    };
    var webgl_enable_OES_vertex_array_object = (ctx) => {
      var ext = ctx.getExtension("OES_vertex_array_object");
      if (ext) {
        ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
        ctx["deleteVertexArray"] = (vao) => ext["deleteVertexArrayOES"](vao);
        ctx["bindVertexArray"] = (vao) => ext["bindVertexArrayOES"](vao);
        ctx["isVertexArray"] = (vao) => ext["isVertexArrayOES"](vao);
        return 1;
      }
    };
    var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      var ext = ctx.getExtension("WEBGL_draw_buffers");
      if (ext) {
        ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
        return 1;
      }
    };
    var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) => !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));
    var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
    var webgl_enable_EXT_polygon_offset_clamp = (ctx) => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
    var webgl_enable_EXT_clip_control = (ctx) => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
    var webgl_enable_WEBGL_polygon_mode = (ctx) => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
    var webgl_enable_WEBGL_multi_draw = (ctx) => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
    var getEmscriptenSupportedExtensions = (ctx) => {
      var supportedExtensions = ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_disjoint_timer_query", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_sRGB", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_depth_texture", "WEBGL_draw_buffers", "EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance", "EXT_clip_control", "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_polygon_offset_clamp", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw", "WEBGL_polygon_mode"];
      return (ctx.getSupportedExtensions() || []).filter((ext) => supportedExtensions.includes(ext));
    };
    var GL = { counter: 1, buffers: [], programs: [], framebuffers: [], renderbuffers: [], textures: [], shaders: [], vaos: [], contexts: [], offscreenCanvases: {}, queries: [], samplers: [], transformFeedbacks: [], syncs: [], stringCache: {}, stringiCache: {}, unpackAlignment: 4, unpackRowLength: 0, recordError: (errorCode) => {
      if (!GL.lastError) {
        GL.lastError = errorCode;
      }
    }, getNewId: (table) => {
      var ret = GL.counter++;
      for (var i2 = table.length; i2 < ret; i2++) {
        table[i2] = null;
      }
      return ret;
    }, genObject: (n, buffers, createFunction, objectTable) => {
      for (var i2 = 0; i2 < n; i2++) {
        var buffer = GLctx[createFunction]();
        var id = buffer && GL.getNewId(objectTable);
        if (buffer) {
          buffer.name = id;
          objectTable[id] = buffer;
        } else {
          GL.recordError(1282);
        }
        HEAP32[buffers + i2 * 4 >> 2] = id;
      }
    }, getSource: (shader, count, string, length) => {
      var source = "";
      for (var i2 = 0; i2 < count; ++i2) {
        var len = length ? HEAPU32[length + i2 * 4 >> 2] : void 0;
        source += UTF8ToString(HEAPU32[string + i2 * 4 >> 2], len);
      }
      return source;
    }, createContext: (canvas, webGLContextAttributes) => {
      if (!canvas.getContextSafariWebGL2Fixed) {
        let fixedGetContext = function(ver, attrs) {
          var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
          return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
        };
        canvas.getContextSafariWebGL2Fixed = canvas.getContext;
        canvas.getContext = fixedGetContext;
      }
      var ctx = webGLContextAttributes.majorVersion > 1 ? canvas.getContext("webgl2", webGLContextAttributes) : canvas.getContext("webgl", webGLContextAttributes);
      if (!ctx)
        return 0;
      var handle = GL.registerContext(ctx, webGLContextAttributes);
      return handle;
    }, registerContext: (ctx, webGLContextAttributes) => {
      var handle = GL.getNewId(GL.contexts);
      var context = { handle, attributes: webGLContextAttributes, version: webGLContextAttributes.majorVersion, GLctx: ctx };
      if (ctx.canvas)
        ctx.canvas.GLctxObject = context;
      GL.contexts[handle] = context;
      if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
        GL.initExtensions(context);
      }
      return handle;
    }, makeContextCurrent: (contextHandle) => {
      GL.currentContext = GL.contexts[contextHandle];
      Module["ctx"] = GLctx = GL.currentContext?.GLctx;
      return !(contextHandle && !GLctx);
    }, getContext: (contextHandle) => GL.contexts[contextHandle], deleteContext: (contextHandle) => {
      if (GL.currentContext === GL.contexts[contextHandle]) {
        GL.currentContext = null;
      }
      if (typeof JSEvents == "object") {
        JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
      }
      if (GL.contexts[contextHandle]?.GLctx.canvas) {
        GL.contexts[contextHandle].GLctx.canvas.GLctxObject = void 0;
      }
      GL.contexts[contextHandle] = null;
    }, initExtensions: (context) => {
      context || (context = GL.currentContext);
      if (context.initExtensionsDone)
        return;
      context.initExtensionsDone = true;
      var GLctx2 = context.GLctx;
      webgl_enable_WEBGL_multi_draw(GLctx2);
      webgl_enable_EXT_polygon_offset_clamp(GLctx2);
      webgl_enable_EXT_clip_control(GLctx2);
      webgl_enable_WEBGL_polygon_mode(GLctx2);
      webgl_enable_ANGLE_instanced_arrays(GLctx2);
      webgl_enable_OES_vertex_array_object(GLctx2);
      webgl_enable_WEBGL_draw_buffers(GLctx2);
      webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx2);
      webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx2);
      if (context.version >= 2) {
        GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query_webgl2");
      }
      if (context.version < 2 || !GLctx2.disjointTimerQueryExt) {
        GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query");
      }
      getEmscriptenSupportedExtensions(GLctx2).forEach((ext) => {
        if (!ext.includes("lose_context") && !ext.includes("debug")) {
          GLctx2.getExtension(ext);
        }
      });
    } };
    var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
    var _emscripten_glActiveTexture = _glActiveTexture;
    var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };
    var _emscripten_glAttachShader = _glAttachShader;
    var _glBindAttribLocation = (program, index, name) => {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
    };
    var _emscripten_glBindAttribLocation = _glBindAttribLocation;
    var _glBindBuffer = (target, buffer) => {
      if (target == 35051) {
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 35052) {
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };
    var _emscripten_glBindBuffer = _glBindBuffer;
    var _glBindBufferBase = (target, index, buffer) => {
      GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
    };
    var _emscripten_glBindBufferBase = _glBindBufferBase;
    var _glBindFramebuffer = (target, framebuffer) => {
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
    };
    var _emscripten_glBindFramebuffer = _glBindFramebuffer;
    var _glBindRenderbuffer = (target, renderbuffer) => {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
    };
    var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;
    var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };
    var _emscripten_glBindTexture = _glBindTexture;
    var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
    };
    var _emscripten_glBindVertexArray = _glBindVertexArray;
    var _glBindVertexArrayOES = _glBindVertexArray;
    var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;
    var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
    var _emscripten_glBlendColor = _glBlendColor;
    var _glBlendEquation = (x0) => GLctx.blendEquation(x0);
    var _emscripten_glBlendEquation = _glBlendEquation;
    var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
    var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;
    var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
    var _emscripten_glBlendFunc = _glBlendFunc;
    var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
    var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;
    var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);
    var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;
    var _glBufferData = (target, size, data, usage) => {
      if (GL.currentContext.version >= 2) {
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size);
        } else {
          GLctx.bufferData(target, size, usage);
        }
        return;
      }
      GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
    };
    var _emscripten_glBufferData = _glBufferData;
    var _glBufferSubData = (target, offset, size, data) => {
      if (GL.currentContext.version >= 2) {
        size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
        return;
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size));
    };
    var _emscripten_glBufferSubData = _glBufferSubData;
    var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
    var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;
    var _glClear = (x0) => GLctx.clear(x0);
    var _emscripten_glClear = _glClear;
    var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
    var _emscripten_glClearColor = _glClearColor;
    var _glClearDepthf = (x0) => GLctx.clearDepth(x0);
    var _emscripten_glClearDepthf = _glClearDepthf;
    var _glClearStencil = (x0) => GLctx.clearStencil(x0);
    var _emscripten_glClearStencil = _glClearStencil;
    var _glColorMask = (red, green, blue, alpha) => {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    };
    var _emscripten_glColorMask = _glColorMask;
    var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };
    var _emscripten_glCompileShader = _glCompileShader;
    var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
          return;
        }
        GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
        return;
      }
      GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray(data, data + imageSize));
    };
    var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;
    var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
          return;
        }
        GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8, data, imageSize);
        return;
      }
      GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray(data, data + imageSize));
    };
    var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;
    var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
    var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;
    var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      program.name = id;
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };
    var _emscripten_glCreateProgram = _glCreateProgram;
    var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
      return id;
    };
    var _emscripten_glCreateShader = _glCreateShader;
    var _glCullFace = (x0) => GLctx.cullFace(x0);
    var _emscripten_glCullFace = _glCullFace;
    var _glDeleteBuffers = (n, buffers) => {
      for (var i2 = 0; i2 < n; i2++) {
        var id = HEAP32[buffers + i2 * 4 >> 2];
        var buffer = GL.buffers[id];
        if (!buffer)
          continue;
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
        if (id == GLctx.currentPixelPackBufferBinding)
          GLctx.currentPixelPackBufferBinding = 0;
        if (id == GLctx.currentPixelUnpackBufferBinding)
          GLctx.currentPixelUnpackBufferBinding = 0;
      }
    };
    var _emscripten_glDeleteBuffers = _glDeleteBuffers;
    var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i2 = 0; i2 < n; ++i2) {
        var id = HEAP32[framebuffers + i2 * 4 >> 2];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer)
          continue;
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };
    var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;
    var _glDeleteProgram = (id) => {
      if (!id)
        return;
      var program = GL.programs[id];
      if (!program) {
        GL.recordError(1281);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };
    var _emscripten_glDeleteProgram = _glDeleteProgram;
    var _glDeleteRenderbuffers = (n, renderbuffers) => {
      for (var i2 = 0; i2 < n; i2++) {
        var id = HEAP32[renderbuffers + i2 * 4 >> 2];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer)
          continue;
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    };
    var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;
    var _glDeleteShader = (id) => {
      if (!id)
        return;
      var shader = GL.shaders[id];
      if (!shader) {
        GL.recordError(1281);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };
    var _emscripten_glDeleteShader = _glDeleteShader;
    var _glDeleteSync = (id) => {
      if (!id)
        return;
      var sync = GL.syncs[id];
      if (!sync) {
        GL.recordError(1281);
        return;
      }
      GLctx.deleteSync(sync);
      sync.name = 0;
      GL.syncs[id] = null;
    };
    var _emscripten_glDeleteSync = _glDeleteSync;
    var _glDeleteTextures = (n, textures) => {
      for (var i2 = 0; i2 < n; i2++) {
        var id = HEAP32[textures + i2 * 4 >> 2];
        var texture = GL.textures[id];
        if (!texture)
          continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };
    var _emscripten_glDeleteTextures = _glDeleteTextures;
    var _glDeleteVertexArrays = (n, vaos) => {
      for (var i2 = 0; i2 < n; i2++) {
        var id = HEAP32[vaos + i2 * 4 >> 2];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null;
      }
    };
    var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;
    var _glDeleteVertexArraysOES = _glDeleteVertexArrays;
    var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;
    var _glDepthFunc = (x0) => GLctx.depthFunc(x0);
    var _emscripten_glDepthFunc = _glDepthFunc;
    var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };
    var _emscripten_glDepthMask = _glDepthMask;
    var _glDisable = (x0) => GLctx.disable(x0);
    var _emscripten_glDisable = _glDisable;
    var _glDisableVertexAttribArray = (index) => {
      GLctx.disableVertexAttribArray(index);
    };
    var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;
    var _glDrawArrays = (mode, first, count) => {
      GLctx.drawArrays(mode, first, count);
    };
    var _emscripten_glDrawArrays = _glDrawArrays;
    var _glDrawElements = (mode, count, type, indices) => {
      GLctx.drawElements(mode, count, type, indices);
    };
    var _emscripten_glDrawElements = _glDrawElements;
    var _glEnable = (x0) => GLctx.enable(x0);
    var _emscripten_glEnable = _glEnable;
    var _glEnableVertexAttribArray = (index) => {
      GLctx.enableVertexAttribArray(index);
    };
    var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;
    var _glFenceSync = (condition, flags) => {
      var sync = GLctx.fenceSync(condition, flags);
      if (sync) {
        var id = GL.getNewId(GL.syncs);
        sync.name = id;
        GL.syncs[id] = sync;
        return id;
      }
      return 0;
    };
    var _emscripten_glFenceSync = _glFenceSync;
    var _glFinish = () => GLctx.finish();
    var _emscripten_glFinish = _glFinish;
    var _glFlush = () => GLctx.flush();
    var _emscripten_glFlush = _glFlush;
    var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
      GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
    };
    var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;
    var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
      GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
    };
    var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;
    var _glFrontFace = (x0) => GLctx.frontFace(x0);
    var _emscripten_glFrontFace = _glFrontFace;
    var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, "createBuffer", GL.buffers);
    };
    var _emscripten_glGenBuffers = _glGenBuffers;
    var _glGenFramebuffers = (n, ids) => {
      GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
    };
    var _emscripten_glGenFramebuffers = _glGenFramebuffers;
    var _glGenRenderbuffers = (n, renderbuffers) => {
      GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
    };
    var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;
    var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, "createTexture", GL.textures);
    };
    var _emscripten_glGenTextures = _glGenTextures;
    var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, "createVertexArray", GL.vaos);
    };
    var _emscripten_glGenVertexArrays = _glGenVertexArrays;
    var _glGenVertexArraysOES = _glGenVertexArrays;
    var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;
    var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
    var _emscripten_glGenerateMipmap = _glGenerateMipmap;
    var _glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    var _emscripten_glGetAttribLocation = _glGetAttribLocation;
    var writeI53ToI64 = (ptr, num) => {
      HEAPU32[ptr >> 2] = num;
      var lower = HEAPU32[ptr >> 2];
      HEAPU32[ptr + 4 >> 2] = (num - lower) / 4294967296;
    };
    var webglGetExtensions = () => {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
    var emscriptenWebGLGet = (name_, p, type) => {
      if (!p) {
        GL.recordError(1281);
        return;
      }
      var ret = void 0;
      switch (name_) {
        case 36346:
          ret = 1;
          break;
        case 36344:
          if (type != 0 && type != 1) {
            GL.recordError(1280);
          }
          return;
        case 34814:
        case 36345:
          ret = 0;
          break;
        case 34466:
          var formats = GLctx.getParameter(34467);
          ret = formats ? formats.length : 0;
          break;
        case 33309:
          if (GL.currentContext.version < 2) {
            GL.recordError(1282);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 33307:
        case 33308:
          if (GL.currentContext.version < 2) {
            GL.recordError(1280);
            return;
          }
          ret = name_ == 33307 ? 3 : 0;
          break;
      }
      if (ret === void 0) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(1280);
            return;
          case "object":
            if (result === null) {
              switch (name_) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 36662:
                case 36663:
                case 35053:
                case 35055:
                case 36010:
                case 35097:
                case 35869:
                case 32874:
                case 36389:
                case 35983:
                case 35368:
                case 34068: {
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(1280);
                  return;
                }
              }
            } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
              for (var i2 = 0; i2 < result.length; ++i2) {
                switch (type) {
                  case 0:
                    HEAP32[p + i2 * 4 >> 2] = result[i2];
                    break;
                  case 2:
                    HEAPF32[p + i2 * 4 >> 2] = result[i2];
                    break;
                  case 4:
                    HEAP8[p + i2] = result[i2] ? 1 : 0;
                    break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch (e) {
                GL.recordError(1280);
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(1280);
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`);
            return;
        }
      }
      switch (type) {
        case 1:
          writeI53ToI64(p, ret);
          break;
        case 0:
          HEAP32[p >> 2] = ret;
          break;
        case 2:
          HEAPF32[p >> 2] = ret;
          break;
        case 4:
          HEAP8[p] = ret ? 1 : 0;
          break;
      }
    };
    var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
    var _emscripten_glGetBooleanv = _glGetBooleanv;
    var _glGetBufferParameteriv = (target, value, data) => {
      if (!data) {
        GL.recordError(1281);
        return;
      }
      HEAP32[data >> 2] = GLctx.getBufferParameter(target, value);
    };
    var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;
    var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0;
      return error;
    };
    var _emscripten_glGetError = _glGetError;
    var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
      var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
      if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
        result = result.name | 0;
      }
      HEAP32[params >> 2] = result;
    };
    var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;
    var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
    var _emscripten_glGetIntegerv = _glGetIntegerv;
    var _glGetInternalformativ = (target, internalformat, pname, bufSize, params) => {
      if (bufSize < 0) {
        GL.recordError(1281);
        return;
      }
      if (!params) {
        GL.recordError(1281);
        return;
      }
      var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
      if (ret === null)
        return;
      for (var i2 = 0; i2 < ret.length && i2 < bufSize; ++i2) {
        HEAP32[params + i2 * 4 >> 2] = ret[i2];
      }
    };
    var _emscripten_glGetInternalformativ = _glGetInternalformativ;
    var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null)
        log = "(unknown error)";
      var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length)
        HEAP32[length >> 2] = numBytesWrittenExclNull;
    };
    var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;
    var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        GL.recordError(1281);
        return;
      }
      if (program >= GL.counter) {
        GL.recordError(1281);
        return;
      }
      program = GL.programs[program];
      if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(program);
        if (log === null)
          log = "(unknown error)";
        HEAP32[p >> 2] = log.length + 1;
      } else if (pname == 35719) {
        if (!program.maxUniformLength) {
          var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
          for (var i2 = 0; i2 < numActiveUniforms; ++i2) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i2).name.length + 1);
          }
        }
        HEAP32[p >> 2] = program.maxUniformLength;
      } else if (pname == 35722) {
        if (!program.maxAttributeLength) {
          var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
          for (var i2 = 0; i2 < numActiveAttributes; ++i2) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i2).name.length + 1);
          }
        }
        HEAP32[p >> 2] = program.maxAttributeLength;
      } else if (pname == 35381) {
        if (!program.maxUniformBlockNameLength) {
          var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
          for (var i2 = 0; i2 < numActiveUniformBlocks; ++i2) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i2).length + 1);
          }
        }
        HEAP32[p >> 2] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname);
      }
    };
    var _emscripten_glGetProgramiv = _glGetProgramiv;
    var _glGetRenderbufferParameteriv = (target, pname, params) => {
      if (!params) {
        GL.recordError(1281);
        return;
      }
      HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname);
    };
    var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;
    var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null)
        log = "(unknown error)";
      var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length)
        HEAP32[length >> 2] = numBytesWrittenExclNull;
    };
    var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;
    var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
      var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
      HEAP32[range >> 2] = result.rangeMin;
      HEAP32[range + 4 >> 2] = result.rangeMax;
      HEAP32[precision >> 2] = result.precision;
    };
    var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;
    var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        GL.recordError(1281);
        return;
      }
      if (pname == 35716) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null)
          log = "(unknown error)";
        var logLength = log ? log.length + 1 : 0;
        HEAP32[p >> 2] = logLength;
      } else if (pname == 35720) {
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[p >> 2] = sourceLength;
      } else {
        HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };
    var _emscripten_glGetShaderiv = _glGetShaderiv;
    var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret)
        stringToUTF8(str, ret, size);
      return ret;
    };
    var _glGetString = (name_) => {
      var ret = GL.stringCache[name_];
      if (!ret) {
        switch (name_) {
          case 7939:
            ret = stringToNewUTF8(webglGetExtensions().join(" "));
            break;
          case 7936:
          case 7937:
          case 37445:
          case 37446:
            var s = GLctx.getParameter(name_);
            if (!s) {
              GL.recordError(1280);
            }
            ret = s ? stringToNewUTF8(s) : 0;
            break;
          case 7938:
            var webGLVersion = GLctx.getParameter(7938);
            var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
            if (GL.currentContext.version >= 2)
              glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
            ret = stringToNewUTF8(glVersion);
            break;
          case 35724:
            var glslVersion = GLctx.getParameter(35724);
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
              if (ver_num[1].length == 3)
                ver_num[1] = ver_num[1] + "0";
              glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
            }
            ret = stringToNewUTF8(glslVersion);
            break;
          default:
            GL.recordError(1280);
        }
        GL.stringCache[name_] = ret;
      }
      return ret;
    };
    var _emscripten_glGetString = _glGetString;
    var _glGetStringi = (name, index) => {
      if (GL.currentContext.version < 2) {
        GL.recordError(1282);
        return 0;
      }
      var stringiCache = GL.stringiCache[name];
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(1281);
          return 0;
        }
        return stringiCache[index];
      }
      switch (name) {
        case 7939:
          var exts = webglGetExtensions().map(stringToNewUTF8);
          stringiCache = GL.stringiCache[name] = exts;
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281);
            return 0;
          }
          return stringiCache[index];
        default:
          GL.recordError(1280);
          return 0;
      }
    };
    var _emscripten_glGetStringi = _glGetStringi;
    var _glGetUniformBlockIndex = (program, uniformBlockName) => GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
    var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;
    var jstoi_q = (str) => parseInt(str);
    var webglGetLeftBracePos = (name) => name.slice(-1) == "]" && name.lastIndexOf("[");
    var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i2, j;
      if (!uniformLocsById) {
        program.uniformLocsById = uniformLocsById = {};
        program.uniformArrayNamesById = {};
        var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
        for (i2 = 0; i2 < numActiveUniforms; ++i2) {
          var u = GLctx.getActiveUniform(program, i2);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          uniformSizeAndIdsByName[arrayName] = [sz, id];
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
    var _glGetUniformLocation = (program, name) => {
      name = UTF8ToString(name);
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById;
        var arrayIndex = 0;
        var uniformBaseName = name;
        var leftBrace = webglGetLeftBracePos(name);
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
          uniformBaseName = name.slice(0, leftBrace);
        }
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1];
          if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
            return arrayIndex;
          }
        }
      } else {
        GL.recordError(1281);
      }
      return -1;
    };
    var _emscripten_glGetUniformLocation = _glGetUniformLocation;
    var _glGetVertexAttribPointerv = (index, pname, pointer) => {
      if (!pointer) {
        GL.recordError(1281);
        return;
      }
      HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname);
    };
    var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;
    var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
      if (!params) {
        GL.recordError(1281);
        return;
      }
      var data = GLctx.getVertexAttrib(index, pname);
      if (pname == 34975) {
        HEAP32[params >> 2] = data && data["name"];
      } else if (typeof data == "number" || typeof data == "boolean") {
        switch (type) {
          case 0:
            HEAP32[params >> 2] = data;
            break;
          case 2:
            HEAPF32[params >> 2] = data;
            break;
          case 5:
            HEAP32[params >> 2] = Math.fround(data);
            break;
        }
      } else {
        for (var i2 = 0; i2 < data.length; i2++) {
          switch (type) {
            case 0:
              HEAP32[params + i2 * 4 >> 2] = data[i2];
              break;
            case 2:
              HEAPF32[params + i2 * 4 >> 2] = data[i2];
              break;
            case 5:
              HEAP32[params + i2 * 4 >> 2] = Math.fround(data[i2]);
              break;
          }
        }
      }
    };
    var _glGetVertexAttribiv = (index, pname, params) => {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
    };
    var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;
    var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
    var _emscripten_glIsEnabled = _glIsEnabled;
    var _glIsTexture = (id) => {
      var texture = GL.textures[id];
      if (!texture)
        return 0;
      return GLctx.isTexture(texture);
    };
    var _emscripten_glIsTexture = _glIsTexture;
    var _glLineWidth = (x0) => GLctx.lineWidth(x0);
    var _emscripten_glLineWidth = _glLineWidth;
    var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      program.uniformLocsById = 0;
      program.uniformSizeAndIdsByName = {};
    };
    var _emscripten_glLinkProgram = _glLinkProgram;
    var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };
    var _emscripten_glPixelStorei = _glPixelStorei;
    var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
      function roundedToNextMultipleOf(x, y) {
        return x + y - 1 & -y;
      }
      var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
      return height * alignedRowSize;
    };
    var colorChannelsInGlTextureFormat = (format) => {
      var colorChannels = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 };
      return colorChannels[format - 6402] || 1;
    };
    var heapObjectForWebGLType = (type) => {
      type -= 5120;
      if (type == 0)
        return HEAP8;
      if (type == 1)
        return HEAPU8;
      if (type == 2)
        return HEAP16;
      if (type == 4)
        return HEAP32;
      if (type == 6)
        return HEAPF32;
      if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782)
        return HEAPU32;
      return HEAPU16;
    };
    var toTypedArrayIndex = (pointer, heap) => pointer >>> 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
    var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
      return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
    };
    var _glReadPixels = (x, y, width, height, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels);
          return;
        }
        var heap = heapObjectForWebGLType(type);
        var target = toTypedArrayIndex(pixels, heap);
        GLctx.readPixels(x, y, width, height, format, type, heap, target);
        return;
      }
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels);
      if (!pixelData) {
        GL.recordError(1280);
        return;
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData);
    };
    var _emscripten_glReadPixels = _glReadPixels;
    var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
    var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;
    var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);
    var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;
    var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
    var _emscripten_glScissor = _glScissor;
    var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
      GLctx.shaderSource(GL.shaders[shader], source);
    };
    var _emscripten_glShaderSource = _glShaderSource;
    var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
    var _emscripten_glStencilFunc = _glStencilFunc;
    var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
    var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;
    var _glStencilMask = (x0) => GLctx.stencilMask(x0);
    var _emscripten_glStencilMask = _glStencilMask;
    var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
    var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;
    var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
    var _emscripten_glStencilOp = _glStencilOp;
    var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
    var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;
    var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
          return;
        }
        if (pixels) {
          var heap = heapObjectForWebGLType(type);
          var index = toTypedArrayIndex(pixels, heap);
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
          return;
        }
      }
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels) : null;
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
    };
    var _emscripten_glTexImage2D = _glTexImage2D;
    var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
    var _emscripten_glTexParameterf = _glTexParameterf;
    var _glTexParameterfv = (target, pname, params) => {
      var param = HEAPF32[params >> 2];
      GLctx.texParameterf(target, pname, param);
    };
    var _emscripten_glTexParameterfv = _glTexParameterfv;
    var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
    var _emscripten_glTexParameteri = _glTexParameteri;
    var _glTexParameteriv = (target, pname, params) => {
      var param = HEAP32[params >> 2];
      GLctx.texParameteri(target, pname, param);
    };
    var _emscripten_glTexParameteriv = _glTexParameteriv;
    var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
          return;
        }
        if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
          return;
        }
      }
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels) : null;
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
    };
    var _emscripten_glTexSubImage2D = _glTexSubImage2D;
    var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        if (typeof webglLoc == "number") {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
        }
        return webglLoc;
      } else {
        GL.recordError(1282);
      }
    };
    var _glUniform1f = (location, v0) => {
      GLctx.uniform1f(webglGetUniformLocation(location), v0);
    };
    var _emscripten_glUniform1f = _glUniform1f;
    var miniTempWebGLFloatBuffers = [];
    var _glUniform1fv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count);
        return;
      }
      if (count <= 288) {
        var view = miniTempWebGLFloatBuffers[count];
        for (var i2 = 0; i2 < count; ++i2) {
          view[i2] = HEAPF32[value + 4 * i2 >> 2];
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, value + count * 4 >> 2);
      }
      GLctx.uniform1fv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform1fv = _glUniform1fv;
    var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };
    var _emscripten_glUniform1i = _glUniform1i;
    var miniTempWebGLIntBuffers = [];
    var _glUniform1iv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, value >> 2, count);
        return;
      }
      if (count <= 288) {
        var view = miniTempWebGLIntBuffers[count];
        for (var i2 = 0; i2 < count; ++i2) {
          view[i2] = HEAP32[value + 4 * i2 >> 2];
        }
      } else {
        var view = HEAP32.subarray(value >> 2, value + count * 4 >> 2);
      }
      GLctx.uniform1iv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform1iv = _glUniform1iv;
    var _glUniform2f = (location, v0, v1) => {
      GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
    };
    var _emscripten_glUniform2f = _glUniform2f;
    var _glUniform2fv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 2);
        return;
      }
      if (count <= 144) {
        count *= 2;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i2 = 0; i2 < count; i2 += 2) {
          view[i2] = HEAPF32[value + 4 * i2 >> 2];
          view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, value + count * 8 >> 2);
      }
      GLctx.uniform2fv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform2fv = _glUniform2fv;
    var _glUniform2i = (location, v0, v1) => {
      GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
    };
    var _emscripten_glUniform2i = _glUniform2i;
    var _glUniform2iv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 2);
        return;
      }
      if (count <= 144) {
        count *= 2;
        var view = miniTempWebGLIntBuffers[count];
        for (var i2 = 0; i2 < count; i2 += 2) {
          view[i2] = HEAP32[value + 4 * i2 >> 2];
          view[i2 + 1] = HEAP32[value + (4 * i2 + 4) >> 2];
        }
      } else {
        var view = HEAP32.subarray(value >> 2, value + count * 8 >> 2);
      }
      GLctx.uniform2iv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform2iv = _glUniform2iv;
    var _glUniform3f = (location, v0, v1, v2) => {
      GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
    };
    var _emscripten_glUniform3f = _glUniform3f;
    var _glUniform3fv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 3);
        return;
      }
      if (count <= 96) {
        count *= 3;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i2 = 0; i2 < count; i2 += 3) {
          view[i2] = HEAPF32[value + 4 * i2 >> 2];
          view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
          view[i2 + 2] = HEAPF32[value + (4 * i2 + 8) >> 2];
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, value + count * 12 >> 2);
      }
      GLctx.uniform3fv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform3fv = _glUniform3fv;
    var _glUniform3i = (location, v0, v1, v2) => {
      GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
    };
    var _emscripten_glUniform3i = _glUniform3i;
    var _glUniform3iv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 3);
        return;
      }
      if (count <= 96) {
        count *= 3;
        var view = miniTempWebGLIntBuffers[count];
        for (var i2 = 0; i2 < count; i2 += 3) {
          view[i2] = HEAP32[value + 4 * i2 >> 2];
          view[i2 + 1] = HEAP32[value + (4 * i2 + 4) >> 2];
          view[i2 + 2] = HEAP32[value + (4 * i2 + 8) >> 2];
        }
      } else {
        var view = HEAP32.subarray(value >> 2, value + count * 12 >> 2);
      }
      GLctx.uniform3iv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform3iv = _glUniform3iv;
    var _glUniform4f = (location, v0, v1, v2, v3) => {
      GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
    var _emscripten_glUniform4f = _glUniform4f;
    var _glUniform4fv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 4);
        return;
      }
      if (count <= 72) {
        var view = miniTempWebGLFloatBuffers[4 * count];
        var heap = HEAPF32;
        value = value >> 2;
        count *= 4;
        for (var i2 = 0; i2 < count; i2 += 4) {
          var dst = value + i2;
          view[i2] = heap[dst];
          view[i2 + 1] = heap[dst + 1];
          view[i2 + 2] = heap[dst + 2];
          view[i2 + 3] = heap[dst + 3];
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
      }
      GLctx.uniform4fv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform4fv = _glUniform4fv;
    var _glUniform4i = (location, v0, v1, v2, v3) => {
      GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
    var _emscripten_glUniform4i = _glUniform4i;
    var _glUniform4iv = (location, count, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 4);
        return;
      }
      if (count <= 72) {
        count *= 4;
        var view = miniTempWebGLIntBuffers[count];
        for (var i2 = 0; i2 < count; i2 += 4) {
          view[i2] = HEAP32[value + 4 * i2 >> 2];
          view[i2 + 1] = HEAP32[value + (4 * i2 + 4) >> 2];
          view[i2 + 2] = HEAP32[value + (4 * i2 + 8) >> 2];
          view[i2 + 3] = HEAP32[value + (4 * i2 + 12) >> 2];
        }
      } else {
        var view = HEAP32.subarray(value >> 2, value + count * 16 >> 2);
      }
      GLctx.uniform4iv(webglGetUniformLocation(location), view);
    };
    var _emscripten_glUniform4iv = _glUniform4iv;
    var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
      program = GL.programs[program];
      GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
    };
    var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;
    var _glUniformMatrix2fv = (location, count, transpose, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 4);
        return;
      }
      if (count <= 72) {
        count *= 4;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i2 = 0; i2 < count; i2 += 4) {
          view[i2] = HEAPF32[value + 4 * i2 >> 2];
          view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
          view[i2 + 2] = HEAPF32[value + (4 * i2 + 8) >> 2];
          view[i2 + 3] = HEAPF32[value + (4 * i2 + 12) >> 2];
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
      }
      GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
    };
    var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;
    var _glUniformMatrix3fv = (location, count, transpose, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 9);
        return;
      }
      if (count <= 32) {
        count *= 9;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i2 = 0; i2 < count; i2 += 9) {
          view[i2] = HEAPF32[value + 4 * i2 >> 2];
          view[i2 + 1] = HEAPF32[value + (4 * i2 + 4) >> 2];
          view[i2 + 2] = HEAPF32[value + (4 * i2 + 8) >> 2];
          view[i2 + 3] = HEAPF32[value + (4 * i2 + 12) >> 2];
          view[i2 + 4] = HEAPF32[value + (4 * i2 + 16) >> 2];
          view[i2 + 5] = HEAPF32[value + (4 * i2 + 20) >> 2];
          view[i2 + 6] = HEAPF32[value + (4 * i2 + 24) >> 2];
          view[i2 + 7] = HEAPF32[value + (4 * i2 + 28) >> 2];
          view[i2 + 8] = HEAPF32[value + (4 * i2 + 32) >> 2];
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, value + count * 36 >> 2);
      }
      GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
    };
    var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;
    var _glUniformMatrix4fv = (location, count, transpose, value) => {
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16);
        return;
      }
      if (count <= 18) {
        var view = miniTempWebGLFloatBuffers[16 * count];
        var heap = HEAPF32;
        value = value >> 2;
        count *= 16;
        for (var i2 = 0; i2 < count; i2 += 16) {
          var dst = value + i2;
          view[i2] = heap[dst];
          view[i2 + 1] = heap[dst + 1];
          view[i2 + 2] = heap[dst + 2];
          view[i2 + 3] = heap[dst + 3];
          view[i2 + 4] = heap[dst + 4];
          view[i2 + 5] = heap[dst + 5];
          view[i2 + 6] = heap[dst + 6];
          view[i2 + 7] = heap[dst + 7];
          view[i2 + 8] = heap[dst + 8];
          view[i2 + 9] = heap[dst + 9];
          view[i2 + 10] = heap[dst + 10];
          view[i2 + 11] = heap[dst + 11];
          view[i2 + 12] = heap[dst + 12];
          view[i2 + 13] = heap[dst + 13];
          view[i2 + 14] = heap[dst + 14];
          view[i2 + 15] = heap[dst + 15];
        }
      } else {
        var view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2);
      }
      GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
    };
    var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;
    var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      GLctx.currentProgram = program;
    };
    var _emscripten_glUseProgram = _glUseProgram;
    var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
    var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;
    var _glVertexAttrib2fv = (index, v) => {
      GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2]);
    };
    var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;
    var _glVertexAttrib3fv = (index, v) => {
      GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2]);
    };
    var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;
    var _glVertexAttrib4fv = (index, v) => {
      GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[v + 4 >> 2], HEAPF32[v + 8 >> 2], HEAPF32[v + 12 >> 2]);
    };
    var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;
    var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };
    var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;
    var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
    var _emscripten_glViewport = _glViewport;
    var _glWaitSync = (sync, flags, timeout) => {
      timeout = Number(timeout);
      GLctx.waitSync(GL.syncs[sync], flags, timeout);
    };
    var _emscripten_glWaitSync = _glWaitSync;
    var getHeapMax = () => 2147483648;
    var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
    var growMemory = (size) => {
      var oldHeapSize = wasmMemory.buffer.byteLength;
      var pages = (size - oldHeapSize + 65535) / 65536 | 0;
      try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1;
      } catch (e) {
      }
    };
    var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      requestedSize >>>= 0;
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
          return true;
        }
      }
      return false;
    };
    var webglPowerPreferences = ["default", "low-power", "high-performance"];
    var _emscripten_webgl_do_create_context = (target, attributes) => {
      var attr32 = attributes >> 2;
      var powerPreference = HEAP32[attr32 + (8 >> 2)];
      var contextAttributes = { alpha: !!HEAP8[attributes + 0], depth: !!HEAP8[attributes + 1], stencil: !!HEAP8[attributes + 2], antialias: !!HEAP8[attributes + 3], premultipliedAlpha: !!HEAP8[attributes + 4], preserveDrawingBuffer: !!HEAP8[attributes + 5], powerPreference: webglPowerPreferences[powerPreference], failIfMajorPerformanceCaveat: !!HEAP8[attributes + 12], majorVersion: HEAP32[attr32 + (16 >> 2)], minorVersion: HEAP32[attr32 + (20 >> 2)], enableExtensionsByDefault: HEAP8[attributes + 24], explicitSwapControl: HEAP8[attributes + 25], proxyContextToMainThread: HEAP32[attr32 + (28 >> 2)], renderViaOffscreenBackBuffer: HEAP8[attributes + 32] };
      var canvas = findCanvasEventTarget(target);
      if (!canvas) {
        return 0;
      }
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
    var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;
    var _emscripten_webgl_destroy_context = (contextHandle) => {
      if (GL.currentContext == contextHandle)
        GL.currentContext = 0;
      GL.deleteContext(contextHandle);
    };
    var _emscripten_webgl_do_get_current_context = () => GL.currentContext ? GL.currentContext.handle : 0;
    var _emscripten_webgl_get_current_context = _emscripten_webgl_do_get_current_context;
    var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i2 = 0; i2 < iovcnt; i2++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0)
          return -1;
        ret += curr;
        if (curr < len)
          break;
        if (typeof offset != "undefined") {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doReadv(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    function _fd_seek(fd, offset, whence, newOffset) {
      offset = bigintToI53Checked(offset);
      try {
        if (isNaN(offset))
          return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        HEAP64[newOffset >> 3] = BigInt(stream.position);
        if (stream.getdents && offset === 0 && whence === 0)
          stream.getdents = null;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i2 = 0; i2 < iovcnt; i2++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0)
          return -1;
        ret += curr;
        if (curr < len) {
          break;
        }
        if (typeof offset != "undefined") {
          offset += curr;
        }
      }
      return ret;
    };
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
          throw e;
        return e.errno;
      }
    }
    FS.createPreloadedFile = FS_createPreloadedFile;
    FS.preloadFile = FS_preloadFile;
    FS.staticInit();
    init_ClassHandle();
    init_RegisteredPointer();
    var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
    for (var i = 0; i <= 288; ++i) {
      miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
    }
    var miniTempWebGLIntBuffersStorage = new Int32Array(288);
    for (var i = 0; i <= 288; ++i) {
      miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
    }
    {
      if (Module["noExitRuntime"])
        Module["noExitRuntime"];
      if (Module["preloadPlugins"])
        preloadPlugins = Module["preloadPlugins"];
      if (Module["print"])
        out = Module["print"];
      if (Module["printErr"])
        err = Module["printErr"];
      if (Module["wasmBinary"])
        wasmBinary = Module["wasmBinary"];
      if (Module["arguments"])
        Module["arguments"];
      if (Module["thisProgram"])
        Module["thisProgram"];
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function")
          Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) {
          Module["preInit"].shift()();
        }
      }
    }
    Module["GL"] = GL;
    var ___getTypeName, _malloc, _free;
    function assignWasmExports(wasmExports2) {
      ___getTypeName = wasmExports2["Cc"];
      Module["_malloc"] = _malloc = wasmExports2["Ec"];
      Module["_free"] = _free = wasmExports2["Fc"];
    }
    var wasmImports = { w: ___cxa_throw, K: ___syscall_fcntl64, hb: ___syscall_getdents64, pb: ___syscall_ioctl, fb: ___syscall_mkdirat, L: ___syscall_openat, kb: ___syscall_renameat, lb: ___syscall_rmdir, gb: ___syscall_stat64, mb: ___syscall_unlinkat, qb: __abort_js, u: __embind_finalize_value_object, H: __embind_register_bigint, db: __embind_register_bool, i: __embind_register_class, h: __embind_register_class_class_function, v: __embind_register_class_constructor, a: __embind_register_class_function, g: __embind_register_class_property, bb: __embind_register_emval, B: __embind_register_enum, o: __embind_register_enum_value, G: __embind_register_float, I: __embind_register_function, p: __embind_register_integer, j: __embind_register_memory_view, y: __embind_register_optional, n: __embind_register_smart_ptr, cb: __embind_register_std_string, D: __embind_register_std_wstring, t: __embind_register_value_object, l: __embind_register_value_object_field, eb: __embind_register_void, c: __emval_create_invoker, d: __emval_decref, F: __emval_equals, x: __emval_get_global, k: __emval_get_module_property, q: __emval_get_property, f: __emval_incref, _a: __emval_instanceof, b: __emval_invoke, ab: __emval_new_array, s: __emval_new_cstring, $a: __emval_new_object, e: __emval_run_destructors, C: __emval_set_property, ib: _clock_time_get, M: _emscripten_get_canvas_element_size, Za: _emscripten_glActiveTexture, Ya: _emscripten_glAttachShader, Wa: _emscripten_glBindAttribLocation, Va: _emscripten_glBindBuffer, vc: _emscripten_glBindBufferBase, Ua: _emscripten_glBindFramebuffer, Ta: _emscripten_glBindRenderbuffer, Sa: _emscripten_glBindTexture, Ab: _emscripten_glBindVertexArray, yb: _emscripten_glBindVertexArrayOES, Ra: _emscripten_glBlendColor, Qa: _emscripten_glBlendEquation, Bb: _emscripten_glBlendEquationSeparate, Pa: _emscripten_glBlendFunc, Oa: _emscripten_glBlendFuncSeparate, tb: _emscripten_glBlitFramebuffer, Na: _emscripten_glBufferData, Ma: _emscripten_glBufferSubData, La: _emscripten_glCheckFramebufferStatus, Ka: _emscripten_glClear, Ja: _emscripten_glClearColor, Ia: _emscripten_glClearDepthf, Ha: _emscripten_glClearStencil, Ga: _emscripten_glColorMask, Fa: _emscripten_glCompileShader, Ea: _emscripten_glCompressedTexImage2D, Da: _emscripten_glCompressedTexSubImage2D, Ca: _emscripten_glCopyTexSubImage2D, Ba: _emscripten_glCreateProgram, Aa: _emscripten_glCreateShader, za: _emscripten_glCullFace, ya: _emscripten_glDeleteBuffers, xa: _emscripten_glDeleteFramebuffers, wa: _emscripten_glDeleteProgram, va: _emscripten_glDeleteRenderbuffers, ua: _emscripten_glDeleteShader, ub: _emscripten_glDeleteSync, ta: _emscripten_glDeleteTextures, sa: _emscripten_glDeleteVertexArrays, xb: _emscripten_glDeleteVertexArraysOES, ra: _emscripten_glDepthFunc, qa: _emscripten_glDepthMask, pa: _emscripten_glDisable, oa: _emscripten_glDisableVertexAttribArray, na: _emscripten_glDrawArrays, ma: _emscripten_glDrawElements, la: _emscripten_glEnable, ka: _emscripten_glEnableVertexAttribArray, vb: _emscripten_glFenceSync, ja: _emscripten_glFinish, ia: _emscripten_glFlush, ha: _emscripten_glFramebufferRenderbuffer, ga: _emscripten_glFramebufferTexture2D, fa: _emscripten_glFrontFace, ea: _emscripten_glGenBuffers, da: _emscripten_glGenFramebuffers, ba: _emscripten_glGenRenderbuffers, aa: _emscripten_glGenTextures, zb: _emscripten_glGenVertexArrays, wb: _emscripten_glGenVertexArraysOES, ca: _emscripten_glGenerateMipmap, Cb: _emscripten_glGetAttribLocation, W: _emscripten_glGetBooleanv, $: _emscripten_glGetBufferParameteriv, _: _emscripten_glGetError, Z: _emscripten_glGetFramebufferAttachmentParameteriv, Y: _emscripten_glGetIntegerv, X: _emscripten_glGetInternalformativ, V: _emscripten_glGetProgramInfoLog, U: _emscripten_glGetProgramiv, T: _emscripten_glGetRenderbufferParameteriv, S: _emscripten_glGetShaderInfoLog, R: _emscripten_glGetShaderPrecisionFormat, Q: _emscripten_glGetShaderiv, P: _emscripten_glGetString, O: _emscripten_glGetStringi, xc: _emscripten_glGetUniformBlockIndex, yc: _emscripten_glGetUniformLocation, zc: _emscripten_glGetVertexAttribPointerv, N: _emscripten_glGetVertexAttribiv, Xa: _emscripten_glIsEnabled, uc: _emscripten_glIsTexture, tc: _emscripten_glLineWidth, sc: _emscripten_glLinkProgram, rc: _emscripten_glPixelStorei, qc: _emscripten_glReadPixels, pc: _emscripten_glRenderbufferStorage, sb: _emscripten_glRenderbufferStorageMultisample, oc: _emscripten_glScissor, nc: _emscripten_glShaderSource, mc: _emscripten_glStencilFunc, lc: _emscripten_glStencilFuncSeparate, kc: _emscripten_glStencilMask, jc: _emscripten_glStencilMaskSeparate, ic: _emscripten_glStencilOp, hc: _emscripten_glStencilOpSeparate, gc: _emscripten_glTexImage2D, fc: _emscripten_glTexParameterf, ec: _emscripten_glTexParameterfv, dc: _emscripten_glTexParameteri, cc: _emscripten_glTexParameteriv, bc: _emscripten_glTexSubImage2D, ac: _emscripten_glUniform1f, $b: _emscripten_glUniform1fv, _b: _emscripten_glUniform1i, Zb: _emscripten_glUniform1iv, Yb: _emscripten_glUniform2f, Xb: _emscripten_glUniform2fv, Wb: _emscripten_glUniform2i, Vb: _emscripten_glUniform2iv, Ub: _emscripten_glUniform3f, Tb: _emscripten_glUniform3fv, Sb: _emscripten_glUniform3i, Rb: _emscripten_glUniform3iv, Qb: _emscripten_glUniform4f, Pb: _emscripten_glUniform4fv, Ob: _emscripten_glUniform4i, Nb: _emscripten_glUniform4iv, wc: _emscripten_glUniformBlockBinding, Mb: _emscripten_glUniformMatrix2fv, Lb: _emscripten_glUniformMatrix3fv, Kb: _emscripten_glUniformMatrix4fv, Jb: _emscripten_glUseProgram, Ib: _emscripten_glVertexAttrib1f, Hb: _emscripten_glVertexAttrib2fv, Gb: _emscripten_glVertexAttrib3fv, Fb: _emscripten_glVertexAttrib4fv, Eb: _emscripten_glVertexAttribPointer, Db: _emscripten_glViewport, rb: _emscripten_glWaitSync, jb: _emscripten_resize_heap, E: _emscripten_webgl_create_context, A: _emscripten_webgl_destroy_context, r: _emscripten_webgl_get_current_context, m: _emscripten_webgl_make_context_current, z: _fd_close, ob: _fd_read, nb: _fd_seek, J: _fd_write };
    function run() {
      if (runDependencies > 0) {
        dependenciesFulfilled = run;
        return;
      }
      preRun();
      if (runDependencies > 0) {
        dependenciesFulfilled = run;
        return;
      }
      function doRun() {
        Module["calledRun"] = true;
        if (ABORT)
          return;
        initRuntime();
        readyPromiseResolve?.(Module);
        Module["onRuntimeInitialized"]?.();
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(() => {
          setTimeout(() => Module["setStatus"](""), 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }
    var wasmExports;
    wasmExports = await createWasm();
    run();
    if (runtimeInitialized) {
      moduleRtn = Module;
    } else {
      moduleRtn = new Promise((resolve, reject) => {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
    }
    return moduleRtn;
  }

  class WebAssemblyQueue {
    constructor() {
      this.executing = false;
      this.queue = [];
    }
    exec(fn, scope, ...args) {
      return new Promise((resolve, reject) => {
        const copyFn = async () => {
          if (!fn) {
            reject(new Error("Function is null!"));
            return;
          }
          try {
            const res = await fn.call(scope, ...args);
            resolve(res);
          } catch (e) {
            reject(e);
          }
        };
        this.queue.push({
          fn: copyFn
        });
        if (this.executing)
          return;
        this.execNextTask();
      });
    }
    execNextTask() {
      if (this.queue.length < 1) {
        this.executing = false;
        return;
      }
      this.executing = true;
      const task = this.queue.shift();
      task.fn().then(() => {
        this.execNextTask();
      });
    }
  }

  const PAGInit = (moduleOption = {}) => PAGInit$1(moduleOption).then((module) => {
    PAGBind(module);
    module.webAssemblyQueue = new WebAssemblyQueue();
    module.globalCanvas = new module.GlobalCanvas();
    module.PAGFont.registerFallbackFontNames();
    return module;
  }).catch((error) => {
    console.error(error);
    throw new Error("PAGInit fail! Please check .wasm file path valid.");
  });

  exports.PAGInit = PAGInit;
  exports.types = types;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=libpag.umd.js.map
