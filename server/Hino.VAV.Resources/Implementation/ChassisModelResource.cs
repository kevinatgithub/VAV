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
    public class ChassisModelResource : IChassisModelResource
    {
        private readonly IRequestContext _requestContext;
        private readonly VavContext _context;

        public ChassisModelResource(IRequestContext requestContext, VavContext context)
        {
            _requestContext = requestContext;
            _context = context;
        }

        public async Task<IEnumerable<ChassisModel>> GetChassisModels()
        {
            return await _context.ChassisModel.ToListAsync();
        }

        public async Task<ChassisModel> GetChassisModel(string id)
        {
            return await _context.ChassisModel.Where(c => c.Id == id).FirstOrDefaultAsync();
        }
    }
}
