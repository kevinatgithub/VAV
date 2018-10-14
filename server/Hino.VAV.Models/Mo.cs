using System;

namespace Hino.VAV.Models
{
    /// <summary>
    /// Mo information
    /// </summary>
    public class Mo : IEntityRoot
    {
        public string Id { get; set; }

        public bool IsSpecialProject { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public string Dealer { get; set; }

        public string Customer { get; set; }

        public string ChassisModel { get; set; }

        public int Quantity { get; set; }

        public string TypeOfBody { get; set; }

        public string PaintScheme { get; set; }

        public string BodyDimension { get; set; }

        public DateTime ChassisArrivalDate { get; set; }

        public string OtherInstruction { get; set; }
    }
}
