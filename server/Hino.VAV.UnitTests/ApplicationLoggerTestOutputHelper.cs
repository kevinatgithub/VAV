using Hino.VAV.Concerns.Logging;
using Serilog.Core;
using Serilog.Events;
using Xunit.Abstractions;

namespace Hino.VAV.UnitTests
{
    public class ApplicationLoggerTestOutputHelper : ILogEventSink
    {
        private readonly ITestOutputHelper _output;

        private ApplicationLoggerTestOutputHelper(ITestOutputHelper output)
        {
            _output = output;
        }

        public static IApplicationLogger CreateApplicationLogger(ITestOutputHelper output)
        {
            var logger = new Serilog.LoggerConfiguration()
                .MinimumLevel.Verbose()
                .WriteTo.Sink(new ApplicationLoggerTestOutputHelper(output))
                .CreateLogger();

            return ApplicationLogger.Create(logger);
        }

        public void Emit(LogEvent logEvent)
        {
            _output.WriteLine(logEvent.RenderMessage());
        }
    }
}