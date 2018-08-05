"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.Assembly = Assembly;
class Assembly_Class {
    constructor(assembly, path) {
        this.assembly = assembly;
        this.path = path;
    }
    mapMethod() { }
    mapAsyncMethod() { }
}
exports.Assembly_Class = Assembly_Class;
