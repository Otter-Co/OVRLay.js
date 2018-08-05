import * as edge from '../../../3p_lib/edge/lib/edge';

export interface EdgeOpts {
    assemblyFile: string;
    typeName?: string;
    methodName?: string;
    references?: string[];
}

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
}

export class Assembly_Class {
    constructor(
        public readonly assembly: Assembly,
        public readonly path: string
    ) { }

    public mapMethod() { }
    public mapAsyncMethod() { }
}