using System;
using System.Runtime.InteropServices;
using Valve.VR;

namespace OVRLay
{
    public static class Director
    {
        public static int VREventSize = Marshal.SizeOf(typeof(VREvent_t));

        public static bool Started { get; set; }

        public static CVRSystem VRSystem { get; set; }
        public static CVRChaperone Chaperone { get { return OpenVR.Chaperone; } }
        public static CVRChaperoneSetup ChaperoneSetup { get { return OpenVR.ChaperoneSetup; } }
        public static CVROverlay Overlay { get { return OpenVR.Overlay; } }
        public static CVRSettings Settings { get { return OpenVR.Settings; } }
        public static CVRApplications Applications { get { return OpenVR.Applications; } }

        public static EVRInitError LastStartupError = EVRInitError.None;
        public static VREvent_t pEvent = new VREvent_t();

        public static bool Startup(EVRApplicationType appType = EVRApplicationType.VRApplication_Background)
        {
            if (Started) return true;
            VRSystem = OpenVR.Init(ref LastStartupError, appType);
            return (Started = (LastStartupError == EVRInitError.None));
        }

        public static void Shutdown()
        {
            if (Started)
                OpenVR.Shutdown();
        }

        public static void PollForEvents()
        {
            while (VRSystem.PollNextEvent(ref pEvent, (uint)VREventSize))
                HandleEvent(pEvent);
        }

        private static void HandleEvent(VREvent_t pEvent)
        {
            switch ((EVREventType)pEvent.eventType)
            {
                case EVREventType.VREvent_EnterStandbyMode:
                    onStandbyChange(true);
                    return;
                case EVREventType.VREvent_LeaveStandbyMode:
                    onStandbyChange(false);
                    return;
                case EVREventType.VREvent_DashboardActivated:
                    onDashboardChange(true);
                    return;
                case EVREventType.VREvent_DashboardDeactivated:
                    onDashboardChange(false);
                    return;
                case EVREventType.VREvent_ChaperoneSettingsHaveChanged:
                    onChaperoneSettingsChange();
                    return;
                case EVREventType.VREvent_Quit:
                    onOpenVRSignaledQuit();
                    return;
                default:
                    break;
            }
        }

        public static StandbyChange onStandbyChange = delegate (bool connected) { };
        public delegate void StandbyChange(bool inStandby);
        public static DashboardChange onDashboardChange = delegate (bool dashboardOpen) { };
        public delegate void DashboardChange(bool dashboardOpen);
        public static ChaperoneSettingsChange onChaperoneSettingsChange = delegate () { };
        public delegate void ChaperoneSettingsChange();
        public static OpenVRSignaledQuit onOpenVRSignaledQuit = delegate () { };
        public delegate void OpenVRSignaledQuit();
    }
}
