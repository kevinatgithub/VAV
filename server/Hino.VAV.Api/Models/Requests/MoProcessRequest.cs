using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hino.VAV.Api.Models.Requests
{
    public class MoProcessRequest
    {
        public string Id { get; set; }

        public string[] ChassisNumbers { get; set; }
    }
}
