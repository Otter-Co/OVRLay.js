import { ArrayToPath } from './util';

const openVrArch = ( process.arch == "x64" ) ? "win64" : "win32";

export default ( basePath: string ) => ( {
    local: ArrayToPath( basePath, [ "lib_cs", "src_cs.dll" ] ),
    overlay: ArrayToPath( basePath, [ "lib_cs", "src_ovrlay.dll" ] ),
    openvr: ArrayToPath( basePath, [ "lib_cs", "openvr", openVrArch, "openvr_api.dll" ] )
} );