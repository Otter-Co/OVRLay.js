using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Valve.VR;
using OVRLay;
using OVRLayJS.OGLHandler;

namespace OVRLayJS
{
    public class DirectorMethods
    {
        public Func<object, Task<object>> isStarted = (Func<object, Task<object>>)(
            async (args) => Director.Started
        );
        public Func<object, Task<object>> getLastStartupError = (Func<object, Task<object>>)(
            async (args) => Director.LastStartupError
        );
        public Func<object, Task<object>> startup = (Func<object, Task<object>>)(
            async (args) => Director.Startup((EVRApplicationType)args)
        );
        public Func<object, Task<object>> shutdown = (Func<object, Task<object>>)(
            async (args) => { Director.Shutdown(); return null; }
        );
        public Func<object, Task<object>> pollForEvents = (Func<object, Task<object>>)(
            async (args) => { Director.PollForEvents(); return null; }
        );
    }

    public class DirectorCallbackMethods
    {
        public Func<object, Task<object>> onStandbyChange = (Func<object, Task<object>>)(
            async (dynamic args) => Static_Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnStandby,
                (Func<object, Task<object>>)args
            ));
        public Func<object, Task<object>> onDashboardChange = (Func<object, Task<object>>)(
            async (dynamic args) => Static_Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnDashboardChange,
                (Func<object, Task<object>>)args
            ));
        public Func<object, Task<object>> onChaperoneSettingsChange = (Func<object, Task<object>>)(
            async (dynamic args) => Static_Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnChaperoneSettingsChange,
                (Func<object, Task<object>>)args
            ));
        public Func<object, Task<object>> onOpenVRSignaledQuit = (Func<object, Task<object>>)(
            async (dynamic args) => Static_Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnOpenVRSignaledQuit,
                (Func<object, Task<object>>)args
            ));
    }

    public class OVRLay_JS
    {
        private OVRLay.OVRLay _overlay;
        public OVRLay_JS(OVRLay.OVRLay ovrlayToWrap)
        {
            this._overlay = ovrlayToWrap;
        }


    }

    public class OpenGLTexture_JS
    {
        
        private OpenGLTexture _tex;
        public OpenGLTexture_JS(OpenGLTexture texToWrap)
        {

        }
    }
}