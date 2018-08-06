using System;
using System.Threading.Tasks;

namespace OVRLayJS
{
    public class OVRLay
    {
        public static string SuperTest = "Test";

        public async Task<Object> Test(dynamic dat)
        {
            return "Super " + SuperTest;
        }

        public async Task<Object> AsyncTest(dynamic dat)
        {
            return "Async Super " + SuperTest;
        }

        public async Task<Object> TestError(dynamic dat)
        {
            throw new Exception("Test!");
            return false;
        }
    }
}