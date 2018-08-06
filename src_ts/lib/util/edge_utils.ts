import * as edge from '../../../3p_lib/edge';

export interface EdgeOpts
{
    assemblyFile: string;
    typeName?: string;
    methodName?: string;
    references?: string[];
}

export type EdgeFuncCallback = ( error: Error, data: any ) => void;
export type EdgeRemoteCallback = ( data: any, callback: ( error: any, data: any ) => any | void ) => any | void;
export type EdgeFunc = ( data: any, sync: true | EdgeFuncCallback ) => any;


export class Assembly
{
    public get baseObj (): EdgeOpts
    {
        if ( this.dependencies )
            return { assemblyFile: this.assemblyFile, references: this.dependencies };
        else
            return { assemblyFile: this.assemblyFile };
    };

    constructor (
        public readonly assemblyFile: string,
        public readonly dependencies?: string[]
    ) { }

    public mapClass ( classPath: string )
    {
        return new Assembly_Class( this, classPath );
    }
}

export class Assembly_Class
{
    constructor (
        public readonly assembly: Assembly,
        public readonly path: string
    ) { }

    public mapMethod<MethodType extends ( ( data?: any ) => any | ( () => any ) )> ( methodName )
    {
        const method = this.createFunc( methodName );

        return ( ( data ) => method( data as any, true ) ) as MethodType;
    }

    public mapAsyncMethod<ReturnType = any, ArgumentType = any> ( methodName )
    {
        const method = this.createFunc( methodName );

        return ( ( data: ArgumentType ) => new Promise( ( res, rej ) =>
            method( data, ( err, dat: ReturnType ) => ( !err ? res( dat ) : rej( err ) ) )
        ) );
    }

    private createFunc ( methodName ): EdgeFunc
    {
        return edge.func( {
            ...this.assembly.baseObj,
            typeName: this.path,
            methodName: methodName,
        } );
    }
}


