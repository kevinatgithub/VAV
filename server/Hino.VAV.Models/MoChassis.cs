using System;
using System.Collections.Generic;
using System.Text;

namespace Hino.VAV.Models
{
    public class MoChassis
    {
        public string Id { get; set; }

        public string MoId { get; set; }

        public bool IsPrinted { get; set; }

        public DateTime? PrintDateTime { get; set; }
    }
}
