import config from '../../config';
import lib_map from '../dat/lib_map';
import CONST from '../dat/constants';
import { VRApplicationType } from './vr';
import { Assembly, EdgeRemoteCallback, EdgeFunc } from '../util/edge_utils';

const dll_paths = lib_map(config.dll_dir);
const locA = new Assembly(dll_paths.local);

const lib_path = `${ CONST.CONNECTOR_NAMESPACE }.${ CONST.CONNECTOR_TYPENAME }`;
const ConnectorAssembly = locA.mapClass(lib_path);

const GetDirectorMethods = ConnectorAssembly.mapMethod<GetDirectorMethods_t>(CONST.DIRECTOR_GET_METHOD);
const GetDirectorCallbackMethods = ConnectorAssembly.mapMethod<GetDirectorCallbackMethods_t>(CONST.DIRECTOR_GET_CB_METHOD);

export const I_Director = Object.freeze({
    methods: GetDirectorMethods(),
    callbacks: GetDirectorCallbackMethods(),
});

export const I_OVRLay = Object.freeze({

});

export const I_PostHandler = Object.freeze({

});

type GetDirectorMethods_t = () => {
    isStarted: EdgeFunc<boolean>,
    getLastError: EdgeFunc<string>,
    startup: EdgeFunc<VRApplicationType, boolean>,
    shutdown: EdgeFunc,
    pollForEvents: EdgeFunc
};

type GetDirectorCallbackMethods_t = () => {
    onStandbyChange: EdgeFunc<void, EdgeRemoteCallback<void, boolean>>,
    onDashboardChange: EdgeFunc<void, EdgeRemoteCallback<void, string>>,
    onChaperoneSettingsChange: EdgeFunc<void, EdgeRemoteCallback>,
    onOpenVRSignaledQuit: EdgeFunc<void, EdgeRemoteCallback>,
};