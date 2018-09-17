using Autofac;
using Autofac.Extensions.DependencyInjection;
using AutoMapper;
using Hino.VAV.Api.Profiles;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Engines;
using Hino.VAV.Managers;
using Hino.VAV.Resources;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Hino.VAV.Api.AppStart
{
    /// <summary>
    /// Startup for IoC Conainer
    /// </summary>
    public static class StartupContainer
    {
        /// <summary>
        /// Configures container services
        /// </summary>
        /// <param name="configuration">Configuration data</param>
        /// <param name="services">Collection of services</param>
        /// <returns>Inversion of control container</returns>
        public static IContainer Configure(IConfigurationRoot configuration, IServiceCollection services)
        {
            // Autofac
            var builder = new ContainerBuilder();

            builder.RegisterInstance(configuration).As<IConfigurationRoot>();
            builder.RegisterInstance(Log.Logger).As<ILogger>();
            builder.RegisterAssemblyTypes(
                    typeof(IRequestContext).Assembly,
                    typeof(IMoManager).Assembly,
                    typeof(IMoEngine).Assembly,
                    typeof(IMoResource).Assembly)
                .InstancePerLifetimeScope()
                .AsImplementedInterfaces();
            builder.Register(c =>
                    new MapperConfiguration(cfg =>
                            cfg.AddProfiles(typeof(ApiMappingProfile).Assembly))
                        .CreateMapper())
                .As<IMapper>()
                .SingleInstance();

            builder.Populate(services);

            return builder.Build();
        }
    }
}