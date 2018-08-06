import lib_map from './dat/lib_map';
import config from '../config';
import { Assembly } from './util/edge_utils';

let dll_paths = lib_map(config.dll_dir);
const locA = new Assembly(dll_paths.local);

export const I_Director = {
    _assembly: locA.mapClass('OVRLayJS.OVRLay'),
    
};

export const I_OVRLay = {

};

export const I_PostHandler = {

};