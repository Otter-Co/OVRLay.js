import LibMap from './lib/util/lib_map';
import { Assembly } from './lib/util/edge_utils';
import { performance } from 'perf_hooks';

const libPaths = LibMap( __dirname );

const src_cs = new Assembly( libPaths.local );

class OVRLay_T
{
    Test (): string { return; };
}

const OVRLay = src_cs.mapClass<typeof OVRLay_T>( 'OVRLayJS.OVRLay', OVRLay_T );

let cT = new OVRLay();

console.log( cT.Test() );
