using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Hino.VAV.Api.AppStart;
using Hino.VAV.Api.Web;
using Hino.VAV.Concerns.Logging;
using Hino.VAV.Resources.Implementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace Hino.VAV.Api
{
    /// <summary>
    /// Startup code
    /// </summary>
    public class Startup
    {
        private const string ApiName = "Hino VAV API";

        private readonly IHostingEnvironment _environment;

        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// Startup code for the hosting environment
        /// </summary>
        /// <param name="env">The active hosting environment</param>
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            this.Configuration = builder.Build();

            StartupLogging.Configure(this.Configuration);

            this._environment = env;
        }

        private IConfigurationRoot Configuration { get; }

        private IContainer ApplicationContainer { get; set; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <returns>A configured service provider</returns>
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            if (Environment.GetEnvironmentVariable("SERVER_AUTHENTICATION_MODE") == "IntegrationTesting")
            {
                services.AddAuthentication(sharedOptions => { sharedOptions.DefaultScheme = "IntegrationTesting"; });
            }

            services.AddAuthorization(auth => auth.AddPolicy("default", policy => policy.RequireAuthenticatedUser()));
            services.AddMvc();

            // EF
            services.AddDbContext<VavContext>(o => o.UseSqlServer(Configuration.GetConnectionString("SqlConnection")));

            // Swagger
            StartupApiDocs.Configure(services, _environment, ApiName);

            // Autofac
            ApplicationContainer = StartupContainer.Configure(Configuration, services);

            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(ApplicationContainer);
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="loggerFactory">The logger factory.</param>
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            if (_environment.IsDevelopment())
            {
                loggerFactory.AddProvider(new ApplicationLoggerProvider(Configuration));
            }

            app
                .UseAppExceptionHandler()
                .UseSwagger()
                .UseSwaggerUI(c => StartupApiDocs.Configure(c, ApiName, _environment.EnvironmentName))
                .UseClientConfiguration()
                .UseDefaultFiles()
                .UseStaticFiles(ConfigureStaticFiles.CreateOptions())
                .UseAuthentication()
                .UseRequestContext()
                .UseMvc();
        }
    }
}