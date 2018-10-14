using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Engines;
using Hino.VAV.Models;

namespace Hino.VAV.Managers.Implementation
{
    public class TaktTimeManager : ITaktTimeManager
    {
        private readonly ITaktTimeEngine _taktTimeEngine;
        private readonly ISectionEngine _sectionEngine;
        private readonly IChassisModelEngine _chassisModelEngine;
        private readonly IBodyTypeEngine _bodyTypeEngine;

        public TaktTimeManager(ITaktTimeEngine taktTimeEngine, ISectionEngine sectionEngine, IChassisModelEngine chassisModelEngine, IBodyTypeEngine bodyTypeEngine)
        {
            _taktTimeEngine = taktTimeEngine;
            _sectionEngine = sectionEngine;
            _taktTimeEngine = taktTimeEngine;
            _bodyTypeEngine = bodyTypeEngine;
            _chassisModelEngine = chassisModelEngine;
        }

        public async Task<Tuple<IEnumerable<TaktTime>, IEnumerable<ChassisModel>, IEnumerable<BodyType>>> GetTaktTimeBySection(string sectionId)
        {
            var taktTimes = await _taktTimeEngine.GetTaktTimeBySection(sectionId);
            var chassisModels =
                (await _chassisModelEngine.GetChassisModels()).Where(c =>
                    taktTimes.Select(s => s.ChassisModelId).Contains(c.Id));
            var bodyTypes =
                (await _bodyTypeEngine.GetBodyTypes()).Where(c => taktTimes.Select(s => s.BodyTypeId).Contains(c.Id));

            return new Tuple<IEnumerable<TaktTime>, IEnumerable<ChassisModel>, IEnumerable<BodyType>>(taktTimes, chassisModels, bodyTypes);
        }

        public async Task<TaktTime> GetTaktTime(string id)
        {
            return await _taktTimeEngine.GetTaktTime(id);
        }

        public async Task<TaktTime> CreateTaktTime(TaktTime taktTime)
        {
            return await _taktTimeEngine.CreateTaktTime(taktTime);
        }

        public async Task<TaktTime> UpdateTaktTime(TaktTime taktTime)
        {
            return await _taktTimeEngine.UpdateTaktTime(taktTime);
        }

        public async Task<TaktTime> DeleteTaktTime(TaktTime taktTime)
        {
            return await _taktTimeEngine.DeleteTaktTime(taktTime);
        }
    }
}
