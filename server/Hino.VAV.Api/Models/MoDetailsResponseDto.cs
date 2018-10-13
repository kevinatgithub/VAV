using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hino.VAV.Api.Models
{
    public class MoDetailsResponseDto : MoRequestBase
    {
        public string TypeOfBody { get; set; }

        public string PaintScheme { get; set; }

        public string BodyDimension { get; set; }

        public DateTime ChassisArrivalDate { get; set; }

        public string OtherInstruction { get; set; }
    }
}
