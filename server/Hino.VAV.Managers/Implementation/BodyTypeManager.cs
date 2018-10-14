using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Engines;
using Hino.VAV.Models;

namespace Hino.VAV.Managers.Implementation
{
    public class BodyTypeManager : IBodyTypeManager
    {
        private readonly IBodyTypeEngine _bodyTypeEngine;

        public BodyTypeManager(IBodyTypeEngine bodyTypeEngine)
        {
            _bodyTypeEngine = bodyTypeEngine;
        }

        public async Task<IEnumerable<BodyType>> GetBodyTypes(string type)
        {
            return await _bodyTypeEngine.GetBodyTypes(type);
        }

        public async Task<BodyType> GetBodyType(string id)
        {
            return await _bodyTypeEngine.GetBodyType(id);
        }
    }
}
