using System;
using System.Runtime.InteropServices;
using Valve.VR;

namespace OVRLay
{
    public enum OVRLayType
    {
        StandardOverlay,
        DashboardOverlay,
    }

    public struct OVRLayOptions
    {
        public readonly float[] Color;
        public readonly float? Alpha;
        public readonly float? WidthInMeters;
        public readonly float[] AutoCurveDistanceRangeInMeters;
        public readonly VRTextureBounds_t? TextureBounds;
        public readonly HmdVector2_t? MouseScale;
    }

    public class OVRLay
    {
        public OVRLayType OverlayType;
        public EVROverlayError lastError;

        public OVRLayOptions? Options { get; private set; }

        public string Name { get; private set; } = "Overlay";
        public string Key { get; private set; } = "ovrlay-overlay";

        public bool Created { get; private set; } = false;

        private ulong overlay_handle;
        private ulong thumbnail_handle;

        private VREvent_t pEvent = new VREvent_t();
        private Texture_t textureStruct = new Texture_t()
        {
            handle = IntPtr.Zero,
            eType = ETextureType.OpenGL,
            eColorSpace = EColorSpace.Auto,
        };
        private Texture_t dashboardIconStruct = new Texture_t()
        {
            handle = IntPtr.Zero,
            eType = ETextureType.OpenGL,
            eColorSpace = EColorSpace.Auto,
        };

        public OVRLay(OVRLayType overlayType, string overlayKey, string overlayName, OVRLayOptions? initalOptions)
        {
            OverlayType = overlayType;
            Options = initalOptions;
        }

        public bool CreateOverlay()
        {
            if (Created) return true;

            if (OverlayType == OVRLayType.StandardOverlay)
                lastError = Director.Overlay.CreateOverlay(Key, Name, ref overlay_handle);
            else if (OverlayType == OVRLayType.DashboardOverlay)
                lastError = Director.Overlay.CreateDashboardOverlay(Key, Name, ref overlay_handle, ref thumbnail_handle);

            bool result = (lastError == EVROverlayError.None);

            if (result) Created = true;

            if (result && Options != null)
                SetOverlayOptions((OVRLayOptions)Options);

            return result;
        }
        public bool DestroyOverlay()
        {
            if (!Created) return true;

            lastError = Director.Overlay.DestroyOverlay(overlay_handle);
            bool result = (lastError == EVROverlayError.None);

            if (result) Created = false;

            return result;
        }

        public bool SetOverlayOptions(OVRLayOptions opts)
        {
            this.Options = opts;

            if (!Created) return false;

            if (opts.Color != null)
                lastError = Director.Overlay.SetOverlayColor(overlay_handle, opts.Color[0], opts.Color[1], opts.Color[2]);
            if (opts.Alpha != null)
                lastError = Director.Overlay.SetOverlayAlpha(overlay_handle, (float)opts.Alpha);
            if (opts.WidthInMeters != null)
                lastError = Director.Overlay.SetOverlayWidthInMeters(overlay_handle, (float)opts.WidthInMeters);
            if (opts.AutoCurveDistanceRangeInMeters != null)
                lastError = Director.Overlay.SetOverlayAutoCurveDistanceRangeInMeters(
                    overlay_handle,
                    (float)opts.AutoCurveDistanceRangeInMeters[0],
                    (float)opts.AutoCurveDistanceRangeInMeters[1]
                );
            if (opts.TextureBounds != null)
            {
                var transF = (VRTextureBounds_t)opts.TextureBounds;
                lastError = Director.Overlay.SetOverlayTextureBounds(overlay_handle, ref transF);
            }
            if (opts.MouseScale != null)
            {
                var mouseS = (HmdVector2_t)opts.MouseScale;
                lastError = Director.Overlay.SetOverlayMouseScale(overlay_handle, ref mouseS);
            }

            return lastError == EVROverlayError.None;
        }

        public bool PollForEvents()
        {
            if (!Created) return false;

            while (Director.Overlay.PollNextOverlayEvent(overlay_handle, ref pEvent, (uint)Director.VREventSize))
                HandleEvent(pEvent);

            return true;
        }

        public ETextureType SetTextureType(ETextureType textureType) { return textureStruct.eType = textureType; }
        public bool SetTexture(IntPtr TextureHandle)
        {
            if (!Created) return false;
            textureStruct.handle = TextureHandle;
            lastError = Director.Overlay.SetOverlayTexture(overlay_handle, ref textureStruct);
            return (lastError == EVROverlayError.None);
        }
        public ETextureType SetDashboardIconType(ETextureType textureType) { return dashboardIconStruct.eType = textureType; }
        public bool SetDashboardIconTexture(IntPtr textureHandle)
        {
            if (!Created) return false;
            dashboardIconStruct.handle = textureHandle;
            lastError = Director.Overlay.SetOverlayTexture(thumbnail_handle, ref dashboardIconStruct);
            return (lastError == EVROverlayError.None);
        }

        public bool Hide()
        {
            if (!Created) return false;
            lastError = Director.Overlay.HideOverlay(overlay_handle);
            return (lastError == EVROverlayError.None);
        }
        public bool Show()
        {
            if (!Created) return false;
            lastError = Director.Overlay.ShowOverlay(overlay_handle);
            return (lastError == EVROverlayError.None);
        }

        public bool ShowKeyboard(string description = "", string placeHolder = "")
        {
            if (!Created) return false;
            lastError = Director.Overlay.ShowKeyboard(0, 0, description, 256, placeHolder, false, 0);
            return (lastError == EVROverlayError.None);
        }

        public bool HideKeyboard() { Director.Overlay.HideKeyboard(); return true; }

        public delegate void DashboardChange(bool currentActive);
        public delegate void FocusChange(bool hasFocus);
        public delegate void VisibilityChanged(bool isVisible);
        public delegate void KeyboardInput(string input);
        public delegate void KeyboardClosed();
        public delegate void KeyboardDone();

        public DashboardChange onDashboardChange = delegate (bool open) { };
        public FocusChange onFocusChange = delegate (bool hasFocus) { };
        public VisibilityChanged onVisibilityChange = delegate (bool visibility) { };
        public KeyboardInput onKeyboardInput = delegate (string input) { };
        public KeyboardClosed onKeyboardClosed = delegate () { };
        public KeyboardDone onKeyboardDone = delegate () { };

        private void HandleEvent(VREvent_t pEvent)
        {
            switch ((EVREventType)pEvent.eventType)
            {
                // case EVREventType.VREvent_MouseMove:
                //     UpdateMouseData(pEvent.data.mouse);
                //     break;

                // case EVREventType.VREvent_MouseButtonDown:
                //     UpdateMouseData(pEvent.data.mouse, true);
                //     break;

                // case EVREventType.VREvent_MouseButtonUp:
                //     UpdateMouseData(pEvent.data.mouse, false);
                //     break;

                case EVREventType.VREvent_FocusEnter:
                    onFocusChange(true);
                    break;

                case EVREventType.VREvent_FocusLeave:
                    onFocusChange(false);
                    break;

                case EVREventType.VREvent_DashboardActivated:
                    onDashboardChange(true);
                    break;

                case EVREventType.VREvent_DashboardDeactivated:
                    onDashboardChange(false);
                    break;

                case EVREventType.VREvent_OverlayShown:
                    onVisibilityChange(true);
                    break;

                case EVREventType.VREvent_OverlayHidden:
                    onVisibilityChange(false);
                    break;

                case EVREventType.VREvent_KeyboardCharInput:
                    onKeyboardInput(GetKeyboardEventText(pEvent));
                    break;

                case EVREventType.VREvent_KeyboardDone:
                    onKeyboardDone();
                    break;

                case EVREventType.VREvent_KeyboardClosed:
                    onKeyboardClosed();
                    break;
            }
        }

        private static string GetKeyboardEventText(VREvent_t pEvent)
        {
            var kd = pEvent.data.keyboard;
            byte[] bytes = new byte[] { kd.cNewInput0, kd.cNewInput1, kd.cNewInput2, kd.cNewInput3, kd.cNewInput4, kd.cNewInput5, kd.cNewInput6, kd.cNewInput7, };
            int len = 0;
            while (bytes[len++] != 0 && len < 7) ;
            string input = System.Text.Encoding.UTF8.GetString(bytes, 0, len);

            System.Text.StringBuilder txtB = new System.Text.StringBuilder(1024);
            Director.Overlay.GetKeyboardText(txtB, 1024);
            return txtB.ToString();
        }
    }
}