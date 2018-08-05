import LibMap from './dat/lib_map';
import { Assembly } from './lib/util/edge_utils';

const libPaths = LibMap( __dirname );

const src_cs = new Assembly( libPaths.local );
