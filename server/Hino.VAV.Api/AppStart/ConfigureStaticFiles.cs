using Microsoft.AspNetCore.Builder;

namespace Hino.VAV.Api.AppStart
{
    public static class ConfigureStaticFiles
    {
        public static StaticFileOptions CreateOptions()
        {
            return new StaticFileOptions
            {
                OnPrepareResponse = fileContext =>
                {
                    fileContext.Context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
                    fileContext.Context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
                    fileContext.Context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
                    fileContext.Context.Response.Headers.Add("Referrer-Policy", "strict-origin");
                    fileContext.Context.Response.Headers.Add(
                        "Content-Security-Policy",
                        @"default-src * ; script-src https://* ; style-src https://* 'unsafe-inline' ; img-src * 'self' data: https: ; font-src https://* ;");
                    if (!fileContext.Context.Request.Host.Host.Equals("localhost"))
                    {
                        fileContext.Context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    }
                }
            };
        }
    }
}