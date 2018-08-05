using System;
using System.Runtime.InteropServices;

namespace OVRLayJS.Util
{
    public class AutoPtr<T> : IDisposable
    {
        private bool disposed = false;

        public IntPtr Address { get; }
        public T RawObject { get; }
        private GCHandle _objectHandle;

        public AutoPtr(T obj)
        {
            _objectHandle = GCHandle.Alloc(obj, GCHandleType.Pinned);
            RawObject = obj;
            Address = _objectHandle.AddrOfPinnedObject();
        }

        ~AutoPtr() { Dispose(false); }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            _objectHandle.Free();

            disposed = true;
        }
    }
}