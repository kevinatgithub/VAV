using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hino.VAV.Api.Models;
using Hino.VAV.Api.Models.Requests;
using Hino.VAV.Models;

namespace Hino.VAV.Api.Profiles
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<Mo, MoListResponseDto>();

            CreateMap<Mo, MoDetailsResponseDto>()
                .ForMember(d => d.Chassis, opt => opt.Ignore());

            CreateMap<TaktTimePostRequest, TaktTime>();

            CreateMap<TaktTimeRequest, TaktTime>();

            CreateMap<TaktTime, TaktTimeResponseDto>();
        }
    }
}
