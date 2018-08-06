"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_map_1 = require("./lib/dat/lib_map");
const edge_utils_1 = require("./lib/util/edge_utils");
const libPaths = lib_map_1.default(__dirname);
const src_cs = new edge_utils_1.Assembly(libPaths.local);
const OVRLayJS = src_cs.mapClass('OVRLayJS.OVRLay');
const test_Func = OVRLayJS.mapMethod('Test');
const testError_Func = OVRLayJS.mapMethod('TestError');
const asyncTest_Func = OVRLayJS.mapAsyncMethod('AsyncTest');
const asyncErrorTest_Func = OVRLayJS.mapAsyncMethod('TestError');
console.log(test_Func());
try {
    testError_Func();
}
catch (e) {
    console.log(e);
}
asyncTest_Func()
    .then(res => console.log(res))
    .then(nul => asyncErrorTest_Func())
    .catch(err => console.log(err));
