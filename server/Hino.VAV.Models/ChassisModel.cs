using System;
using System.Collections.Generic;
using System.Text;

namespace Hino.VAV.Models
{
    public class ChassisModel : IEntityRoot
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }
    }
}
