import LibMap from './lib/lib_map';
import { Assembly } from './lib/edge_utils';

const libPaths = LibMap(__dirname);

const src_cs = new Assembly(libPaths.local);

class T_Class1
{
    public GetString(){}
}

const Class1 = src_cs.mapClass<typeof T_Class1>('Class1', T_Class1);

let cT = new Class1();

console.log(cT.GetString());