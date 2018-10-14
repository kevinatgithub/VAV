using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Models;
using Microsoft.EntityFrameworkCore;

namespace Hino.VAV.Resources.Implementation
{
    public class BodyTypeResource : IBodyTypeResource
    {
        private readonly IRequestContext _requestContext;
        private readonly VavContext _context;

        public BodyTypeResource(IRequestContext requestContext, VavContext context)
        {
            _requestContext = requestContext;
            _context = context;
        }

        public async Task<IEnumerable<BodyType>> GetBodyTypes()
        {
            return await _context.BodyType.ToListAsync();
        }

        public async Task<BodyType> GetBodyType(string id)
        {
            return await _context.BodyType.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
