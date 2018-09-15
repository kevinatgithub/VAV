using Hino.VAV.Concerns.Common;
using Hino.VAV.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hino.VAV.Api.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// Mo Controller
    /// </summary>
    [Authorize]
    public class MoController : Controller
    {
        private readonly IRequestContext _requestContext;
        private readonly IMoManager _moManager;

        /// <summary>
        /// Initializes a new instance of the <see cref="MoController"/> class.
        /// Creates a new template controller
        /// </summary>
        /// <param name="requestContext">Reguest context information</param>
        /// <param name="moManager">Mo manager</param>
        public MoController(IRequestContext requestContext, IMoManager moManager)
        {
            _requestContext = requestContext;
            _moManager = moManager;
        }

        /// <summary>
        /// This documentation is also added to Swagger.
        /// </summary>
        /// <param name="id">The template identifier</param>
        /// <returns>Mo data</returns>
        [HttpGet]
        [Route("api/mo/{id}")]
        public IActionResult GetMo(string id)
        {
            var result = _moManager.GetMo(id);

            _requestContext.Logger.Information("TemplateController.GetTemplate", "Mo {Id:l} retrieved", id);

            return new OkObjectResult(result);
        }
    }
}