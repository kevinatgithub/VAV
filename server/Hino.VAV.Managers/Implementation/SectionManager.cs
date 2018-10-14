using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Engines;
using Hino.VAV.Models;

namespace Hino.VAV.Managers.Implementation
{
    public class SectionManager
    {
        private readonly ISectionEngine _sectionEngine;

        public SectionManager(ISectionEngine sectionEngine)
        {
            _sectionEngine = sectionEngine;
        }

        public async Task<IEnumerable<Section>> GetSections()
        {
            return await _sectionEngine.GetSections();
        }

        public async Task<Section> GetSection(string id)
        {
            return await _sectionEngine.GetSection(id);
        }
    }
}
