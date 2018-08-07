"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const ovrlayjs_interopt_1 = require("./ovrlayjs_interopt");
class C_Director extends events.EventEmitter {
    constructor() {
        super();
        let { onStandbyChange, onDashboardChange, onChaperoneSettingsChange, onOpenVRSignaledQuit } = ovrlayjs_interopt_1.I_Director.callbacks;
        onStandbyChange((data, callback) => callback(null, this.emit('standby-change', data) && null), true);
        onDashboardChange((data, callback) => callback(null, this.emit('dashbaord-change', data) && null), true);
        onChaperoneSettingsChange((data, callback) => callback(null, this.emit('chaperone-settings-change') && null), true);
        onOpenVRSignaledQuit((data, callback) => callback(null, this.emit('openvr-signaled-quit') && null), true);
    }
    isStarted() { return C_Director.isStarted(null, true); }
    getLastError() { return C_Director.getLastError(null, true); }
    startup(appType) { return C_Director.startup(appType, true); }
    shutdown() { C_Director.shutdown(null, true); }
    pollForEvents() { C_Director.pollForEvents(null, true); }
}
C_Director.isStarted = ovrlayjs_interopt_1.I_Director.methods.isStarted;
C_Director.getLastError = ovrlayjs_interopt_1.I_Director.methods.getLastError;
C_Director.startup = ovrlayjs_interopt_1.I_Director.methods.startup;
C_Director.shutdown = ovrlayjs_interopt_1.I_Director.methods.shutdown;
C_Director.pollForEvents = ovrlayjs_interopt_1.I_Director.methods.pollForEvents;
exports.C_Director = C_Director;
