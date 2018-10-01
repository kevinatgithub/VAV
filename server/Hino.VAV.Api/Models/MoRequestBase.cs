using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hino.VAV.Api.Models.BaseResponse;

namespace Hino.VAV.Api.Models
{
    public abstract class MoRequestBase : IDtoRoot
    {
        public string Id { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public string Dealer { get; set; }

        public string Customer { get; set; }

        public string ChassisModel { get; set; }

        public int Quantity { get; set; }
    }
}
