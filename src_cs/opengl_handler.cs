using System;
using System.Runtime.InteropServices;
using OpenGL;
using OVRLayJS.Util;

namespace OVRLayJS.OGLHandler
{
    public static class OpenGLHandler
    {
        public static DeviceContext devCtx;
        public static INativePBuffer pixelBuff;
        public static IntPtr glCtx;
        public static ErrorCode lastError;

        public static void Init()
        {
            Gl.Initialize();

            pixelBuff = DeviceContext.CreatePBuffer(new DevicePixelFormat(24), 128, 128);
            devCtx = DeviceContext.Create(pixelBuff);
            glCtx = devCtx.CreateContext(IntPtr.Zero);

            devCtx.MakeCurrent(glCtx);
        }

        public static void Shutdown()
        {
            devCtx.DeleteContext(glCtx);
            pixelBuff.Dispose();
            devCtx.Dispose();
        }

        public static OpenGLTexture CreateTexture(int width, int height)
        {
            return new OpenGLTexture(width, height);
        }


        public static bool ErrorCheck()
        {
            lastError = Gl.GetError();
            return (lastError!= ErrorCode.NoError);
        }
    }

    public class OpenGLTexture
    {
        public uint TexturePtr { get; }
        public int Width { get; }
        public int Height { get; }

        public OpenGLTexture(int width, int height)
        {
            TexturePtr = Gl.GenTexture();

            Width = width;
            Height = height;
        }

        public void SetTexture(byte[] imageData)
        {
            var imgDataPtr = new AutoPtr<byte[]>(imageData);
            Gl.BindTexture(TexTarg, TexturePtr);
            Gl.TexImage2D(TexTarg, 0, TexForm, Width, Height, 0, TexPForm, TexPType, imgDataPtr.Address);
            imgDataPtr.Dispose();
        }

        public void SetTextureWithAlpha(byte[] imageData)
        {
            var imgDataPtr = new AutoPtr<byte[]>(imageData);
            Gl.BindTexture(TexTarg, TexturePtr);
            Gl.TexImage2D(TexTarg, 0, AlphaTexForm, Width, Height, 0, AlphaTexPForm, TexPType, imgDataPtr.Address);
            imgDataPtr.Dispose();
        }

        public const TextureTarget TexTarg = TextureTarget.Texture2d;
        public const PixelType TexPType = PixelType.UnsignedByte;
        public const PixelFormat TexPForm = PixelFormat.Rgb;
        public const InternalFormat TexForm = InternalFormat.Rgb;
        public const PixelFormat AlphaTexPForm = PixelFormat.Rgba;
        public const InternalFormat AlphaTexForm = InternalFormat.Rgba;
    }
}