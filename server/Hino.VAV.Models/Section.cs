using System;
using System.Collections.Generic;
using System.Text;

namespace Hino.VAV.Models
{
    public class Section : IEntityRoot
    {
        public string Id { get; set; }

        public string Name { get; set; }
    }
}
