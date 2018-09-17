using System;

namespace Hino.VAV.Concerns.Logging
{
    internal class RollingFileConfig
    {
        public int RetainedFileCountLimit { get; set; } = 31;

        public long FileSizeLimitBytes { get; set; } = 1073741824;

        public string OutputTemplate { get; set; } = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level}] {Message}{NewLine}{Exception}";

        public bool Buffered { get; set; }

        public bool Shared { get; set; }

        public TimeSpan? FlushToDiskInterval { get; set; } = null;
    }
}