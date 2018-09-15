using Hino.VAV.Concerns.Logging;
using Microsoft.Extensions.Configuration;

namespace Hino.VAV.Api.AppStart
{
    /// <summary>
    /// Startup for Loggin
    /// </summary>
    public static class StartupLogging
    {
        /// <summary>
        /// Configures container services
        /// </summary>
        /// <param name="configuration">Configuration data</param>
        public static void Configure(IConfigurationRoot configuration)
        {
            ApplicationLoggerConfiguration.Setup(configuration);
        }
    }
}