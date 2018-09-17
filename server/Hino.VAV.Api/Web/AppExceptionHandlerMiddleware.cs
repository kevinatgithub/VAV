using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Hino.VAV.Concerns.Common;
using Hino.VAV.Concerns.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace Hino.VAV.Api.Web
{
    /// <summary>
    /// Middleware class for Exception Handling
    /// </summary>
    public class AppExceptionHandlerMiddleware
    {
        private static readonly JsonSerializer Serializer = new JsonSerializer();
        private static readonly string UserDomain = Environment.GetEnvironmentVariable("USERDOMAIN");
        private readonly RequestDelegate _next;

        /// <summary>
        /// Initializes a new instance of the <see cref="AppExceptionHandlerMiddleware"/> class.
        /// </summary>
        /// <param name="next">The next.</param>
        public AppExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Invokes the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns>An awaitable task</returns>
        public async Task Invoke(HttpContext context)
        {
            var requestContext = context.RequestServices.GetService(typeof(IRequestContext)) as IRequestContext;
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                requestContext?.Logger?.Error(
                    exception,
                    "API Exception: {Message}",
                    exception.Message);

                SetResponseExceptionStatusCode(context, exception);

                WriteResponseExceptionContent(context, requestContext, exception);
            }
        }

        private static void WriteResponseExceptionContent(HttpContext context, IRequestContext requestContext, Exception exception)
        {
            if (context.Response.HasStarted)
            {
                return;
            }

            var responseData = new Dictionary<string, object>();
            if (exception is AppException appException)
            {
                responseData["Type"] = appException.GetType().Name;
                responseData["Code"] = appException.Code;
                responseData["Message"] = appException.Message;
                responseData["Context"] = appException.Context;
            }

            if (requestContext?.Logger != null)
            {
                requestContext.Logger.SetContext("AppExceptionHandler", UserDomain);
                if (requestContext.Logger.IsEnabled(LogLevel.Trace))
                {
                    responseData["Exception"] = exception.ToString();
                }
            }

            context.Response.ContentType = "application/json";
            using (var textWriter = new StreamWriter(context.Response.Body))
            using (var jsonWriter = new JsonTextWriter(textWriter))
            {
                Serializer.Serialize(jsonWriter, responseData);
                jsonWriter.Flush();
                textWriter.Flush();
                context.Response.Body.Flush();
            }
        }

        private static void SetResponseExceptionStatusCode(HttpContext context, Exception exception)
        {
            var statusCode = (int)HttpStatusCode.InternalServerError;
            switch (exception)
            {
                case AppUserException _:
                    statusCode = (int)HttpStatusCode.Conflict;
                    break;
                case AppBusinessException _:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    break;
                case AppTechnicalException _:
                    statusCode = (int)HttpStatusCode.InternalServerError;
                    break;
                case AppDependencyException _:
                    statusCode = 509;
                    break;
            }

            context.Response.StatusCode = statusCode;
        }
    }
}