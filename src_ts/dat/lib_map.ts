import path from 'path';

export default (basePath: string) => ({
    local: path.resolve(basePath, "lib_cs", "src_cs.dll"),
    overlay: path.resolve(basePath, "lib_cs", "OVRLay.dll"),
    openvr: path.resolve(basePath, "lib_cs", "openvr", (process.arch == "x64") ? "win64" : "win32", "openvr_api.dll")
});