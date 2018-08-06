"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.default = (basePath) => ({
    local: path.resolve(basePath, "lib_cs", "OVRLayJS.dll"),
    overlay: path.resolve(basePath, "lib_cs", "OVRLay.dll"),
    openvr: path.resolve(basePath, "lib_cs", "openvr", (process.arch == "x64") ? "win64" : "win32", "openvr_api.dll")
});
