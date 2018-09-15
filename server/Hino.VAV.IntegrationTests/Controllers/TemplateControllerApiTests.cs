using System.Net;
using System.Threading.Tasks;
using Autofac.Extras.Moq;
using Hino.VAV.Concerns.Common;
using Hino.VAV.UnitTests;
using Xunit;
using Xunit.Abstractions;

namespace Hino.VAV.IntegrationTests.Controllers
{
    public class TemplateControllerApiTests :
        IClassFixture<ApiTestFixture>,
        IClassFixture<SimulatedUsersFixture>
    {
        private readonly ITestOutputHelper _output;
        private readonly ApiTestFixture _apiTestFixture;
        private readonly SimulatedUsersFixture _simulatedUsersFixture;

        public TemplateControllerApiTests(
            ITestOutputHelper output,
            ApiTestFixture apiTestFixture,
            SimulatedUsersFixture simulatedUsersFixture)
        {
            _output = output;
            _apiTestFixture = apiTestFixture;
            _simulatedUsersFixture = simulatedUsersFixture;
        }

        [Fact]
        public async Task GetTemplateWitValidName()
        {
            using (var mocks = SetupMocks())
            {
                var respons = await _apiTestFixture.ApiClient
                    .GetAsync("/api/template/tplt")
                    .WithAuthentication(_simulatedUsersFixture.Administrator)
                    .AsResponse();

                Assert.Equal(HttpStatusCode.OK, respons.Status);
            }
        }

        [Fact]
        public async Task GetTemplateWitNumberFails()
        {
            using (var mocks = SetupMocks())
            {
                var respons = await _apiTestFixture.ApiClient
                    .GetAsync("/api/template/tpl1")
                    .WithAuthentication(_simulatedUsersFixture.Administrator)
                    .AsResponse();

                Assert.Equal(HttpStatusCode.Conflict, respons.Status);
            }
        }

        [Fact]
        public async Task GetTemplateWitLetterAFails()
        {
            using (var mocks = SetupMocks())
            {
                var respons = await _apiTestFixture.ApiClient
                    .GetAsync("/api/template/tpla")
                    .WithAuthentication(_simulatedUsersFixture.Administrator)
                    .AsResponse();

                Assert.Equal(HttpStatusCode.BadRequest, respons.Status);
            }
        }

        [Fact]
        public async Task GetUnauthorized()
        {
            using (var mocks = SetupMocks())
            {
                var respons = await _apiTestFixture.ApiClient
                    .GetAsync("/api/template/tplt")
                    .AsResponse();

                Assert.Equal(HttpStatusCode.Unauthorized, respons.Status);
            }
        }

        private AutoMock SetupMocks()
        {
            var mock = AutoMock.GetLoose();

            mock.Mock<IRequestContext>()
                .SetupGet(r => r.Logger)
                .Returns(ApplicationLoggerTestOutputHelper.CreateApplicationLogger(_output));

            return mock;
        }
    }
}
