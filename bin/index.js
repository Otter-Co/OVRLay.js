"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_map_1 = require("./lib/lib_map");
const edge_utils_1 = require("./lib/edge_utils");
const libPaths = lib_map_1.default(__dirname);
const src_cs = new edge_utils_1.Assembly(libPaths.local);
class T_Class1 {
    GetString() { }
}
const Class1 = src_cs.mapClass('Class1', T_Class1);
let cT = new Class1();
console.log(cT.GetString());
