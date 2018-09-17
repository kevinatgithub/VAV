using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<Mo> GetMo(string id)
        {
            return await _moEngine.GetMo(id);
        }

        public async Task<IEnumerable<Mo>> GetMoList()
        {
            return await _moEngine.GetMoList();
        }

        public async Task<IEnumerable<MoChassis>> GetChassis(string id)
        {
            return await _moEngine.GetChassis(id);
        }
    }
}
