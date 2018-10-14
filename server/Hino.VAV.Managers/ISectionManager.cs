using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Managers
{
    public interface ISectionManager
    {
        Task<IEnumerable<Section>> GetSections();

        Task<Section> GetSection(string id);
    }
}
