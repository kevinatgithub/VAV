using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<Mo> GetMo(string id)
        {
            _requestContext?.Logger?.Debug("MoEngine: Getting mo details {id}", id);

            return await _moResource.GetMo(id);
        }

        public async Task<IEnumerable<Mo>> GetMoList()
        {
            _requestContext?.Logger?.Debug("MoEngine: Getting mo list");

            return await _moResource.GetMoList();
        }

        public async Task<IEnumerable<MoChassis>> GetChassis(string id)
        {
            return await _moResource.GetChassis(id);
        }
    }
}
