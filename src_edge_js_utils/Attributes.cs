using System;


namespace EdgeJSUtils
{
    [System.AttributeUsage(AttributeTargets.Class)]
    public class JSExportableClassAttribute : System.Attribute
    {
        public JSExportableClassAttribute()
        {

        }
    }
    [System.AttributeUsage(
        AttributeTargets.Class |
        AttributeTargets.Method |
        AttributeTargets.Property |
        AttributeTargets.Field
        )]
    public class JSExportable: System.Attribute
    {

    }
}
