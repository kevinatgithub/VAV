using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using ILogger = Serilog.ILogger;

namespace Hino.VAV.Concerns.Logging
{
    /// <summary>
    /// The application logger is a wrapper around the current <see cref="Serilog.Log.Logger"/>, the big difference is that this class
    /// should be instantiated for each request. This allows us to have more granular control over several aspects of logging, most
    /// notably the log level. That level can be adjusted on a per-call basis.
    /// </summary>
    /// <seealso cref="Hino.VAV.Concerns.Logging.IApplicationLogger" />
    /// <seealso cref="Microsoft.Extensions.Logging.ILogger" />
    /// <seealso cref="System.IDisposable" />
    public sealed class ApplicationLogger : IApplicationLogger, Microsoft.Extensions.Logging.ILogger, IDisposable
    {
        private static readonly Dictionary<string, ContextualLogLevel> ContextualLogLevel = new Dictionary<string, ContextualLogLevel>();
        private readonly LogLevel _defaultLoglevel;
        private readonly IConfigurationRoot _config;
        private ILogger _target;
        private LogLevel _loglevel;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationLogger"/> class.
        /// <remarks>
        /// This is the only public constructor of the class to make it easy for DI containers to find the appropriate constructor.
        /// </remarks>
        /// </summary>
        /// <param name="config">The configuration.</param>
        public ApplicationLogger(IConfigurationRoot config)
            : this(config, Serilog.Log.Logger)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationLogger"/> class.
        /// </summary>
        /// <param name="config">The configuration.</param>
        /// <param name="target">The target.</param>
        /// <param name="loglevel">The loglevel.</param>
        private ApplicationLogger(IConfigurationRoot config, ILogger target, LogLevel loglevel)
            : this(config, target)
        {
            _loglevel = loglevel;
            _defaultLoglevel = _loglevel;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationLogger"/> class.
        /// </summary>
        /// <param name="config">The configuration.</param>
        /// <param name="target">The target.</param>
        private ApplicationLogger(IConfigurationRoot config, ILogger target)
        {
            _config = config;
            _target = target;

            if (_config == null ||
                !Enum.TryParse(config["Logging:LogLevel:Default"] ?? string.Empty, out _loglevel))
            {
                _loglevel = LogLevel.Information;
            }

            _defaultLoglevel = _loglevel;
        }

        /// <summary>
        /// Creates a new <see cref="ApplicationLogger"/> for the <paramref name="logger"/>.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <returns>A new application logger, based on the input logger</returns>
        public static IApplicationLogger Create(ILogger logger)
        {
            return new ApplicationLogger(null, logger, LogLevel.Trace);
        }

        /// <inheritdoc />
        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            Write(logLevel, exception, "{generic}", formatter(state, exception));
        }

        /// <inheritdoc />
        public IDisposable BeginScope<TState>(TState state)
        {
            return (ApplicationLogger)With("scope", state);
        }

        /// <summary>
        /// Determines whether logging for the specified level is enabled.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <returns>
        /// <c>true</c> if the specified level is enabled; otherwise, <c>false</c>.
        /// </returns>
        public bool IsEnabled(LogLevel level)
        {
            // The desired level must be greater than or equal to the configured level
            return level >= _loglevel && level != LogLevel.None;
        }

        /// <inheritdoc />
        public void SetContext(string contextName, string contextValue)
        {
            if (_config == null)
            {
                return;
            }

            if (string.IsNullOrWhiteSpace(contextValue))
            {
                return;
            }

            if (!ContextualLogLevel.ContainsKey(contextName))
            {
                ContextualLogLevel[contextName] = new ContextualLogLevel(_config.GetSection("Logging:LogLevel:" + contextName));
            }

            var level = ContextualLogLevel[contextName];

            if (!IsEnabled(LogLevel.Trace) &&
                level.ShouldLogTrace(contextValue))
            {
                ChangeLogLevel(LogLevel.Trace);
            }
            else if (!IsEnabled(LogLevel.Debug) &&
                     level.ShouldLogDebug(contextValue))
            {
                ChangeLogLevel(LogLevel.Debug);
            }
            else if (!IsEnabled(LogLevel.Information) &&
                     level.ShouldLogInfo(contextValue))
            {
                ChangeLogLevel(LogLevel.Information);
            }
        }

        /// <inheritdoc />
        public void ChangeLogLevel(LogLevel level)
        {
            _loglevel = level;
        }

        /// <inheritdoc />
        public void ResetLogLevel()
        {
            _loglevel = _defaultLoglevel;
        }

        /// <inheritdoc />
        public void AddLogger(TextWriter writer)
        {
            _target = new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .WriteTo.Logger(_target)
                .WriteTo.TextWriter(writer)
                .CreateLogger();
        }

        /// <inheritdoc />
        public void Error<T1>(string template, T1 parameter1)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(template, parameter1);
        }

        /// <inheritdoc />
        public void Error<T1, T2>(string template, T1 parameter1, T2 parameter2)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(template, parameter1, parameter2);
        }

        /// <inheritdoc />
        public void Error<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(template, parameter1, parameter2, parameter3);
        }

        /// <inheritdoc />
        public void Error(string template, params object[] parameters)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(template, parameters);
        }

        /// <inheritdoc />
        public void Error<T1>(Exception exception, string template, T1 parameter1)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(exception, template, parameter1);
        }

        /// <inheritdoc />
        public void Error<T1, T2>(Exception exception, string template, T1 parameter1, T2 parameter2)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(exception, template, parameter1, parameter2);
        }

        /// <inheritdoc />
        public void Error<T1, T2, T3>(Exception exception, string template, T1 parameter1, T2 parameter2, T3 parameter3)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(exception, template, parameter1, parameter2, parameter3);
        }

        /// <inheritdoc />
        public void Error(Exception exception, string template, params object[] parameters)
        {
            if (!IsEnabled(LogLevel.Error))
            {
                return;
            }

            _target.Error(exception, template, parameters);
        }

        /// <inheritdoc />
        public void Warning<T1>(string template, T1 parameter1)
        {
            if (!IsEnabled(LogLevel.Warning))
            {
                return;
            }

            _target.Warning(template, parameter1);
        }

        /// <inheritdoc />
        public void Warning<T1, T2>(string template, T1 parameter1, T2 parameter2)
        {
            if (!IsEnabled(LogLevel.Warning))
            {
                return;
            }

            _target.Warning(template, parameter1, parameter2);
        }

        /// <inheritdoc />
        public void Warning<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3)
        {
            if (!IsEnabled(LogLevel.Warning))
            {
                return;
            }

            _target.Warning(template, parameter1, parameter2, parameter3);
        }

        /// <inheritdoc />
        public void Warning(string template, params object[] parameters)
        {
            if (!IsEnabled(LogLevel.Warning))
            {
                return;
            }

            _target.Warning(template, parameters);
        }

        /// <inheritdoc />
        public void Information<T1>(string template, T1 parameter1)
        {
            if (!IsEnabled(LogLevel.Information))
            {
                return;
            }

            _target.Information(template, parameter1);
        }

        /// <inheritdoc />
        public void Information<T1, T2>(string template, T1 parameter1, T2 parameter2)
        {
            if (!IsEnabled(LogLevel.Information))
            {
                return;
            }

            _target.Information(template, parameter1, parameter2);
        }

        /// <inheritdoc />
        public void Information<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3)
        {
            if (!IsEnabled(LogLevel.Information))
            {
                return;
            }

            _target.Information(template, parameter1, parameter2, parameter3);
        }

        /// <inheritdoc />
        public void Information(string template, params object[] parameters)
        {
            if (!IsEnabled(LogLevel.Information))
            {
                return;
            }

            _target.Information(template, parameters);
        }

        /// <inheritdoc />
        public void Debug<T1>(string template, T1 parameter1)
        {
            if (!IsEnabled(LogLevel.Debug))
            {
                return;
            }

            _target.Debug(template, parameter1);
        }

        /// <inheritdoc />
        public void Debug<T1, T2>(string template, T1 parameter1, T2 parameter2)
        {
            if (!IsEnabled(LogLevel.Debug))
            {
                return;
            }

            _target.Debug(template, parameter1, parameter2);
        }

        /// <inheritdoc />
        public void Debug<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3)
        {
            if (!IsEnabled(LogLevel.Debug))
            {
                return;
            }

            _target.Debug(template, parameter1, parameter2, parameter3);
        }

        /// <inheritdoc />
        public void Debug(string template, params object[] parameters)
        {
            if (!IsEnabled(LogLevel.Debug))
            {
                return;
            }

            _target.Debug(template, parameters);
        }

        /// <inheritdoc />
        public void Trace<T1>(string template, T1 parameter1)
        {
            if (!IsEnabled(LogLevel.Trace))
            {
                return;
            }

            _target.Verbose(template, parameter1);
        }

        /// <inheritdoc />
        public void Trace<T1, T2>(string template, T1 parameter1, T2 parameter2)
        {
            if (!IsEnabled(LogLevel.Trace))
            {
                return;
            }

            _target.Verbose(template, parameter1, parameter2);
        }

        /// <inheritdoc />
        public void Trace<T1, T2, T3>(string template, T1 parameter1, T2 parameter2, T3 parameter3)
        {
            if (!IsEnabled(LogLevel.Trace))
            {
                return;
            }

            _target.Verbose(template, parameter1, parameter2, parameter3);
        }

        /// <inheritdoc />
        public void Trace(string template, params object[] parameters)
        {
            if (!IsEnabled(LogLevel.Trace))
            {
                return;
            }

            _target.Verbose(template, parameters);
        }

        /// <inheritdoc />
        public void Write(LogLevel level, Exception exception, string template)
        {
            if (!IsEnabled(level))
            {
                return;
            }

            _target.Write(MapToSerilogLevel(level), exception, template);
        }

        /// <inheritdoc />
        public void Write<T1>(LogLevel level, Exception exception, string template, T1 parameter1)
        {
            if (!IsEnabled(level))
            {
                return;
            }

            _target.Write(MapToSerilogLevel(level), exception, template, parameter1);
        }

        /// <inheritdoc />
        public void Write<T1, T2>(LogLevel level, Exception exception, string template, T1 parameter1, T2 parameter2)
        {
            if (!IsEnabled(level))
            {
                return;
            }

            _target.Write(MapToSerilogLevel(level), exception, template, parameter1, parameter2);
        }

        /// <inheritdoc />
        public void Write<T1, T2, T3>(LogLevel level, Exception exception, string template, T1 parameter1, T2 parameter2, T3 parameter3)
        {
            if (!IsEnabled(level))
            {
                return;
            }

            _target.Write(MapToSerilogLevel(level), exception, template, parameter1, parameter2, parameter3);
        }

        /// <inheritdoc />
        public IApplicationLogger With(string propertyName, object value)
        {
            return new ApplicationLogger(
                _config,
                _target.ForContext(propertyName, value),
                _loglevel);
        }

        /// <inheritdoc />
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Maps the level to a corresponding serilog level.
        /// </summary>
        /// <param name="level">The level.</param>
        /// <returns>The serilog even level matching the abstract loglevel</returns>
        /// <exception cref="ArgumentOutOfRangeException">level - null</exception>
        private static LogEventLevel MapToSerilogLevel(LogLevel level)
        {
            switch (level)
            {
                case LogLevel.Trace:
                    return LogEventLevel.Verbose;
                case LogLevel.Debug:
                    return LogEventLevel.Debug;
                case LogLevel.Information:
                    return LogEventLevel.Information;
                case LogLevel.Warning:
                    return LogEventLevel.Warning;
                case LogLevel.Error:
                    return LogEventLevel.Error;
                case LogLevel.Critical:
                    return LogEventLevel.Fatal;
                default:
                    throw new ArgumentOutOfRangeException(nameof(level), level, null);
            }
        }
    }
}