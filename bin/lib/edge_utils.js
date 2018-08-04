"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge = require("../../3p_lib/edge");
class Assembly {
    constructor(assemblyFile) {
        this.assemblyFile = assemblyFile;
    }
    get _baseObj() { return { assemblyFile: this.assemblyFile }; }
    ;
    mapClass(typeName, tClass) {
        let methods = Object.getOwnPropertyNames(tClass.prototype)
            .filter(pN => ((typeof tClass.prototype[pN] === 'function') &&
            pN !== 'constructor'));
        let t_newClass = class {
        };
        let newProto = t_newClass.prototype;
        newProto.constructor = tClass.prototype.constructor;
        for (let methodName of methods) {
            let oldMethod = tClass.prototype[methodName];
            let funcOpts = this._baseObj;
            funcOpts.typeName = typeName;
            funcOpts.methodName = methodName;
            let _newFunc = edge.func(funcOpts);
            let newFunc = (dat) => _newFunc(dat, true);
            newProto[methodName] = newFunc;
        }
        return t_newClass;
    }
}
exports.Assembly = Assembly;
