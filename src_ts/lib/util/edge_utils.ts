import * as edge from 'edge-js';

export type EdgeRemoteCallback<Out=any, In=null> = ( data: In, callback: ( error: any, data: Out ) => any | void ) => any | void;

export class Assembly
{
    public get baseObj (): edge.Params { return { assemblyFile: this.assemblyFile }; }

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
    public get baseObj (): edge.Params { return { ...this.assembly.baseObj, typeName: this.path } as edge.Params; }
    constructor (
        public readonly assembly: Assembly,
        public readonly path: string
    ) { }

    public mapMethod<MethodType extends ( ( data?: any ) => any | ( () => any ) )> ( methodName: string )
    {
        const method = this.createFunc( methodName );

        return ( ( data = null ) => method( data, true ) ) as MethodType;
    }

    public mapAsyncMethod<ReturnType = any, ArgumentType = null> ( methodName: string )
    {
        const method = this.createFunc<ReturnType, ArgumentType>( methodName );

        return ( data = null ) => new Promise( ( res, rej ) => method( data,
            ( err: Error, dat: ReturnType ) => ( !err ? res( dat ) : rej( err ) )
        ) );
    }

    private createFunc<ReturnType = any, ArgumentType = null> ( methodName: string ): edge.Func<ArgumentType, ReturnType>
    {
        return edge.func( {
            ...this.assembly.baseObj,
            typeName: this.path,
            methodName: methodName,
        } );
    }
}


