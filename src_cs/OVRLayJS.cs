using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Valve.VR;
using OVRLay;
using OVRLayJS.OGLHandler;

namespace OVRLayJS
{
    public class Connector
    {
        public static DirectorMethods DirectorMethodsInstance =
            new DirectorMethods();
        public static DirectorCallbackMethods DirectorCallbackMethodInstance =
            new DirectorCallbackMethods();
        public static OVRLayMethods OVRLayMethodsInstance =
            new OVRLayMethods();

        public async Task<object> GetDirectorMethods(dynamic arg) => DirectorMethodsInstance;
        public async Task<object> GetDirectorCallbackMethods(dynamic arg) => DirectorCallbackMethodInstance;
        public async Task<object> GetOVRLayMethods(dynamic arg) => OVRLayMethodsInstance;
        public async Task<object> GetOpenGLMethods(dynamic arg) => null;
    }
}