"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.default = (basePath) => ({
    local: util_1.ArrayToPath(basePath, ["lib_cs", "src_cs.dll"]),
});
