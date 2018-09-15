using Hino.VAV.Concerns.Common;
using Hino.VAV.Models;

namespace Hino.VAV.Resources.Implementation
{
    /// <inheritdoc />
    /// <summary>
    /// Resources access storage or services
    /// </summary>
    /// <seealso cref="IMoResource" />
    public class MoResource : IMoResource
    {
        private readonly IRequestContext _requestContext;

        public MoResource(IRequestContext requestContext)
        {
            _requestContext = requestContext;
        }

        public Mo GetMo()
        {
            return new Mo
            {
                Name = "template",
                Value = "This is a template value for " + _requestContext.Identity.Name
            };
        }
    }
}
