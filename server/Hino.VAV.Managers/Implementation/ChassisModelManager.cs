using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Engines;
using Hino.VAV.Models;

namespace Hino.VAV.Managers.Implementation
{
    public class ChassisModelManager : IChassisModelManager
    {
        private readonly IChassisModelEngine _chassisModelEngine;

        public ChassisModelManager(IChassisModelEngine chassisModelEngine)
        {
            _chassisModelEngine = chassisModelEngine;
        }

        public async Task<IEnumerable<ChassisModel>> GetChassisModels()
        {
            return await _chassisModelEngine.GetChassisModels();
        }

        public async Task<ChassisModel> GetChassisModel(string id)
        {
            return await _chassisModelEngine.GetChassisModel(id);
        }
    }
}
