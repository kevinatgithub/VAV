using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hino.VAV.Api.Models;
using Hino.VAV.Api.Models.BaseResponse;
using Hino.VAV.Api.Models.Requests;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Managers;
using Hino.VAV.Models;
using Microsoft.AspNetCore.Mvc;

namespace Hino.VAV.Api.Controllers
{
    public class TaktTimeController : Controller
    {
        private readonly IRequestContext _requestContext;
        private readonly ITaktTimeManager _taktTimeManager;
        private readonly IMapper _mapper;

        public TaktTimeController(IRequestContext requestContext, ITaktTimeManager taktTimeManager, IMapper mapper)
        {
            _requestContext = requestContext;
            _taktTimeManager = taktTimeManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/takttimes/section/{id}")]
        public async Task<ActionResult<PagedResponse<TaktTime, TaktTimeResponseDto>>> GetTaktTimeBySection(string id, int pageSize = 10, int pageNo = 1)
        {
            var result = await _taktTimeManager.GetTaktTimeBySection(id);
            var pagedResult = new PagedResponse<TaktTime, TaktTimeResponseDto>(_mapper, result.Item1, pageSize, pageNo);
            foreach (var t in pagedResult.Result)
            {
                t.BodyTypeName = result.Item3.FirstOrDefault(c => c.Id == t.BodyTypeId)?.Name;
                t.ChassisModelName = result.Item2.FirstOrDefault(c => c.Id == t.ChassisModelId)?.Name;
            }

            return new OkObjectResult(pagedResult);
        }

        [HttpGet]
        [Route("api/takttime/{id}")]
        public async Task<ActionResult<TaktTimeResponseDto>> GetTaktTime(string id)
        {
            var tuple = await _taktTimeManager.GetTaktTime(id);
            var result = _mapper.Map<TaktTimeResponseDto>(tuple.Item1);

            result.BodyTypeName = tuple.Item3.Name;
            result.ChassisModelName = tuple.Item2.Name;

            return new OkObjectResult(result);
        }

        [HttpPost]
        [Route("api/takttime")]
        public async Task<ActionResult<TaktTime>> CreateTaktTime([FromBody] TaktTimePostRequest request)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult("Invalid takt time Request");
            }

            return await _taktTimeManager.CreateTaktTime(_mapper.Map<TaktTime>(request));
        }

        [HttpPut]
        [Route("api/takttime")]
        public async Task<ActionResult<TaktTime>> UpdateTaktTime([FromBody] TaktTimeRequest postRequest)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult("Invalid takt time request");
            }

            return await _taktTimeManager.UpdateTaktTime(_mapper.Map<TaktTime>(postRequest));
        }

        [HttpDelete]
        [Route("api/takttime")]
        public async Task<ActionResult<TaktTime>> DeleteTaktTime([FromBody] TaktTimeRequest postRequest)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult("Invalid takt time request");
            }

            return await _taktTimeManager.DeleteTaktTime(_mapper.Map<TaktTime>(postRequest));
        }
    }
}
