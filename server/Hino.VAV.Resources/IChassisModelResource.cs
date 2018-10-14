using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Resources
{
    public interface IChassisModelResource
    {
        Task<IEnumerable<ChassisModel>> GetChassisModels();

        Task<ChassisModel> GetChassisModel(string id);
    }
}
