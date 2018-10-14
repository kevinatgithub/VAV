using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Resources
{
    public interface IBodyTypeResource
    {
        Task<IEnumerable<BodyType>> GetBodyTypes();

        Task<BodyType> GetBodyType(string id);
    }
}
