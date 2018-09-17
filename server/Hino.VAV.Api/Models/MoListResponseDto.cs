using System;

namespace Hino.VAV.Api.Models
{
    public class MoListResponseDto : MoRequestBase
    {
#pragma warning disable CA1822
        public int Completed => 0;

        public int WIP => 0;

        public int UnReleased => 0;
#pragma warning disable CA1822
    }
}