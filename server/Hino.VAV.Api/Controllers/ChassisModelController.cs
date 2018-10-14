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
    public class ChassisModelController : Controller
    {
        private readonly IRequestContext _requestContext;
        private readonly IChassisModelManager _chassisModelManager;
        private readonly IMapper _mapper;

        public ChassisModelController(IRequestContext requestContext, IChassisModelManager chassisModelManager, IMapper mapper)
        {
            _requestContext = requestContext;
            _chassisModelManager = chassisModelManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/chassisModels")]
        public async Task<ActionResult<PagedResponse<ChassisModel, ChassisModelResponseDto>>> GetChassisModels(int pageSize = 10, int pageNo = 1)
        {
            if (pageSize == 0 || pageNo == 0)
            {
                throw new AppTechnicalException("InvalidPagination", "Invalid pagination values");
            }

            var chassisModels = await _chassisModelManager.GetChassisModels();
            var result = new PagedResponse<ChassisModel, ChassisModelResponseDto>(_mapper, chassisModels, pageSize, pageNo);

            return new OkObjectResult(result);
        }
    }
}
