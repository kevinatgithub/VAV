using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Engines
{
    /// <summary>
    /// Engines contain business logic and encapsulate changes
    /// </summary>
    public interface IMoEngine
    {
        Task<Mo> GetMo(string id);

        Task<IEnumerable<Mo>> GetMoList(string status = "", string keyWord = "");

        Task<IEnumerable<MoChassis>> GetChassis(string id);

        Task<IEnumerable<MoChassis>> SearchChassis(string keyWord);

        Task<Mo> ProcessMo(string id, string[] chassisNumbers);
    }
}
