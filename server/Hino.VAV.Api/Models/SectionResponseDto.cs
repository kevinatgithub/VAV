using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Api.Models.BaseResponse;

namespace Hino.VAV.Api.Models
{
    public class SectionResponseDto : IDtoRoot
    {
        public string Id { get; set; }

        public string Name { get; set; }
    }
}
