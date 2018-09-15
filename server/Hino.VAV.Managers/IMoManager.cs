using Hino.VAV.Models;

namespace Hino.VAV.Managers
{
    /// <summary>
    /// Managers orchestrate calls to one or more engines.
    /// </summary>
    public interface IMoManager
    {
        /// <summary>
        /// Returns info for the template
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Mo GetMo(string id);
    }
}
