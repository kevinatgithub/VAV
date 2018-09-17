using System;
using System.Net.Http;
using System.Security.Claims;

namespace Hino.VAV.IntegrationTests
{
    public static class WebRequestExtensions
    {
        public static void SetAuthentication(this HttpRequestMessage request, ClaimsIdentity identity)
        {
            var tenantId = identity.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid");
            var objectId = identity.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier");

            request.Headers.Add("Authentication", $"IntegrationTesting {tenantId}#{objectId}");
        }

        public static Pathoschild.Http.Client.IRequest WithAuthentication(this Pathoschild.Http.Client.IRequest request, ClaimsIdentity identity)
        {
            var tenantId = identity.FindFirst("http://schemas.microsoft.com/identity/claims/tenantid");
            var objectId = identity.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier");

            request.WithHeader("Authentication", $"IntegrationTesting {tenantId}#{objectId}");

            return request;
        }

        public static Pathoschild.Http.Client.IRequest GetAsync(this Pathoschild.Http.Client.IClient client, string requestUri)
        {
            return client.SendAsync(new HttpRequestMessage(HttpMethod.Get, requestUri));
        }

        public static Pathoschild.Http.Client.IRequest GetAsync(this Pathoschild.Http.Client.IClient client, Uri requestUri)
        {
            return client.SendAsync(new HttpRequestMessage(HttpMethod.Get, requestUri));
        }
    }
}
