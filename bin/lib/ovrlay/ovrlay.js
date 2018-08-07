"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class C_OVRLay extends events.EventEmitter {
    getOptions() { return null; }
    ;
    getLastError() { return ''; }
    isCreated() { return false; }
    constructor(overlayType, overlayKey, overlayName, initalOptions) { super(); }
    createOverlay() { return false; }
    ;
    destroyOverlay() { return false; }
    ;
    setOverlayOptions(opts) { return false; }
    ;
    pollForEvents() { }
    ;
    setTextureType() { return false; }
    setTexture() { return false; }
    setDashboardIconType() { return false; }
    setDashboardIcon() { return false; }
    hide() { }
    ;
    show() { }
    ;
    showKeyboard(description, placeholder) { return false; }
    ;
    hideKeyboard() { return false; }
    ;
}
exports.C_OVRLay = C_OVRLay;
var OVRLayType;
(function (OVRLayType) {
    OVRLayType[OVRLayType["StandardOverlay"] = 0] = "StandardOverlay";
    OVRLayType[OVRLayType["DashboardOverlay"] = 1] = "DashboardOverlay";
})(OVRLayType = exports.OVRLayType || (exports.OVRLayType = {}));
