"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_map_1 = require("./dat/lib_map");
const config_1 = require("../config");
const edge_utils_1 = require("./util/edge_utils");
let dll_paths = lib_map_1.default(config_1.default.dll_dir);
const locA = new edge_utils_1.Assembly(dll_paths.local);
exports.I_Director = {
    _assembly: locA.mapClass('OVRLayJS.OVRLay'),
};
exports.I_OVRLay = {};
exports.I_PostHandler = {};
