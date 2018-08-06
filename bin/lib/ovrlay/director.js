"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class C_Director extends events.EventEmitter {
    isStarted() { return true; }
    getLastError() { return ''; }
    startup(appType) { return false; }
    shutdown() { }
    pollForEvents() { }
}
exports.C_Director = C_Director;
