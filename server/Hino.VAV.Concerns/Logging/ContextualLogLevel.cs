using System.Linq;
using Microsoft.Extensions.Configuration;

namespace Hino.VAV.Concerns.Logging
{
    public class ContextualLogLevel
    {
        private readonly bool _isInfoEnabledForAll;
        private readonly bool _isInfoDisabledForAll;
        private readonly bool _isDebugEnabledForAll;
        private readonly bool _isDebugDisabledForAll;
        private readonly bool _isTraceEnabledForAll;
        private readonly bool _isTraceDisabledForAll;

        public ContextualLogLevel()
            : this(null)
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ContextualLogLevel"/> class.
        /// Configuration samples
        /// <para>
        /// "Contextual": {
        ///   "Enabled": true,
        ///   "Info": ["*"]
        /// }
        /// </para>
        /// <para>
        /// "Contextual": {
        ///   "Enabled": true,
        ///   "Info": ["jan", "piet"],
        ///   "Debug": ["joris"]
        /// }
        /// </para>
        /// <para>
        /// "Contextual": {
        ///   "Enabled": true,
        ///   "Info": ["*"],
        ///   "Debug": ["korneel"],
        ///   "Trace": []
        /// }
        /// </para>
        /// </summary>
        /// <param name="configuration">Configuration options</param>
        public ContextualLogLevel(IConfiguration configuration)
        {
            Enabled = true;
            Trace = new string[0];
            Debug = new string[0];
            Info = new string[0];

            // Bind will append users to the arrays
            configuration?.Bind(this);

            _isInfoEnabledForAll = Info?.Length > 0 && Info[0] == "*";
            _isInfoDisabledForAll = Info == null || Info.Length == 0;

            _isDebugEnabledForAll = Debug?.Length > 0 && Debug[0] == "*";
            _isDebugDisabledForAll = Debug == null || Debug.Length == 0;

            _isTraceEnabledForAll = Trace?.Length > 0 && Trace[0] == "*";
            _isTraceDisabledForAll = Trace == null || Trace.Length == 0;

            Debug = Trace.Concat(Debug).Distinct().ToArray();
            Info = Debug.Concat(Info).Distinct().ToArray();
        }

        /// <summary>
        /// Gets a value indicating whether the processing is enabled.
        /// </summary>
        /// <value>
        ///   <c>true</c> if enabled; otherwise, <c>false</c>.
        /// </value>
        public bool Enabled { get; }

        /// <summary>
        /// Gets or sets an array of users for which that will trigger an information version of the log.
        /// If the first entry is a '*', everyone is elegible for debug logging.
        /// </summary>
        /// <value>List of info users</value>
        public string[] Info { get; set; }

        /// <summary>
        /// Gets or sets an array of users that will trigger a debug version of the log.
        /// This includes the Request and Response items.
        /// If the first entry is a '*', everyone is elegible for debug logging.
        /// </summary>
        /// <value>List of debug users</value>
        public string[] Debug { get; set; }

        /// <summary>
        /// Gets or sets an array of users that will trigger a verbose version of the log.
        /// This includes the Request and Response items.
        /// If the first entry is a '*', everyone is elegible for debug logging.
        /// </summary>
        /// <value>List of Trace users</value>
        public string[] Trace { get; set; }

        /// <summary>
        /// Indicates if Info should be logged
        /// </summary>
        /// <param name="context">The context identifier.</param>
        /// <returns>
        ///   <c>true</c> if info should be logged; otherwise, <c>false</c>.
        /// </returns>
        public bool ShouldLogInfo(string context)
        {
            if (_isInfoEnabledForAll)
            {
                return true;
            }

            if (_isInfoDisabledForAll)
            {
                return false;
            }

            return IsValidContext(Info, context);
        }

        /// <summary>
        /// Indicates if Debug should be logged
        /// </summary>
        /// <param name="context">The context identifier.</param>
        /// <returns>
        ///   <c>true</c> if debug should be logged; otherwise, <c>false</c>.
        /// </returns>
        public bool ShouldLogDebug(string context)
        {
            if (_isDebugEnabledForAll)
            {
                return true;
            }

            if (_isDebugDisabledForAll)
            {
                return false;
            }

            return IsValidContext(Debug, context);
        }

        /// <summary>
        /// Indicates if Trace should be logged
        /// </summary>
        /// <param name="context">The context identifier.</param>
        /// <returns>
        ///   <c>true</c> if trace should be logged; otherwise, <c>false</c>.
        /// </returns>
        public bool ShouldLogTrace(string context)
        {
            if (_isTraceEnabledForAll)
            {
                return true;
            }

            if (_isTraceDisabledForAll)
            {
                return false;
            }

            return IsValidContext(Trace, context);
        }

        /// <summary>
        /// Determines whether [is valid context for mode] [the specified contexts].
        /// </summary>
        /// <param name="contexts">The contexts.</param>
        /// <param name="context">The context identifier.</param>
        /// <returns>
        ///   <c>true</c> if [is valid context for mode] [the specified contexts]; otherwise, <c>false</c>.
        /// </returns>
        private static bool IsValidContext(string[] contexts, string context)
        {
            if (contexts == null)
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(context))
            {
                return false;
            }

            return contexts.Contains(context);
        }
    }
}