using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Hino.VAV.Api.Web;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json.Linq;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Hino.VAV.Api.AppStart
{
    /// <summary>
    /// Startup for API Documentation
    /// </summary>
    public static class StartupApiDocs
    {
        /// <summary>
        /// Configures container services
        /// </summary>
        /// <param name="configuration">Configuration for Docs</param>
        /// <param name="services">Collection of services</param>
        /// <param name="environment">The hosting environment</param>
        /// <param name="apiName">Name of the API</param>
        public static void Configure(IServiceCollection services, IHostingEnvironment environment, string apiName)
        {
            // Add Swagger options
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = $"{apiName} - {environment.EnvironmentName}", Version = "v1" });

                var filePath = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, "Hino.VAV.Api.xml");
                if (File.Exists(filePath))
                {
                    c.IncludeXmlComments(filePath);
                }

                // Add https scheme, allow both http and https in development
                if (environment.IsDevelopment())
                {
                    c.DocumentFilter<ApiDocHttpHttpsFilter>();
                }
                else
                {
                    c.DocumentFilter<ApiDocHttpsFilter>();
                }

                // Assign scope requirements to operations based on AuthorizeAttribute
                c.OperationFilter<ApiDocOAuth2SecurityFilter>();
            });
        }

        internal static void Configure(SwaggerUIOptions c, string apiName, string environmentName)
        {
            c.SwaggerEndpoint("v1/swagger.json", $"{apiName} - {environmentName}");

            // c.OAuth2RedirectUrl("/swagger/oauth2-redirect.html");
        }
    }
}