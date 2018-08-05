using System;
using System.Threading.Tasks;
using OVRLayJS.OGLHandler;

namespace OVRLayJS
{
    public class OVRLay
    {
        public static string SuperTest = "test";

        public async Task<Object> Test(dynamic dat)
        {
            OpenGLHandler.Init();

            var t1b = new byte[16 * 16 * 3];
            var t2b = new byte[16 * 16 * 3];

            var tex = OpenGLHandler.CreateTexture(16, 16, 8);
            tex.SetTexture(t1b);

            var tex2 = OpenGLHandler.CreateTexture(16, 16, 8);
            tex2.SetTexture(t1b);

            OpenGLHandler.Shutdown();

            return new[] { tex, tex2 };
        }
    }
}