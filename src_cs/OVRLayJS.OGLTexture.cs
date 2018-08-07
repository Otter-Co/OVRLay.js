using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Valve.VR;
using OVRLay;
using OVRLayJS.OGLHandler;

namespace OVRLayJS
{
    public class OpenGLTexture_JS_Wrapper
    {
        private OpenGLTexture _tex;
        public OpenGLTexture_JS_Wrapper(OpenGLTexture texToWrap)
        {
            this._tex = texToWrap;
        }
    }
}
