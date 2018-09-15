using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Xunit;

namespace Hino.VAV.IntegrationTests
{
    public class ApiTestFixture : IAsyncLifetime, IDisposable
    {
        private TestServer _server;

        public Pathoschild.Http.Client.IClient ApiClient
        {
            get
            {
                var client = new Pathoschild.Http.Client.FluentClient(_server.BaseAddress, _server.CreateClient());
                client.SetOptions(new Pathoschild.Http.Client.FluentClientOptions
                {
                    IgnoreHttpErrors = true
                });

                return client;
            }
        }

        public Task InitializeAsync()
        {
            Environment.SetEnvironmentVariable(
                "ASPNETCORE_ENVIRONMENT",
                "Development");

            Environment.SetEnvironmentVariable(
                "SERVER_AUTHENTICATION_MODE",
                "IntegrationTesting");

            _server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Development")
                .UseContentRoot("../../../../Hino.VAV.Api")
                .UseStartup<Api.Startup>());

            return Task.FromResult(0);
        }

        public Task DisposeAsync()
        {
            _server.Dispose();

            return Task.FromResult(0);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _server?.Dispose();
            }
        }
    }
}