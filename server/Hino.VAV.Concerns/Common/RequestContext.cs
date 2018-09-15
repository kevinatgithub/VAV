using System;
using System.Security.Principal;
using Hino.VAV.Concerns.Logging;

namespace Hino.VAV.Concerns.Common
{
    /// <inheritdoc />
    public class RequestContext : IRequestContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RequestContext"/> class.
        /// </summary>
        /// <param name="logger">The logger.</param>
        public RequestContext(IApplicationLogger logger)
        {
            Logger = logger;
        }

        /// <inheritdoc />
        public DateTime UtcNow => DateTime.UtcNow;

        /// <inheritdoc />
        public IApplicationLogger Logger { get; }

        /// <inheritdoc />
        public IIdentity Identity { get; set; }
    }
}