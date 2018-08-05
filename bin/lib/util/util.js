"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function ArrayToPath(basePath, arrPath) {
    return `${basePath}${path_1.sep}${arrPath.join(path_1.sep)}`;
}
exports.ArrayToPath = ArrayToPath;
