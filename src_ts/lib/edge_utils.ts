import * as edge from '../../3p_lib/edge';

export interface EdgeOpts {
    assemblyFile: string;
    typeName?: string;
    methodName?: string;
}

export class Assembly {
    private get _baseObj(): EdgeOpts { return { assemblyFile: this.assemblyFile } };

    constructor(public readonly assemblyFile: string) { }

    public mapClass<T>(typeName: string, tClass: Function) {

        let methods = Object.getOwnPropertyNames(tClass.prototype)
            .filter(pN => (
                (typeof tClass.prototype[pN] === 'function') &&
                pN !== 'constructor'
            ));

        let t_newClass: any = class { };

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

        return t_newClass as T & Function;
    }
}