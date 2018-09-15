using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace Hino.VAV.Api.Web
{
    /// <summary>
    /// <see cref="IApplicationBuilder"/> extension class that adds client configuration data.
    /// </summary>
    public static class ClientConfigurationExtensions
    {
        /// <summary>
        /// Adds a middleware to the pipeline that will return client configuration data.
        /// </summary>
        /// <param name="app">Application builder information</param>
        /// <exception cref="ArgumentNullException">An <paramref name="app"/> is required</exception>
        /// <returns>The same <paramref name="app"/> <see cref="IApplicationBuilder"/></returns>
        public static IApplicationBuilder UseClientConfiguration(this IApplicationBuilder app)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }

            return app.UseMiddleware<ClientConfigurationMiddleware>();
        }
    }
}