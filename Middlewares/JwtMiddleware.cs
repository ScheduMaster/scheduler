using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Application.Services;
using System.Security.Claims;
using System;

namespace Application.Middlewares 
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ITokenService tokenService)
        {
            try
            {
                // Get the user from the current request
                ClaimsPrincipal user = context.User;

                // Get the user info from the claims
                string userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                // Set the user ID in the HttpContext items collection
                context.Items["UserId"] = userId;

                await _next(context);
            }
            catch
            {
                await _next(context);
            }
        }
    }
}
