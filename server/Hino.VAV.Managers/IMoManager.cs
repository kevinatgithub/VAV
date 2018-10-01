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

        Task<IEnumerable<Mo>> GetMoList();

        Task<IEnumerable<MoChassis>> GetChassis(string id);
    }
}
