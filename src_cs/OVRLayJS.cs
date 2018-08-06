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

        public async Task<object> GetDirectorMethods(dynamic arg) => DirectorMethodsInstance;
        public async Task<object> GetDirectorCallbackMethods(dynamic arg) => DirectorCallbackMethodInstance;
    }

    static class Static_Connector_Callbacks
    {
        public static Func<object, Task<object>> onStandby_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onDashboardChange_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onChaperoneSettingsChange_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onOpenVRSignaledQuit_JS = (async (dat) => dat);

        public static Director.StandbyChange onStandby_Del = (bool inStandby) => onStandby_JS(inStandby);
        public static Director.DashboardChange onDashboardChange_Del = (bool dashboardOpen) => onDashboardChange_JS(dashboardOpen);
        public static Director.ChaperoneSettingsChange onChaperoneSettingsChange_Del = () => onChaperoneSettingsChange_JS(null);
        public static Director.OpenVRSignaledQuit onOpenVRSignaledQuit_Del = () => onOpenVRSignaledQuit_JS(null);

        static Static_Connector_Callbacks()
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
                    Static_Connector_Callbacks.onStandby_JS = callback;
                    break;
                case DirectorCallbackType.OnDashboardChange:
                    Static_Connector_Callbacks.onDashboardChange_JS = callback;
                    break;
                case DirectorCallbackType.OnChaperoneSettingsChange:
                    Static_Connector_Callbacks.onChaperoneSettingsChange_JS = callback;
                    break;
                case DirectorCallbackType.OnOpenVRSignaledQuit:
                    Static_Connector_Callbacks.onOpenVRSignaledQuit_JS = callback;
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