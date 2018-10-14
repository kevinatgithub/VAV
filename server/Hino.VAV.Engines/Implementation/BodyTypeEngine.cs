using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Models;
using Hino.VAV.Resources;

namespace Hino.VAV.Engines.Implementation
{
    public class BodyTypeEngine : IBodyTypeEngine
    {
        private readonly IRequestContext _requestContext;
        private readonly IBodyTypeResource _bodyTypeResource;

        public BodyTypeEngine(IRequestContext requestContext, IBodyTypeResource bodyTypeResource)
        {
            _requestContext = requestContext;
            _bodyTypeResource = bodyTypeResource;
        }

        public async Task<IEnumerable<BodyType>> GetBodyTypes(string type)
        {
            return (await _bodyTypeResource.GetBodyTypes()).Where(c => c.Type == type);
        }

        public async Task<IEnumerable<BodyType>> GetBodyTypes()
        {
            return await _bodyTypeResource.GetBodyTypes();
        }

        public async Task<BodyType> GetBodyType(string id)
        {
            return await _bodyTypeResource.GetBodyType(id);
        }
    }
}
