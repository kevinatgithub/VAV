using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Hino.VAV.Api.Web
{
    /// <summary>
    /// Swagger operation filter for OAuth security requirements
    /// </summary>
    /// <seealso cref="Swashbuckle.AspNetCore.SwaggerGen.IOperationFilter" />
    public class ApiDocOAuth2SecurityFilter : IOperationFilter
    {
        private readonly IOptions<AuthorizationOptions> _authorizationOptions;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApiDocOAuth2SecurityFilter"/> class.
        /// </summary>
        /// <param name="authorizationOptions">The authorization options.</param>
        public ApiDocOAuth2SecurityFilter(IOptions<AuthorizationOptions> authorizationOptions)
        {
            _authorizationOptions = authorizationOptions;
        }

        /// <summary>
        /// Applies the filter to the operation.
        /// </summary>
        /// <param name="operation">The operation.</param>
        /// <param name="context">The context.</param>
        public void Apply(Operation operation, OperationFilterContext context)
        {
#pragma warning disable CS0618 // Type or member is obsolete
            var controllerPolicies = context.ApiDescription.ControllerAttributes()
                .OfType<AuthorizeAttribute>()
                .Select(attr => attr.Policy);
            var actionPolicies = context.ApiDescription.ActionAttributes()
                .OfType<AuthorizeAttribute>()
                .Select(attr => attr.Policy);
            var policies = controllerPolicies.Union(actionPolicies).Distinct();
            var requiredClaimTypes = policies
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .Select(x => _authorizationOptions.Value.GetPolicy(x))
                .SelectMany(x => x?.Requirements)
                .OfType<ClaimsAuthorizationRequirement>()
                .Select(x => x.ClaimType);
#pragma warning restore CS0618 // Type or member is obsolete

            var claimTypes = requiredClaimTypes as string[] ?? requiredClaimTypes.ToArray();

            operation.Responses.Add("401", new Response { Description = "Unauthorized" });
            operation.Responses.Add("403", new Response { Description = "Forbidden" });

            operation.Security = new List<IDictionary<string, IEnumerable<string>>>
            {
                new Dictionary<string, IEnumerable<string>>
                {
                    { "oauth2", claimTypes }
                }
            };
        }
    }
}