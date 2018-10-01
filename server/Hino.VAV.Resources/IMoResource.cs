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

        Task<IEnumerable<MoChassis>> GetChassis(string id);
    }
}
