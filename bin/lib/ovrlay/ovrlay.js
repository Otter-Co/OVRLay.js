"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
var OVRLayType;
(function (OVRLayType) {
    OVRLayType[OVRLayType["StandardOverlay"] = 0] = "StandardOverlay";
    OVRLayType[OVRLayType["DashboardOverlay"] = 1] = "DashboardOverlay";
})(OVRLayType = exports.OVRLayType || (exports.OVRLayType = {}));
class C_Overlay extends events.EventEmitter {
    getOptions() { return null; }
    ;
    getLastError() { return ''; }
    isCreated() { return false; }
    constructor(overlayType, overlayKey, overlayName, initalOptions) { super(); }
    hide() { }
    ;
    show() { }
    ;
    showKeyboard(description, placeholder) { return false; }
    ;
    hideKeyboard() { return false; }
    ;
    createOverlay() { return false; }
    ;
    setOverlayOptions(opts) { return false; }
    ;
    pollForEvents() { }
    ;
}
exports.C_Overlay = C_Overlay;
