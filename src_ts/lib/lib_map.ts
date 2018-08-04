import { ArrayToPath } from './util';

export default (basePath: string) => ({
    local: ArrayToPath(basePath, ["lib_cs", "src_cs.dll"]),
});