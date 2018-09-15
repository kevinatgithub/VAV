using System;
using Microsoft.Extensions.Logging;

namespace Hino.VAV.Concerns.Logging
{
    /// <summary>
    /// Logger that doesn't log anything
    /// </summary>
    /// <seealso cref="Microsoft.Extensions.Logging.ILogger" />
    /// <seealso cref="System.IDisposable" />
    internal sealed class NullLogger : ILogger, IDisposable
    {
        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            // Not logging anything is the whole purpose
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return false;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return this;
        }

        public void Dispose()
        {
            // Nothing to dispose
        }
    }
}