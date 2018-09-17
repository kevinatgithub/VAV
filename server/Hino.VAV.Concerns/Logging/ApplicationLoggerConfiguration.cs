using System;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace Hino.VAV.Concerns.Logging
{
    /// <summary>
    /// Creates a logger based on the current configuration.
    /// <remarks>
    /// If 'ASPNETCORE_ENVIRONMENT' or 'EANDISAPP_ENVIRONMENT' is 'Development', a ColoredConsole and Trace logger is added.
    /// </remarks>
    /// <remarks>
    /// If a 'Logging:ApplicationInsights:InstrumentationKey' is available, an Application Insights logger is added.
    /// </remarks>
    /// <remarks>
    /// If a 'Logging:File:Path' is available, a file logger is added.
    /// This logger is configured using values available in <see cref="RollingFileConfig"/>
    /// </remarks>
    /// </summary>
    public static class ApplicationLoggerConfiguration
    {
        /// <summary>
        /// Sets up a new logger based only on manual options. No configuration is applied.
        /// </summary>
        /// <param name="options">The options.</param>
        public static void Setup(Func<LoggerConfiguration, LoggerConfiguration> options)
        {
            Setup(null, options);
        }

        /// <summary>
        /// Sets up a new logger based only on configuration data.
        /// </summary>
        /// <param name="configurationRoot">The configuration root.</param>
        public static void Setup(IConfigurationRoot configurationRoot)
        {
            Setup(configurationRoot, null);
        }

        /// <summary>
        /// Sets up a logger based on both configuration data and manual options. The options are applied last.
        /// </summary>
        /// <param name="configurationRoot">The configuration root.</param>
        /// <param name="options">The options.</param>
        public static void Setup(IConfigurationRoot configurationRoot, Func<LoggerConfiguration, LoggerConfiguration> options)
        {
            var logConfiguration = new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .Enrich.FromLogContext();

            if (string.Equals(configurationRoot["ASPNETCORE_ENVIRONMENT"], "Development", StringComparison.InvariantCultureIgnoreCase)
                || string.Equals(configurationRoot["APP_ENVIRONMENT"], "Development", StringComparison.InvariantCultureIgnoreCase))
            {
                logConfiguration.WriteTo.ColoredConsole();
                logConfiguration.WriteTo.Trace();
            }

            if (!string.IsNullOrEmpty(configurationRoot["Logging:ApplicationInsights:InstrumentationKey"]))
            {
                logConfiguration.WriteTo.ApplicationInsightsTraces(
                    configurationRoot["Logging:ApplicationInsights:InstrumentationKey"]);
            }

            if (!string.IsNullOrEmpty(configurationRoot["Logging:File:Path"]))
            {
                var rollingFileConfig = new RollingFileConfig();
                configurationRoot.GetSection("Logging:File").Bind(rollingFileConfig);

                logConfiguration.WriteTo.RollingFile(
                    configurationRoot["Logging:File:Path"],
                    fileSizeLimitBytes: rollingFileConfig.FileSizeLimitBytes,
                    outputTemplate: rollingFileConfig.OutputTemplate,
                    retainedFileCountLimit: rollingFileConfig.RetainedFileCountLimit,
                    buffered: rollingFileConfig.Buffered,
                    shared: rollingFileConfig.Shared,
                    flushToDiskInterval: rollingFileConfig.FlushToDiskInterval);
            }

            if (options != null)
            {
                logConfiguration = options(logConfiguration);
            }

            Log.Logger = logConfiguration.CreateLogger();
        }
    }
}