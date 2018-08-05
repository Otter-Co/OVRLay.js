"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../lib/util/util");
const openVrArch = (process.arch == "x64") ? "win64" : "win32";
exports.default = (basePath) => ({
    local: util_1.ArrayToPath(basePath, ["lib_cs", "src_cs.dll"]),
    overlay: util_1.ArrayToPath(basePath, ["lib_cs", "src_ovrlay.dll"]),
    openvr: util_1.ArrayToPath(basePath, ["lib_cs", "openvr", openVrArch, "openvr_api.dll"])
});
