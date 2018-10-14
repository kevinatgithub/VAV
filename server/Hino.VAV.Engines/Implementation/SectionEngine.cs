using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;
using Hino.VAV.Resources;

namespace Hino.VAV.Engines.Implementation
{
    public class SectionEngine : ISectionEngine
    {
        private readonly ISectionResource _sectionResource;

        public SectionEngine(ISectionResource sectionResource)
        {
            _sectionResource = sectionResource;
        }

        public async Task<IEnumerable<Section>> GetSections()
        {
            return await _sectionResource.GetSections();
        }

        public async Task<Section> GetSection(string id)
        {
            return await _sectionResource.GetSection(id);
        }
    }
}
