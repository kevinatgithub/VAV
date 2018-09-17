using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Models;
using Microsoft.EntityFrameworkCore;

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
            return await _context.Mo.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<MoChassis>> GetChassis(string id)
        {
            return await _context.MoChassis.Where(c => c.MoId == id).ToListAsync();
        }

        public async Task<IEnumerable<Mo>> GetMoList()
        {
            return await _context.Mo.ToListAsync();
        }
    }
}
