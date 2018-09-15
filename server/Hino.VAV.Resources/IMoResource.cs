using Hino.VAV.Models;

namespace Hino.VAV.Resources
{
    /// <summary>
    /// Resources access storage or services
    /// </summary>
    public interface IMoResource
    {
        /// <summary>
        /// Gets the template.
        /// </summary>
        /// <returns></returns>
        Mo GetMo();
    }
}
