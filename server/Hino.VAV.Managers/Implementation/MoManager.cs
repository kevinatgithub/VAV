using System.Linq;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
using Hino.VAV.Engines;
using Hino.VAV.Models;

namespace Hino.VAV.Managers.Implementation
{
    /// <inheritdoc />
    /// <summary>
    /// Managers orchestrate calls to one or more engines.
    /// </summary>
    public class MoManager : IMoManager
    {
        private readonly IRequestContext _requestContext;
        private readonly IMoEngine _moEngine;

        /// <summary>
        /// Initializes a new instance of the <see cref="MoManager"/> class.
        /// </summary>
        /// <param name="requestContext">The request context.</param>
        /// <param name="moEngine">The template engine.</param>
        public MoManager(IRequestContext requestContext, IMoEngine moEngine)
        {
            _requestContext = requestContext;
            _moEngine = moEngine;
        }

        /// <param name="id"></param>
        /// <inheritdoc />
        public Mo GetMo(string id)
        {
            return _moEngine.GetMo();
        }
    }
}
