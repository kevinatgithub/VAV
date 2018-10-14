using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Managers
{
    public interface IBodyTypeManager
    {
        Task<IEnumerable<BodyType>> GetBodyTypes(string type);

        Task<BodyType> GetBodyType(string id);
    }
}
