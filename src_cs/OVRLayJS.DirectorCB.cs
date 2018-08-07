using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Valve.VR;
using OVRLay;
using OVRLayJS.OGLHandler;

namespace OVRLayJS
{
    static class Static_Connector_Callbacks
    {
        public static Func<object, Task<object>> onStandby_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onDashboardChange_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onChaperoneSettingsChange_JS = (async (dat) => dat);
        public static Func<object, Task<object>> onOpenVRSignaledQuit_JS = (async (dat) => dat);

        private static Director.StandbyChange onStandby_Del = (bool inStandby) => onStandby_JS(inStandby);
        private static Director.DashboardChange onDashboardChange_Del = (bool dashboardOpen) => onDashboardChange_JS(dashboardOpen);
        private static Director.ChaperoneSettingsChange onChaperoneSettingsChange_Del = () => onChaperoneSettingsChange_JS(null);
        private static Director.OpenVRSignaledQuit onOpenVRSignaledQuit_Del = () => onOpenVRSignaledQuit_JS(null);

        static Static_Connector_Callbacks()
        {
            Director.onStandbyChange += onStandby_Del;
            Director.onDashboardChange += onDashboardChange_Del;
            Director.onChaperoneSettingsChange += onChaperoneSettingsChange_Del;
            Director.onOpenVRSignaledQuit += onOpenVRSignaledQuit_Del;
        }
    }
}