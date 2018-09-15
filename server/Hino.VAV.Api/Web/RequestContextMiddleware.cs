using System.Threading.Tasks;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
using Microsoft.AspNetCore.Http;

namespace Hino.VAV.Api.Web
{
    public class RequestContextMiddleware
    {
        private readonly RequestDelegate _next;

        /// <summary>
        /// Initializes a new instance of the <see cref="RequestContextMiddleware"/> class.
        /// </summary>
        /// <param name="next">The next.</param>
        public RequestContextMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Invokes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns>An awaitable task</returns>
        public Task Invoke(HttpContext context)
        {
            if (context?.User?.Identity == null)
            {
                throw new AppTechnicalException(
                    "RequestContextMiddleware.MissingRequestContext",
                    "The request context was not found in the available services. Please make sure a proper request context is configured in the IoC container.");
            }

            var requestContext = context.RequestServices.GetService(typeof(IRequestContext)) as RequestContext;
            if (requestContext == null)
            {
                throw new AppTechnicalException(
                    "RequestContextMiddleware.MissingRequestContext",
                    "The request context was not found in the available services. Please make sure a proper request context is configured in the IoC container.");
            }

            requestContext.Identity = context.User.Identity;
            requestContext.Logger.SetContext("Request", requestContext.Identity.Name);

            return _next(context);
        }
    }
}