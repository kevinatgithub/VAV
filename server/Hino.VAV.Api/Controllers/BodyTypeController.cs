using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hino.VAV.Api.Models;
using Hino.VAV.Api.Models.BaseResponse;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Managers;
using Hino.VAV.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hino.VAV.Api.Controllers
{
    public class BodyTypeController : Controller
    {
        private readonly IRequestContext _requestContext;
        private readonly IBodyTypeManager _bodyTypeManager;
        private readonly IMapper _mapper;

        public BodyTypeController(IRequestContext requestContext, IBodyTypeManager bodyTypeManager, IMapper mapper)
        {
            _requestContext = requestContext;
            _bodyTypeManager = bodyTypeManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/bodyType/type/{typeId}")]
        public async Task<ActionResult<PagedResponse<BodyType, BodyTypeResponseDto>>> GetBodyType(string typeId, int pageSize = 10, int pageNo = 1)
        {
            var bodyType = await _bodyTypeManager.GetBodyTypes(typeId);
            var result = new PagedResponse<BodyType, BodyTypeResponseDto>(_mapper, bodyType, pageSize, pageNo);

            return new OkObjectResult(result);
        }
    }
}
