using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace Hino.VAV.IntegrationTests
{
    public class SimulatedUsersFixture : IAsyncLifetime
    {
        public ClaimsIdentity Administrator { get; private set; }

        public Task InitializeAsync()
        {
            // Important!
            // Most likely this data must be loaded from the same data source that's used for integration testing!
            // --------
            // Why is this different in the template?
            // The IntegrationTestAuthHandler doesn't authenticate or authorize the incoming claims. If authentication
            // (normally done by validating the incoming Azure AD claim) or authrization is implemented in your API,
            // you will probably want to create dummy users based on the actual data that's also used to validate the
            // claims.
            Administrator = new ClaimsIdentity(
                new[]
                {
                    new Claim("http://schemas.microsoft.com/identity/claims/tenantid", Guid.NewGuid().ToString()),
                    new Claim("http://schemas.microsoft.com/identity/claims/objectidentifier", Guid.NewGuid().ToString()),
                });

            return Task.CompletedTask;
        }

        public Task DisposeAsync()
        {
            return Task.CompletedTask;
        }
    }
}