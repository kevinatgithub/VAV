using Hino.VAV.Models;

namespace Hino.VAV.Engines
{
    /// <summary>
    /// Engines contain business logic and encapsulate changes
    /// </summary>
    public interface IMoEngine
    {
        /// <summary>
        /// Gets information about the template.
        /// </summary>
        /// <returns></returns>
        Mo GetMo();
    }
}
