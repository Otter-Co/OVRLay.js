using System;
using System.Threading.Tasks;
using OVRLay;
using Valve.VR;

namespace OVRLayJS
{
    public class Connector
    {
        public async Task<object> GetDirectorMethod(dynamic arg)
        {
            switch ((DirectorMethodType)arg)
            {
                case DirectorMethodType.IsStarted:
                    return (Func<object, Task<object>>)(
                        async (args) => Director.Started
                    );
                case DirectorMethodType.GetLastStartupError:
                    return (Func<object, Task<object>>)(
                        async (args) => Director.LastStartupError
                    );
                case DirectorMethodType.Startup:
                    return (Func<object, Task<object>>)(
                        async (args) => Director.Startup((EVRApplicationType)args)
                    );
                case DirectorMethodType.Shutdown:
                    return (Func<object, Task<object>>)(
                        async (args) => { Director.Shutdown(); return null; }
                    );
                case DirectorMethodType.PollForEvents:
                    return (Func<object, Task<object>>)(
                        async (args) => { Director.PollForEvents(); return null; }
                    );
                default:
                    return null;
            }
        }

        public async Task<object> SetDirectorCallback(dynamic arg)
        {
            var cbType = (DirectorCallbackType)arg.type;
            var callback = (Func<object, Task<object>>)arg.callback;

            switch (cbType)
            {
                case DirectorCallbackType.OnStandby:
                    Connector_Callbacks.onStandby_JS = callback;
                    break;
                case DirectorCallbackType.OnDashboardChange:
                    Connector_Callbacks.onDashboardChange_JS = callback;
                    break;
                case DirectorCallbackType.OnChaperoneSettingsChange:
                    Connector_Callbacks.onChaperoneSettingsChange_JS = callback;
                    break;
                case DirectorCallbackType.OnOpenVRSignaledQuit:
                    Connector_Callbacks.onOpenVRSignaledQuit_JS = callback;
                    break;
            }

            return null;
        }
    }

    static class Connector_Callbacks
    {
        static Connector_Callbacks()
        {
            Director.onStandbyChange += onStandby_Del;
            Director.onDashboardChange += onDashboardChange_Del;
            Director.onChaperoneSettingsChange += onChaperoneSettingsChange_Del;
            Director.onOpenVRSignaledQuit += onOpenVRSignaledQuit_Del;
        }

        public static Func<object, Task<object>> onStandby_JS = (async (dat) => dat);
        public static Director.StandbyChange onStandby_Del = (bool inStandby) => onStandby_JS(inStandby);
        public static Func<object, Task<object>> onDashboardChange_JS = (async (dat) => dat);
        public static Director.DashboardChange onDashboardChange_Del = (bool dashboardOpen) => onDashboardChange_JS(dashboardOpen);
        public static Func<object, Task<object>> onChaperoneSettingsChange_JS = (async (dat) => dat);
        public static Director.ChaperoneSettingsChange onChaperoneSettingsChange_Del = () => onChaperoneSettingsChange_JS(null);
        public static Func<object, Task<object>> onOpenVRSignaledQuit_JS = (async (dat) => dat);
        public static Director.OpenVRSignaledQuit onOpenVRSignaledQuit_Del = () => onOpenVRSignaledQuit_JS(null);
    }

    enum DirectorMethodType
    {
        IsStarted,
        GetLastStartupError,
        Startup,
        Shutdown,
        PollForEvents,
    }

    enum DirectorCallbackType
    {
        OnStandby,
        OnDashboardChange,
        OnChaperoneSettingsChange,
        OnOpenVRSignaledQuit,
    }
}