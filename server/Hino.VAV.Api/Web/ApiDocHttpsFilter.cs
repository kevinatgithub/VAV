using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Hino.VAV.Api.Web
{
    /// <summary>
    /// Only allow swagger over HTTPS
    /// </summary>
    /// <seealso cref="Swashbuckle.AspNetCore.SwaggerGen.IDocumentFilter" />
    public class ApiDocHttpsFilter : IDocumentFilter
    {
        /// <summary>
        /// Applies the filter to the document
        /// </summary>
        /// <param name="swaggerDoc">The swagger document.</param>
        /// <param name="context">The context.</param>
        public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        {
            swaggerDoc.Schemes = new[] { "https" };
        }
    }
}