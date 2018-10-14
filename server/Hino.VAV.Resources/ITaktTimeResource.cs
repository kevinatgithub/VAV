using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Resources
{
    public interface ITaktTimeResource
    {
        Task<IEnumerable<TaktTime>> GetTaktTimeBySection(string sectionId);

        Task<TaktTime> GetTaktTime(string id);

        Task<TaktTime> GetTaktTimeBySectionByChassisByBodyType(string sectionId, string chassisModelId, string bodyTypeId);

        Task<TaktTime> CreateTaktTime(TaktTime taktTime);

        Task<TaktTime> UpdateTaktTime(TaktTime taktTime);

        Task<TaktTime> DeleteTaktTime(TaktTime taktTime);
    }
}
