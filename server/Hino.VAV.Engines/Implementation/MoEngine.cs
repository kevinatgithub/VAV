using System;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Models;
using Hino.VAV.Resources;

namespace Hino.VAV.Engines.Implementation
{
    /// <inheritdoc />
    /// <summary>
    /// Engines contain business logic and encapsulate changes
    /// </summary>
    /// <seealso cref="Hino.VAV.Engines.IMoEngine" />
    public class MoEngine : IMoEngine
    {
        private readonly IRequestContext _requestContext;
        private readonly IMoResource _moResource;

        /// <summary>
        /// Initializes a new instance of the <see cref="MoEngine"/> class.
        /// </summary>
        /// <param name="requestContext">The request context.</param>
        /// <param name="moResource">The template resource.</param>
        public MoEngine(IRequestContext requestContext, IMoResource moResource)
        {
            _requestContext = requestContext;
            _moResource = moResource;
        }

        public Mo GetMo()
        {
            _requestContext?.Logger?.Debug("MoEngine: Resolving template at {time}", DateTime.Now);

            return _moResource.GetMo();
        }
    }
}
