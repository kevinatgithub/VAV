using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hino.VAV.Api.Models;
using Hino.VAV.Api.Models.BaseResponse;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
using Hino.VAV.Managers;
using Hino.VAV.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hino.VAV.Api.Controllers
{
    public class SectionController :Controller
    {
        private readonly IRequestContext _requestContext;
        private readonly ISectionManager _sectionManager;
        private readonly IMapper _mapper;

        public SectionController(IRequestContext requestContext, ISectionManager sectionManager, IMapper mapper)
        {
            _sectionManager = sectionManager;
            _requestContext = requestContext;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/sections")]
        public async Task<ActionResult<PagedResponse<Section, SectionResponseDto>>> GetSections(int pageSize = 10, int pageNo = 1)
        {
            if (pageSize == 0 || pageNo == 0)
            {
                throw new AppTechnicalException("InvalidPagination", "Invalid pagination values");
            }

            var sections = await _sectionManager.GetSections();
            var result = new PagedResponse<Section, SectionResponseDto>(_mapper, sections, pageSize, pageNo);

            return new OkObjectResult(result);
        }

        [HttpGet]
        [Route("api/section/{id}")]
        public async Task<ActionResult<Section>> GetSection(string id)
        {
            var section = await _sectionManager.GetSection(id);

            return new OkObjectResult(section);
        }
    }
}
