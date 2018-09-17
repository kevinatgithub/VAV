using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace Hino.VAV.Api.Web
{
    /// <summary>
    /// Middleware class for Exception Handling
    /// </summary>
    public class ClientConfigurationMiddleware
    {
        private static readonly JsonSerializer Serializer = new JsonSerializer();
        private readonly RequestDelegate _next;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClientConfigurationMiddleware"/> class.
        /// </summary>
        /// <param name="next">The next.</param>
        public ClientConfigurationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Invokes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns>An awaitable task</returns>
        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.Value.EndsWith("/app/config.js", StringComparison.InvariantCultureIgnoreCase))
            {
                await WriteConfigurationData(context, "application/javascript");
            }
            else if (context.Request.Path.Value.EndsWith("/app/config.json", StringComparison.InvariantCultureIgnoreCase))
            {
                await WriteConfigurationData(context, "application/json");
            }
            else
            {
                await _next(context);
            }
        }

        private static object CreateConfigurationObject(HttpContext context)
        {
            var configuration = context.RequestServices.GetService<IConfigurationRoot>();

            var configData = new
            {
                Logging = new
                {
                    ApplicationInsights = new
                    {
                        InstrumentationKey = configuration["Logging:ApplicationInsights:InstrumentationKey"]
                    }
                }
            };
            return configData;
        }

        private static async Task WriteConfigurationData(HttpContext context, string contentType)
        {
            var configData = CreateConfigurationObject(context);

            using (var textWriter = new StreamWriter(context.Response.Body))
            using (var jsonWriter = new JsonTextWriter(textWriter))
            {
                context.Response.ContentType = contentType;

                if (GetQueryStringSafeValue(context, "var", out var varName))
                {
                    textWriter.Write($"var {varName} = ");
                    textWriter.Flush();
                }

                Serializer.Serialize(jsonWriter, configData);
                jsonWriter.Flush();
                textWriter.Flush();

                await context.Response.Body.FlushAsync();
            }
        }

        private static bool GetQueryStringSafeValue(HttpContext context, string key, out string value)
        {
            if (context.Request.Query.TryGetValue(key, out StringValues varValues)
                && varValues.Count > 0
                && !string.IsNullOrWhiteSpace(varValues[0])
                && varValues[0].All(IsAllowedVarLetter))
            {
                value = varValues[0];
                return true;
            }

            value = null;
            return false;
        }

        private static bool IsAllowedVarLetter(char c)
        {
            return (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
        }
    }
}