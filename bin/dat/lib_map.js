"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = (basePath) => ({
    local: path_1.default.resolve(basePath, "lib_cs", "src_cs.dll"),
    overlay: path_1.default.resolve(basePath, "lib_cs", "OVRLay.dll"),
    openvr: path_1.default.resolve(basePath, "lib_cs", "openvr", (process.arch == "x64") ? "win64" : "win32", "openvr_api.dll")
});
