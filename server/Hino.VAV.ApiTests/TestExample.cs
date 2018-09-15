using System.Threading.Tasks;
using Autofac.Extras.Moq;
using Hino.VAV.Concerns.Common;
using Hino.VAV.UnitTests;
using Xunit;
using Xunit.Abstractions;

namespace Hino.VAV.ApiTests
{
    [Collection("TestCollection")]
    public class TestExample
    {
        private readonly ITestOutputHelper _output;
        private readonly ApiTestFixture _apiTestFixture;

        public TestExample(ITestOutputHelper output, ApiTestFixture apiTestFixture)
        {
            _output = output;
            _apiTestFixture = apiTestFixture;
        }

        [Fact]
        public async Task SimpleTest()
        {
            using (var mocks = SetupMocks())
            {
                await _apiTestFixture.Client.GetAsync(new System.Uri("/api/template/tplt"));
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
