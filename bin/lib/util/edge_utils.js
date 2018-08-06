"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge = require("../../../3p_lib/edge");
class Assembly {
    constructor(assemblyFile, dependencies) {
        this.assemblyFile = assemblyFile;
        this.dependencies = dependencies;
    }
    get baseObj() {
        if (this.dependencies)
            return { assemblyFile: this.assemblyFile, references: this.dependencies };
        else
            return { assemblyFile: this.assemblyFile };
    }
    ;
    mapClass(classPath) {
        return new Assembly_Class(this, classPath);
    }
}
exports.Assembly = Assembly;
class Assembly_Class {
    constructor(assembly, path) {
        this.assembly = assembly;
        this.path = path;
    }
    mapMethod(methodName) {
        const method = this.createFunc(methodName);
        return ((data = null) => method(data, true));
    }
    mapAsyncMethod(methodName) {
        const method = this.createFunc(methodName);
        return (data = null) => new Promise((res, rej) => method(data, (err, dat) => (!err ? res(dat) : rej(err))));
    }
    createFunc(methodName) {
        return edge.func({
            ...this.assembly.baseObj,
            typeName: this.path,
            methodName: methodName,
        });
    }
}
exports.Assembly_Class = Assembly_Class;
