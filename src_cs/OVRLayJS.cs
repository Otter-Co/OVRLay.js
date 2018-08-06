using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OVRLay;
using Valve.VR;

namespace OVRLayJS
{
    public class Connector
    {
        public static DirectorMethods DirectorMethodsInstance =
            new DirectorMethods();
        public static DirectorCallbackMethods DirectorCallbackMethodInstance =
            new DirectorCallbackMethods();

        public async Task<object> GetDirectorMethods(dynamic arg) => DirectorMethodsInstance;
        public async Task<object> GetDirectorCallbackMethods(dynamic arg) => DirectorCallbackMethodInstance;
    }

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
            async (dynamic args) => Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnStandby,
                (Func<object, Task<object>>)args
            ));
        public Func<object, Task<object>> onDashboardChange = (Func<object, Task<object>>)(
            async (dynamic args) => Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnDashboardChange,
                (Func<object, Task<object>>)args
            ));
        public Func<object, Task<object>> onChaperoneSettingsChange = (Func<object, Task<object>>)(
            async (dynamic args) => Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnChaperoneSettingsChange,
                (Func<object, Task<object>>)args
            ));
        public Func<object, Task<object>> onOpenVRSignaledQuit = (Func<object, Task<object>>)(
            async (dynamic args) => Connector_Callbacks.SetDirectorCallback(
                DirectorCallbackType.OnOpenVRSignaledQuit,
                (Func<object, Task<object>>)args
            ));
    }

    static class Connector_Callbacks
    {
        public static Func<object, Task<object>> onStandby_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onDashboardChange_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onChaperoneSettingsChange_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onOpenVRSignaledQuit_JS = (async (dat) => dat);

        public static Director.StandbyChange onStandby_Del = (bool inStandby) => onStandby_JS(inStandby);
        public static Director.DashboardChange onDashboardChange_Del = (bool dashboardOpen) => onDashboardChange_JS(dashboardOpen);
        public static Director.ChaperoneSettingsChange onChaperoneSettingsChange_Del = () => onChaperoneSettingsChange_JS(null);
        public static Director.OpenVRSignaledQuit onOpenVRSignaledQuit_Del = () => onOpenVRSignaledQuit_JS(null);

        static Connector_Callbacks()
        {
            Director.onStandbyChange += onStandby_Del;
            Director.onDashboardChange += onDashboardChange_Del;
            Director.onChaperoneSettingsChange += onChaperoneSettingsChange_Del;
            Director.onOpenVRSignaledQuit += onOpenVRSignaledQuit_Del;
        }

        public static object SetDirectorCallback(DirectorCallbackType cbType, Func<object, Task<object>> callback)
        {
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

    public enum DirectorCallbackType
    {
        OnStandby,
        OnDashboardChange,
        OnChaperoneSettingsChange,
        OnOpenVRSignaledQuit,
    }
}