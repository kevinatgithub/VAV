using System;
using System.Collections.Generic;
using System.Text;

namespace Hino.VAV.Models
{
    public class TaktTime : IEntityRoot
    {
        public string Id { get; set; }

        public string SectionId { get; set; }

        public string ChassisModelId { get; set; }

        public string BodyTypeId { get; set; }

        public int WorkTime { get; set; }
    }
}
