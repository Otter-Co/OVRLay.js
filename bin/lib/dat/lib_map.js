"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (basePath) => ({
    local: path.resolve(basePath, "OVRLayJS.dll"),
    overlay: path.resolve(basePath, "OVRLay.dll"),
    openvr: path.resolve(basePath, "openvr", (process.arch == "x64") ? "win64" : "win32", "openvr_api.dll")
});
