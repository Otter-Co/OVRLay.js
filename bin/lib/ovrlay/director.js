"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const ovrlayjs_interopt_1 = require("./ovrlayjs_interopt");
class C_Director extends events.EventEmitter {
    constructor() {
        super();
        ovrlayjs_interopt_1.I_Director.callbacks.onStandbyChange((data, callback) => callback(null, this.emit('standby-change', data) && null), true);
        ovrlayjs_interopt_1.I_Director.callbacks.onDashboardChange((data, callback) => callback(null, this.emit('dashbaord-change', data) && null), true);
        ovrlayjs_interopt_1.I_Director.callbacks.onChaperoneSettingsChange((data, callback) => callback(null, this.emit('chaperone-settings-change') && null), true);
        ovrlayjs_interopt_1.I_Director.callbacks.onOpenVRSignaledQuit((data, callback) => callback(null, this.emit('openvr-signaled-quit') && null), true);
    }
    isStarted() { return ovrlayjs_interopt_1.I_Director.methods.isStarted(null, true); }
    getLastError() { return ovrlayjs_interopt_1.I_Director.methods.getLastError(null, true); }
    startup(appType) { return ovrlayjs_interopt_1.I_Director.methods.startup(appType, true); }
    shutdown() { ovrlayjs_interopt_1.I_Director.methods.shutdown(null, true); }
    pollForEvents() { ovrlayjs_interopt_1.I_Director.methods.pollForEvents(null, true); }
}
exports.C_Director = C_Director;
