import config from '../config';
import lib_map from './dat/lib_map';
import CONST from './dat/constants';
import { Assembly } from './util/edge_utils';
import { DirectorMethodType, DirectorCallbackType } from './ovrlay/vr';

const dll_paths = lib_map( config.dll_dir );
const locA = new Assembly( dll_paths.local );

const ConnectorAssembly = locA.mapClass(
    `${ CONST.CONNECTOR_NAMESPACE }.${ CONST.CONNECTOR_TYPENAME }`
);

type ConnectorFactory<CBType> =
    <Ret=void, Arg=null>( callbackType: CBType ) => ( Arg extends null ? () => Ret : ( arg: Arg ) => Ret );

const GetDirectorMethod = ConnectorAssembly.mapMethod<ConnectorFactory<DirectorMethodType>>( CONST.DIRECTOR_GET_METHOD );
const SetDirectorCallback = ConnectorAssembly.mapMethod(CONST.DIRECTOR_GET_CB_METHOD);

export const I_Director = Object.freeze( {
    _assembly: ConnectorAssembly,
    _getDirectorCallback: GetDirectorMethod,

    IsStarted: GetDirectorMethod<boolean>( DirectorMethodType.IsStarted ),
    GetLastStartupError: GetDirectorMethod<string>( DirectorMethodType.GetLastStartupError ),
    Startup: GetDirectorMethod<boolean>( DirectorMethodType.Startup ),
    Shutdown: GetDirectorMethod( DirectorMethodType.Shutdown ),
    PollForEvents: GetDirectorMethod<boolean>( DirectorMethodType.PollForEvents ),

} );

export const I_OVRLay = Object.freeze( {

} );

export const I_PostHandler = Object.freeze( {

} );


