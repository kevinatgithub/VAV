using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Concerns;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
using Hino.VAV.Engines;
using Hino.VAV.Models;
using Hino.VAV.Resources;

namespace Hino.VAV.Managers.Implementation
{
    /// <inheritdoc />
    /// <summary>
    /// Managers orchestrate calls to one or more engines.
    /// </summary>
    public class MoManager : IMoManager
    {
        private readonly IRequestContext _requestContext;
        private readonly IMoResource _resource; // remove later
        private readonly IMoEngine _moEngine;

        public MoManager(IRequestContext requestContext, IMoEngine moEngine, IMoResource moResource)
        {
            _requestContext = requestContext;
            _moEngine = moEngine;
            _resource = moResource;
        }

        public async Task<Mo> GetMo(string id)
        {
            return await _moEngine.GetMo(id);
        }

        public async Task<IEnumerable<Mo>> GetMoList(string status = "", string keyWord = "")
        {
            return await _moEngine.GetMoList(status, keyWord);
        }

        public async Task<IEnumerable<MoChassis>> SearchChassis(string keyWord)
        {
            return await _moEngine.SearchChassis(keyWord);
        }

        public async Task<IEnumerable<MoChassis>> GetChassis(string id)
        {
            return await _moEngine.GetChassis(id);
        }

        public async Task<Mo> ProcessMo(string id, bool isSpecialProject, string[] chassisNumbers)
        {
            return await _moEngine.ProcessMo(id, isSpecialProject, chassisNumbers);
        }

        public async Task<Mo> ResetMo(string id)
        {
            var mo = await _moEngine.GetMo(id);
            var chassis = await _moEngine.GetChassis(id);
            mo.Status = MoStatus.New;
            foreach (var c in chassis)
            {
                c.IsPrinted = false;
                c.PrintDateTime = null;
                await _resource.UpdateChassis(c);
            }

            return mo;
        }
    }
}
