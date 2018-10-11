using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Models;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Hino.VAV.Resources
{
    /// <summary>
    /// Resources access storage or services
    /// </summary>
    public interface IMoResource
    {
        Task<Mo> GetMo(string id);

        Task<IEnumerable<Mo>> GetMoList(string status, string keyWord);

        Task<MoChassis> GetChassisDetails(string id);

        Task<IEnumerable<MoChassis>> GetChassis(string id);

        Task<IEnumerable<MoChassis>> SearchChassis(string keyWord);

        Task<Mo> UpdateMo(Mo mo);

        Task<MoChassis> UpdateChassis(MoChassis moChassis);
    }
}
