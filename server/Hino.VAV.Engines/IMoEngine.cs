﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Hino.VAV.Models;

namespace Hino.VAV.Engines
{
    /// <summary>
    /// Engines contain business logic and encapsulate changes
    /// </summary>
    public interface IMoEngine
    {
        Task<Mo> GetMo(string id);

        Task<IEnumerable<Mo>> GetMoList();

        Task<IEnumerable<MoChassis>> GetChassis(string id);
    }
}