using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Models;
using Microsoft.EntityFrameworkCore;

namespace Hino.VAV.Resources.Implementation
{
    public class SectionResource : ISectionResource
    {
        private readonly IRequestContext _requestContext;
        private readonly VavContext _context;

        public SectionResource(IRequestContext requestContext, VavContext context)
        {
            _requestContext = requestContext;
            _context = context;
        }

        public async Task<IEnumerable<Section>> GetSections()
        {
            return await _context.Section.ToListAsync();
        }

        public async Task<Section> GetSection(string id)
        {
            return await _context.Section.Where(c => c.Id == id).FirstOrDefaultAsync();
        }
    }
}
