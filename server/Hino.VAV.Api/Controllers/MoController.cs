using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hino.VAV.Api.Models;
using Hino.VAV.Api.Models.BaseResponse;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
using Hino.VAV.Managers;
using Hino.VAV.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Hino.VAV.Api.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// Mo Controller
    /// </summary>
    public class MoController : Controller
    {
        private readonly IRequestContext _requestContext;
        private readonly IMoManager _moManager;
        private readonly IMapper _mapper;

        public MoController(IRequestContext requestContext, IMoManager moManager, IMapper mapper)
        {
            _requestContext = requestContext;
            _moManager = moManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/mo/{id}")]
        public async Task<ActionResult<MoDetailsResponseDto>> GetMo(string id)
        {
            var chassis = await _moManager.GetChassis(id);
            var mo = await _moManager.GetMo(id);

            var result = _mapper.Map<MoDetailsResponseDto>(mo);
            result.Chassis = chassis.Select(s => s.Id).ToArray();

            return new OkObjectResult(result);
        }

        [HttpGet]
        [Route("api/mos")]
        public async Task<ActionResult<PagedResponse<Mo, MoListResponseDto>>> GetMoList(string status = "%", string keyWord = "%", int pageSize = 10, int pageNo = 1)
        {
            if (pageSize == 0 || pageNo == 0)
            {
                throw new AppTechnicalException("InvalidPagination", "Invalid pagination values");
            }

            var result = await _moManager.GetMoList(status, keyWord);
            var pagedResult = new PagedResponse<Mo, MoListResponseDto>(_mapper, result, pageSize, pageNo);

            return new OkObjectResult(pagedResult);
        }
    }
}