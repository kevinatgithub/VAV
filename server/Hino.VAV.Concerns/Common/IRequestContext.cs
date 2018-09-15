using System;
using System.Security.Principal;
using Hino.VAV.Concerns.Logging;

namespace Hino.VAV.Concerns.Common
{
    /// <summary>
    /// Represents the current request context. Classes implementing this interface should be instantiated once for each request.
    /// Classes that reference this interface have access to commong logging and identity information.
    /// </summary>
    public interface IRequestContext
    {
        /// <summary>
        /// Gets the current <see cref="DateTime" /> in the UTC time zone.
        /// Direct usage of <see cref="DateTime.UtcNow"/> or <see cref="DateTimeOffset.UtcNow"/> is discouraged because it's not easy to test
        /// methods that depend on the system time. By using this property, system time information can be adjusted.
        /// </summary>
        /// <value>
        ///     Returns the current UTC date and time
        /// </value>
        DateTime UtcNow { get; }

        /// <summary>
        ///     Gets the logger that is associated with this request.
        /// </summary>
        /// <value>
        ///     Returns the logger associated with this request
        /// </value>
        IApplicationLogger Logger { get; }

        /// <summary>
        ///     Gets the Identity associated with this request
        /// </summary>
        /// <value>
        ///     The identity.
        /// </value>
        IIdentity Identity { get; }
    }
}