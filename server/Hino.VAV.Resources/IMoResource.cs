using System.Collections.Generic;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Resources
{
    /// <summary>
    /// Resources access storage or services
    /// </summary>
    public interface IMoResource
    {
        Task<Mo> GetMo(string id);

        Task<IEnumerable<Mo>> GetMoList();

        Task<IEnumerable<MoChassis>> GetChassis(string id);
    }
}
