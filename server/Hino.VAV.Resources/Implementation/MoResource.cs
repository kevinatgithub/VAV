using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
using Hino.VAV.Models;
using Microsoft.EntityFrameworkCore;
using Remotion.Linq.Clauses;

namespace Hino.VAV.Resources.Implementation
{
    /// <inheritdoc />
    /// <summary>
    /// Resources access storage or services
    /// </summary>
    /// <seealso cref="IMoResource" />
    public class MoResource : IMoResource
    {
        private readonly IRequestContext _requestContext;
        private readonly VavContext _context;

        public MoResource(IRequestContext requestContext, VavContext context)
        {
            _requestContext = requestContext;
            _context = context;
        }

        public async Task<Mo> GetMo(string id)
        {
            var result = await _context.Mo.FirstOrDefaultAsync(c => c.Id == id);
            if (result == null)
            {
                throw new AppBusinessException("MoNotFound", $"MO {id} not found");
            }

            return result;
        }

        public async Task<MoChassis> GetChassisDetails(string id)
        {
            return await _context.MoChassis.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<MoChassis>> GetChassis(string id)
        {
            return await _context.MoChassis.Where(c => c.MoId == id).ToListAsync();
        }

        public async Task<IEnumerable<Mo>> GetMoList(string status, string keyWord)
        {
            var result = await (from m in _context.Mo
                join c in _context.MoChassis on m.Id equals c.MoId into mc
                from c in mc.DefaultIfEmpty()
                where (EF.Functions.Like(m.Id, keyWord) ||

                       // EF.Functions.Like(m.ChassisModel, keyWord) ||
                       EF.Functions.Like(m.Customer, keyWord) ||
                       EF.Functions.Like(m.Dealer, keyWord) ||
                       EF.Functions.Like(c.Id, keyWord)) &&
                      EF.Functions.Like(m.Status.Trim(), status)
                select
                    m).ToListAsync();

            return result.Distinct();
        }

        public async Task<IEnumerable<MoChassis>> SearchChassis(string keyWord)
        {
            var result = await (from c in _context.MoChassis
                where EF.Functions.Like(c.Id, keyWord)
                select
                    c).ToListAsync();

            return result.Distinct();
        }

        public async Task<Mo> UpdateMo(Mo mo)
        {
            _context.Mo.Update(mo);
            await _context.SaveChangesAsync();
            return mo;
        }

        public async Task<MoChassis> UpdateChassis(MoChassis moChassis)
        {
            _context.MoChassis.Update(moChassis);
            await _context.SaveChangesAsync();
            return moChassis;
        }
    }
}
