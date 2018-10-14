using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Concerns.Exceptions;
using Hino.VAV.Models;
using Hino.VAV.Resources;

namespace Hino.VAV.Engines.Implementation
{
    public class TaktTimeEngine : ITaktTimeEngine
    {
        private readonly ITaktTimeResource _taktTimeResource;

        public TaktTimeEngine(ITaktTimeResource taktTimeResource)
        {
            _taktTimeResource = taktTimeResource;
        }

        public async Task<IEnumerable<TaktTime>> GetTaktTimeBySection(string sectionId)
        {
            return await _taktTimeResource.GetTaktTimeBySection(sectionId);
        }

        public async Task<TaktTime> GetTaktTime(string id)
        {
            return await _taktTimeResource.GetTaktTime(id);
        }

        public async Task<TaktTime> CreateTaktTime(TaktTime taktTime)
        {
            var existing = await _taktTimeResource.GetTaktTimeBySectionByChassisByBodyType(
                taktTime.SectionId,
                taktTime.ChassisModelId,
                taktTime.BodyTypeId);

            if (existing != null)
            {
                throw new AppBusinessException("TaktTimeExists", "Takt time for the specified section, chassis model, and body type already exists");
            }

            return await _taktTimeResource.CreateTaktTime(taktTime);
        }

        public async Task<TaktTime> UpdateTaktTime(TaktTime taktTime)
        {
            return await _taktTimeResource.UpdateTaktTime(taktTime);
        }

        public async Task<TaktTime> DeleteTaktTime(TaktTime taktTime)
        {
            return await _taktTimeResource.DeleteTaktTime(taktTime);
        }
    }
}
