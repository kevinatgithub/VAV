using System.Collections.Generic;
using Autofac.Extras.Moq;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Engines.Implementation;
using Hino.VAV.Models;
using Hino.VAV.Resources;
using Xunit;
using Xunit.Abstractions;

namespace Hino.VAV.UnitTests
{
    [Collection("TestCollection")]
    public class TestExample
    {
        private readonly ITestOutputHelper _output;

        public TestExample(ITestOutputHelper output)
        {
            _output = output;
        }

        public static IEnumerable<object[]> UnitTestData => new List<object[]>
        {
            new[] { "data1" },
            new[] { "data2" }
        };

        [Theory]
        [MemberData(nameof(UnitTestData))]
        public void RunTestWithMemberData(string data)
        {
            using (var mocks = SetupMocks())
            {
                mocks.Mock<ITemplateResource>()
                    .Setup(s => s.GetTemplate())
                    .Returns(new Template { Name = data, Value = data })
                    .Verifiable();

                var template = mocks.Create<TemplateEngine>().GetTemplate();

                mocks.Mock<ITemplateResource>().VerifyAll();

                Assert.Contains("data", data);
                Assert.Contains("data", template.Name);
                Assert.Contains("data", template.Value);
            }
        }

        [Fact]
        public void SimpleTest()
        {
            using (var mocks = SetupMocks())
            {
                mocks.Mock<ITemplateResource>()
                    .Setup(s => s.GetTemplate())
                    .Returns(new Template { Name = "name", Value = "value" });

                var data = mocks.Create<TemplateEngine>().GetTemplate();

                mocks.Mock<ITemplateResource>().VerifyAll();

                Assert.True(!string.IsNullOrEmpty(data.Value));
                Assert.True(!string.IsNullOrEmpty(data.Name));
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
