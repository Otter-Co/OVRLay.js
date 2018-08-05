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

        public static void Init()
        {
            Gl.Initialize();

            pixelBuff = DeviceContext.CreatePBuffer(new DevicePixelFormat(24), 128, 128);
            devCtx = DeviceContext.Create(pixelBuff);
            glCtx = devCtx.CreateContext(IntPtr.Zero);

            devCtx.MakeCurrent(glCtx);
        }

        public static OpenGLTexture CreateTexture(int width, int height, int bitDepth)
        {
            return new OpenGLTexture(width, height, bitDepth);
        }

        public static void Shutdown()
        {
            devCtx.DeleteContext(glCtx);
            pixelBuff.Dispose();
            devCtx.Dispose();
        }

        public static bool ErrorCheck()
        {
            return (Gl.GetError() != ErrorCode.NoError);
        }

        public static string GetError()
        {
            return "";
        }
    }

    public class OpenGLTexture
    {
        public const TextureTarget TexTarg = TextureTarget.Texture2d;
        public const PixelType TexPType = PixelType.UnsignedByte;
        public const PixelFormat TexPForm = PixelFormat.Rgb;
        public const InternalFormat TexForm = InternalFormat.Rgb;
        public const PixelFormat AlphaTexPForm = PixelFormat.Rgba;
        public const InternalFormat AlphaTexForm = InternalFormat.Rgba;

        public uint TexturePtr { get; }
        public int Width { get; }
        public int Height { get; }
        public int BitDepth { get; }

        public OpenGLTexture(int width, int height, int bitDepth)
        {
            TexturePtr = Gl.GenTexture();

            Width = width;
            Height = height;
            BitDepth = bitDepth;
        }

        public void SetTexture(byte[] imageData)
        {
            var imgDataPtr = new AutoPtr<byte[]>(imageData);
            Gl.BindTexture(TexTarg, TexturePtr);
            Gl.TexImage2D(TexTarg, 0, TexForm, Width, Height, 0, TexPForm, TexPType, imgDataPtr.Address);
            imgDataPtr.Dispose();
        }

        public void SetTextureAlpha(byte[] imageData)
        {
            var imgDataPtr = new AutoPtr<byte[]>(imageData);
            Gl.BindTexture(TexTarg, TexturePtr);
            Gl.TexImage2D(TexTarg, 0, AlphaTexForm, Width, Height, 0, AlphaTexPForm, TexPType, imgDataPtr.Address);
            imgDataPtr.Dispose();
        }
    }
}