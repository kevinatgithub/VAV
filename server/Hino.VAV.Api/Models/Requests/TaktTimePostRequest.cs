using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hino.VAV.Api.Models.Requests
{
    public class TaktTimePostRequest
    {
        public string SectionId { get; set; }

        public string ChassisModelId { get; set; }

        public string BodyTypeId { get; set; }

        public int WorkTime { get; set; }
    }
}
