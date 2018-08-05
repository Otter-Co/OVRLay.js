"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_map_1 = require("./dat/lib_map");
const edge_utils_1 = require("./lib/util/edge_utils");
const libPaths = lib_map_1.default(__dirname);
const src_cs = new edge_utils_1.Assembly(libPaths.local);
