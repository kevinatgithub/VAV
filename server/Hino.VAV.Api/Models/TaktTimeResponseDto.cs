using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Api.Models.BaseResponse;

namespace Hino.VAV.Api.Models
{
    public class TaktTimeResponseDto : IDtoRoot
    {
        public string Id { get; set; }

        public string SectionId { get; set; }

        public string ChassisModelId { get; set; }

        public string ChassisModelName { get; set; }

        public string BodyTypeId { get; set; }

        public string BodyTypeName { get; set; }

        public int WorkTime { get; set; }
    }
}
