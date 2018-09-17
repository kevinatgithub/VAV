using System;
using Microsoft.AspNetCore.Builder;

namespace Hino.VAV.Api.Web
{
    /// <summary>
    /// <see cref="IApplicationBuilder"/> extension class that adds exception handling middleware to the pipelin
    /// </summary>
    public static class RequestContextExtensions
    {
        /// <summary>
        /// Adds a middleware to the pipeline to configure the app context.
        /// </summary>
        /// <param name="app">Application builder information</param>
        /// <exception cref="ArgumentNullException">An <paramref name="app"/> is required</exception>
        /// <returns>The same <paramref name="app"/> <see cref="IApplicationBuilder"/></returns>
        public static IApplicationBuilder UseRequestContext(this IApplicationBuilder app)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }

            return app.UseMiddleware<RequestContextMiddleware>();
        }
    }
}