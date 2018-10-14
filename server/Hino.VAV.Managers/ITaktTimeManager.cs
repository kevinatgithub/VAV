using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Managers
{
    public interface ITaktTimeManager
    {
        Task<Tuple<IEnumerable<TaktTime>, IEnumerable<ChassisModel>, IEnumerable<BodyType>>> GetTaktTimeBySection(string sectionId);

        Task<Tuple<TaktTime, ChassisModel, BodyType>> GetTaktTime(string id);

        Task<TaktTime> CreateTaktTime(TaktTime taktTime);

        Task<TaktTime> UpdateTaktTime(TaktTime taktTime);

        Task<TaktTime> DeleteTaktTime(TaktTime taktTime);
    }
}
