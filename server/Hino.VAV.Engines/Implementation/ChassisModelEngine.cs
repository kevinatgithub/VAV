using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;
using Hino.VAV.Resources;

namespace Hino.VAV.Engines.Implementation
{
    public class ChassisModelEngine : IChassisModelEngine
    {
        private readonly IChassisModelResource _chassisModelResource;

        public ChassisModelEngine(IChassisModelResource chassisModelResource)
        {
            _chassisModelResource = chassisModelResource;
        }

        public async Task<IEnumerable<ChassisModel>> GetChassisModels()
        {
            return await _chassisModelResource.GetChassisModels();
        }

        public async Task<ChassisModel> GetChassisModel(string id)
        {
            return await _chassisModelResource.GetChassisModel(id);
        }
    }
}
