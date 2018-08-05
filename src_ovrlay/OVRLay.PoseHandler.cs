using System;
using System.Runtime.InteropServices;
using Valve.VR;

namespace OVRLay
{
    public static class PoseHandler
    {
        public static uint hmd_index = OpenVR.k_unTrackedDeviceIndex_Hmd;
        public static uint right_index = OpenVR.k_unTrackedDeviceIndexInvalid;
        public static uint left_index = OpenVR.k_unTrackedDeviceIndexInvalid;

        public static void UpdatePoses()
        {
            UpdateHandIndexs();
        }

        public static void UpdateHandIndexs()
        {
            right_index = Director.VRSystem.GetTrackedDeviceIndexForControllerRole(ETrackedControllerRole.RightHand);
            left_index = Director.VRSystem.GetTrackedDeviceIndexForControllerRole(ETrackedControllerRole.LeftHand);
        }
    }
}