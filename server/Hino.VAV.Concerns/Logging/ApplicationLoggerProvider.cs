using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Hino.VAV.Concerns.Logging
{
    /// <summary>
    /// A logging provider that wraps an <see cref="ApplicationLogger"/>
    /// </summary>
    /// <seealso cref="Microsoft.Extensions.Logging.ILoggerProvider" />
    public sealed class ApplicationLoggerProvider : ILoggerProvider
    {
        private static readonly ILogger DefaultNullLoggerInstance = new NullLogger();
        private readonly IConfigurationRoot _configurationRoot;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationLoggerProvider"/> class.
        /// </summary>
        /// <param name="configurationRoot">The configuration root.</param>
        public ApplicationLoggerProvider(IConfigurationRoot configurationRoot)
        {
            _configurationRoot = configurationRoot;
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        public void Dispose()
        {
            // Nothing to dispose
        }

        /// <summary>
        /// Creates a new <see cref="Microsoft.Extensions.Logging.ILogger" /> instance.
        /// </summary>
        /// <param name="categoryName">The category name for messages produced by the logger.</param>
        /// <returns>A new application logger</returns>
        public ILogger CreateLogger(string categoryName)
        {
            if (string.Equals(_configurationRoot["ASPNETCORE_ENVIRONMENT"], "Development", StringComparison.InvariantCultureIgnoreCase)
                || string.Equals(_configurationRoot["APP_ENVIRONMENT"], "Development", StringComparison.InvariantCultureIgnoreCase))
            {
                var result = new ApplicationLogger(_configurationRoot);

                var categoryLevel = "Logging:LogLevel:" + (categoryName ?? "Default");
                var fallbackLevel = "Logging:LogLevel:" + (categoryName?.Split('.')[0] ?? "Default");

                var logLevel = !string.IsNullOrWhiteSpace(_configurationRoot[categoryLevel])
                    ? _configurationRoot.GetValue(categoryLevel, LogLevel.Information)
                    : _configurationRoot.GetValue(fallbackLevel, LogLevel.Information);

                result.ChangeLogLevel(logLevel);

                return result;
            }

            return DefaultNullLoggerInstance;
        }
    }
}