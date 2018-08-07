using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Valve.VR;
using OVRLay;
using OVRLayJS.OGLHandler;

namespace OVRLayJS
{
    public class OVRLay_JS_Wrapper
    {
        private OVRLay.OVRLay _overlay;
        public int OVRLayJS_ID = -1;

        public Func<object, Task<object>> CreateOverlay;
        public Func<object, Task<object>> DestroyOverlay;
        public Func<object, Task<object>> SetOverlayOptions;
        public Func<object, Task<object>> PollForEvents;
        public Func<object, Task<object>> SetTextureType;
        public Func<object, Task<object>> SetTexture;
        public Func<object, Task<object>> SetDashboardIconType;
        public Func<object, Task<object>> SetDashboardIconTexture;
        public Func<object, Task<object>> Hide;
        public Func<object, Task<object>> Show;
        public Func<object, Task<object>> ShowKeyboard;
        public Func<object, Task<object>> HideKeyboard;

        public Func<object, Task<object>> SetDashboardChangeCallback;
        public Func<object, Task<object>> SetFocusChangeCallback;
        public Func<object, Task<object>> SetVisibilityChangeCallback;
        public Func<object, Task<object>> SetKeyboardInputCallback;
        public Func<object, Task<object>> SetKeyboardClosedCallback;
        public Func<object, Task<object>> SetKeyboardDoneCallback;

        private Func<object, Task<object>> onDashboardChange_JS = (Func<object, Task<object>>)(async (dynamic args) => null);
        private Func<object, Task<object>> onFocusChange_JS = (Func<object, Task<object>>)(async (dynamic args) => null);
        private Func<object, Task<object>> onVisibilityChange_JS = (Func<object, Task<object>>)(async (dynamic args) => null);
        private Func<object, Task<object>> onKeyboardInput_JS = (Func<object, Task<object>>)(async (dynamic args) => null);
        private Func<object, Task<object>> onKeyboardClosed_JS = (Func<object, Task<object>>)(async (dynamic args) => null);
        private Func<object, Task<object>> onKeyboardDone_JS = (Func<object, Task<object>>)(async (dynamic args) => null);

        public static OVRLay_JS_Wrapper WrapOVRLayForJS(OVRLay.OVRLay _overlay, int id)
        {
            var ovrlay_js = new OVRLay_JS_Wrapper()
            {
                _overlay = _overlay,
                OVRLayJS_ID = id,

                CreateOverlay = (Func<object, Task<object>>)(async (dynamic args) => _overlay.CreateOverlay()),
                DestroyOverlay = (Func<object, Task<object>>)(async (dynamic args) => _overlay.DestroyOverlay()),

                SetTextureType = (Func<object, Task<object>>)(async (dynamic args) => _overlay.SetTextureType((ETextureType)args)),
                SetTexture = (Func<object, Task<object>>)(async (dynamic args) => _overlay.SetTexture(IntPtr.Zero)),

                SetDashboardIconType = (Func<object, Task<object>>)(async (dynamic args) => _overlay.SetDashboardIconType((ETextureType)args)),
                SetDashboardIconTexture = (Func<object, Task<object>>)(async (dynamic args) => _overlay.SetTexture(IntPtr.Zero)),

                Hide = (Func<object, Task<object>>)(async (dynamic args) => _overlay.Hide()),
                Show = (Func<object, Task<object>>)(async (dynamic args) => _overlay.Show()),

                ShowKeyboard = (Func<object, Task<object>>)(async (dynamic args) => _overlay.ShowKeyboard((string)args.description, (string)args.placeHolder)),
                HideKeyboard = (Func<object, Task<object>>)(async (dynamic args) => _overlay.HideKeyboard()),

                SetOverlayOptions = (Func<object, Task<object>>)(async (dynamic args) => _overlay.SetOverlayOptions((OVRLayOptions)args)),
                PollForEvents = (Func<object, Task<object>>)(async (dynamic args) => _overlay.PollForEvents())
            };

            SetCallbackSetters(ovrlay_js);

            _overlay.onDashboardChange += delegate (bool open) { ovrlay_js.onDashboardChange_JS(open); };
            _overlay.onFocusChange += delegate (bool hasFocus) { ovrlay_js.onFocusChange_JS(hasFocus); };
            _overlay.onVisibilityChange += delegate (bool visibility) { ovrlay_js.onVisibilityChange_JS(visibility); };
            _overlay.onKeyboardInput += delegate (string input) { ovrlay_js.onKeyboardInput_JS(input); };
            _overlay.onKeyboardClosed += delegate () { ovrlay_js.onKeyboardClosed_JS(null); };
            _overlay.onKeyboardDone += delegate () { ovrlay_js.onKeyboardDone_JS(null); };

            return ovrlay_js;
        }

        private static OVRLay_JS_Wrapper SetCallbackSetters(OVRLay_JS_Wrapper ovrlay_js)
        {
            ovrlay_js.SetDashboardChangeCallback = (Func<object, Task<object>>)
                (async (dynamic args) => ovrlay_js.onDashboardChange_JS = (Func<object, Task<object>>)args);

            ovrlay_js.SetFocusChangeCallback = (Func<object, Task<object>>)
                (async (dynamic args) => ovrlay_js.onFocusChange_JS = (Func<object, Task<object>>)args);

            ovrlay_js.SetVisibilityChangeCallback = (Func<object, Task<object>>)
                (async (dynamic args) => ovrlay_js.onVisibilityChange_JS = (Func<object, Task<object>>)args);

            ovrlay_js.SetKeyboardInputCallback = (Func<object, Task<object>>)
                (async (dynamic args) => ovrlay_js.onKeyboardInput_JS = (Func<object, Task<object>>)args);

            ovrlay_js.SetKeyboardClosedCallback = (Func<object, Task<object>>)
                (async (dynamic args) => ovrlay_js.onKeyboardClosed_JS = (Func<object, Task<object>>)args);

            ovrlay_js.SetKeyboardDoneCallback = (Func<object, Task<object>>)
                (async (dynamic args) => ovrlay_js.onKeyboardDone_JS = (Func<object, Task<object>>)args);

            return ovrlay_js;
        }
    }
}