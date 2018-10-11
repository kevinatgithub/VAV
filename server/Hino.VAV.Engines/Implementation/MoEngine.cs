using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Concerns;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
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

        public async Task<IEnumerable<Mo>> GetMoList(string status, string keyWord)
        {
            _requestContext?.Logger?.Debug("MoEngine: Getting mo list");

            status = status == string.Empty ? "%" : status;
            keyWord = keyWord == string.Empty ? "%" : "%" + keyWord + "%";

            return await _moResource.GetMoList(status, keyWord);
        }

        public async Task<IEnumerable<MoChassis>> SearchChassis(string keyWord)
        {
            keyWord = keyWord == string.Empty ? "%" : "%" + keyWord + "%";

            return await _moResource.SearchChassis(keyWord);
        }

        public async Task<IEnumerable<MoChassis>> GetChassis(string id)
        {
            return await _moResource.GetChassis(id);
        }

        public async Task<Mo> ProcessMo(string id, string[] chassisNumbers)
        {
            if (chassisNumbers.Length == 0)
            {
                throw new AppBusinessException("InvalidChassis", "Unable to process MO without chassis numbers specified");
            }

            var mo = await _moResource.GetMo(id);
            mo.Status = MoStatus.InProgress;

            await _moResource.UpdateMo(mo);

            foreach (var c in chassisNumbers)
            {
                var chassis = await _moResource.GetChassisDetails(c);
                chassis.IsPrinted = true;
                chassis.PrintDateTime = DateTime.UtcNow;

                await _moResource.UpdateChassis(chassis);
            }

            return mo;

            // TODO signalR printing
        }
    }
}
