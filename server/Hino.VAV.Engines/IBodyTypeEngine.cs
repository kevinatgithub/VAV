using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Engines
{
    public interface IBodyTypeEngine
    {
        Task<IEnumerable<BodyType>> GetBodyTypes(string type);

        Task<IEnumerable<BodyType>> GetBodyTypes();

        Task<BodyType> GetBodyType(string id);
    }
}
