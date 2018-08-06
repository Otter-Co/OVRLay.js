import * as edge from '../../../3p_lib/edge';

export interface EdgeOpts {
    assemblyFile: string;
    typeName?: string;
    methodName?: string;
    references?: string[];
}

export type EdgeData = { [dataName: string]: any } | any

export type EdgeFunc<RT=any, AT=void> = (
    data: AT,
    sync: true | ((err: any, retDat: RT) => void)
) => RT | void;

export class Assembly {
    public get baseObj(): EdgeOpts {
        if (this.dependencies)
            return { assemblyFile: this.assemblyFile, references: this.dependencies };
        else
            return { assemblyFile: this.assemblyFile };
    };

    constructor(
        public readonly assemblyFile: string,
        public readonly dependencies?: string[]
    ) { }

    public mapClass(classPath: string) {
        return new Assembly_Class(this, classPath);
    }
}

export class Assembly_Class {
    constructor(
        public readonly assembly: Assembly,
        public readonly path: string
    ) { }

    public mapMethod<ReturnType=any, ArgType=void>(methodName) {

        const method = this.createFunc<ReturnType, ArgType>(methodName);

        return ((data?: ArgType) =>
            method(data as any, true));
    }

    public mapAsyncMethod<ReturnType=any, ArgType=void>(methodName) {

        const method = this.createFunc<ReturnType, ArgType>(methodName);

        return ((data?: ArgType) => new Promise((res, rej) =>
            method(data as any, (err, dat) => (!err ? res(dat) : rej(err)))
        ));
    }

    private createFunc<ReturnType=any, ArgType=void>(methodName): EdgeFunc {
        return edge.func<ReturnType, ArgType>({
            ...this.assembly.baseObj,
            typeName: this.path,
            methodName: methodName,
        });
    }
}


