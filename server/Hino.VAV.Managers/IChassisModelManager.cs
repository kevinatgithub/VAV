using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Managers
{
    public interface IChassisModelManager
    {
        Task<IEnumerable<ChassisModel>> GetChassisModels();

        Task<ChassisModel> GetChassisModel(string id);
    }
}
