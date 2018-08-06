"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const lib_map_1 = require("../dat/lib_map");
const constants_1 = require("../dat/constants");
const edge_utils_1 = require("./util/edge_utils");
const dll_paths = lib_map_1.default(config_1.default.dll_dir);
const locA = new edge_utils_1.Assembly(dll_paths.local);
const lib_path = `${constants_1.default.CONNECTOR_NAMESPACE}.${constants_1.default.CONNECTOR_TYPENAME}`;
const ConnectorAssembly = locA.mapClass(lib_path);
const GetDirectorMethods = ConnectorAssembly.mapMethod(constants_1.default.DIRECTOR_GET_METHOD);
const GetDirectorCallbackMethods = ConnectorAssembly.mapMethod(constants_1.default.DIRECTOR_GET_CB_METHOD);
exports.I_Director = Object.freeze({
    methods: GetDirectorMethods(),
    callbacks: GetDirectorCallbackMethods(),
});
exports.I_OVRLay = Object.freeze({});
exports.I_PostHandler = Object.freeze({});
