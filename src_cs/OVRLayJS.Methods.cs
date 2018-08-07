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
            async (dynamic args) => Static_Connector_Callbacks.onStandby_JS = (Func<object, Task<object>>)args);

        public Func<object, Task<object>> onDashboardChange = (Func<object, Task<object>>)(
            async (dynamic args) => Static_Connector_Callbacks.onDashboardChange_JS = (Func<object, Task<object>>)args);

        public Func<object, Task<object>> onChaperoneSettingsChange = (Func<object, Task<object>>)(
            async (dynamic args) => Static_Connector_Callbacks.onChaperoneSettingsChange_JS = (Func<object, Task<object>>)args);

        public Func<object, Task<object>> onOpenVRSignaledQuit = (Func<object, Task<object>>)(
            async (dynamic args) => Static_Connector_Callbacks.onOpenVRSignaledQuit_JS = (Func<object, Task<object>>)args);
    }

    public class OVRLayMethods
    {
        public Func<object, Task<object>> CreateOVRLay = (Func<object, Task<object>>)(async (dynamic args) => null);
    }
}