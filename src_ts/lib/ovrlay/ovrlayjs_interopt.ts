import * as edge from 'edge-js';
import config from '../../config';
import lib_map from '../dat/lib_map';
import CONST from '../dat/constants';
import { VRApplicationType } from './vr';
import { Assembly, EdgeRemoteCallback } from '../util/edge_utils';

const dll_paths = lib_map( config.dll_dir );
const locA = new Assembly( dll_paths.local );

const lib_path = `${ CONST.CONNECTOR_NAMESPACE }.${ CONST.CONNECTOR_TYPENAME }`;
const ConnectorAssembly = locA.mapClass( lib_path );

const GetDirectorMethods = ConnectorAssembly.mapMethod<GetDirectorMethods_c>( CONST.DIRECTOR_GET_METHODS );
const GetDirectorCallbackMethods = ConnectorAssembly.mapMethod<GetDirectorCallbackMethods_c>( CONST.DIRECTOR_GET_CB_METHODS );

export const I_Director = Object.freeze( {
    methods: GetDirectorMethods(),
    callbacks: GetDirectorCallbackMethods(),
} );

export const I_OVRLay = Object.freeze( {

} );

export const I_PostHandler = Object.freeze( {

} );

type GetDirectorMethods_c = () => {
    isStarted: edge.Func<void, boolean>,
    getLastError: edge.Func<void, string>,
    startup: edge.Func<VRApplicationType, boolean>,
    shutdown: edge.Func<void, void>,
    pollForEvents: edge.Func<void, void>
};

type GetDirectorCallbackMethods_c = () => {
    onStandbyChange: edge.Func<EdgeRemoteCallback<void, boolean>, void>,
    onDashboardChange: edge.Func<EdgeRemoteCallback<void, boolean>, void>,
    onChaperoneSettingsChange: edge.Func<EdgeRemoteCallback<void, boolean>, void>,
    onOpenVRSignaledQuit: edge.Func<EdgeRemoteCallback<void, boolean>, void>,
};

type GetOVRLayMethods_c = () => {
    createOverlay: edge.Func<{ name: string, key: string }, any>;
}
