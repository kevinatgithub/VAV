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
    public class TaktTimeResource : ITaktTimeResource
    {
        private readonly IRequestContext _requestContext;
        private readonly VavContext _context;

        public TaktTimeResource(IRequestContext requestContext, VavContext context)
        {
            _requestContext = requestContext;
            _context = context;
        }

        public async Task<IEnumerable<TaktTime>> GetTaktTimeBySection(string sectionId)
        {
            return await _context.TaktTime.Where(c => c.SectionId == sectionId).ToListAsync();
        }

        public async Task<TaktTime> GetTaktTime(string id)
        {
            return await _context.TaktTime.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<TaktTime> GetTaktTimeBySectionByChassisByBodyType(string sectionId, string chassisModelId, string bodyTypeId)
        {
            return await _context.TaktTime.FirstOrDefaultAsync(c =>
                c.SectionId == sectionId && c.ChassisModelId == chassisModelId && c.BodyTypeId == bodyTypeId);
        }

        public async Task<TaktTime> CreateTaktTime(TaktTime taktTime)
        {
            var result = await _context.TaktTime.AddAsync(taktTime);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<TaktTime> UpdateTaktTime(TaktTime taktTime)
        {
            var result = _context.TaktTime.Update(taktTime);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<TaktTime> DeleteTaktTime(TaktTime taktTime)
        {
            var result = _context.TaktTime.Remove(taktTime);
            await _context.SaveChangesAsync();

            return result.Entity;
        }
    }
}
