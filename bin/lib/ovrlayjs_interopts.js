"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const lib_map_1 = require("./dat/lib_map");
const edge_utils_1 = require("./util/edge_utils");
const dll_paths = lib_map_1.default(config_1.default.dll_dir);
const locA = new edge_utils_1.Assembly(dll_paths.local);
const ConnectorAssembly = locA.mapClass(`${"OVRLayJS" /* CONNECTOR_NAMESPACE */}.${"Connector" /* CONNECTOR_TYPENAME */}`);
const GetDirectorMethod = ConnectorAssembly.mapMethod("GetDirectorMethod" /* DIRECTOR_GET_METHOD */);
const SetDirectorCallback = ConnectorAssembly.mapMethod("GetDirectorCallback" /* DIRECTOR_GET_CB_METHOD */);
exports.I_Director = Object.freeze({
    _assembly: ConnectorAssembly,
    _getDirectorCallback: GetDirectorMethod,
    IsStarted: GetDirectorMethod(0 /* IsStarted */),
    GetLastStartupError: GetDirectorMethod(1 /* GetLastStartupError */),
    Startup: GetDirectorMethod(2 /* Startup */),
    Shutdown: GetDirectorMethod(3 /* Shutdown */),
    PollForEvents: GetDirectorMethod(4 /* PollForEvents */),
});
exports.I_OVRLay = Object.freeze({});
exports.I_PostHandler = Object.freeze({});
