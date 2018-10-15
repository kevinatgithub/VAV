using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Managers
{
    /// <summary>
    /// Managers orchestrate calls to one or more engines.
    /// </summary>
    public interface IMoManager
    {
        Task<Mo> GetMo(string id);

        Task<IEnumerable<Mo>> GetMoList(string status = "", string keyWord = "");

        Task<IEnumerable<MoChassis>> GetChassis(string id);

        Task<IEnumerable<MoChassis>> SearchChassis(string keyWord);

        Task<Mo> ProcessMo(string id, bool isSpecialProject, string[] chassisNumbers);

        Task<Mo> ResetMo(string id);
    }
}
