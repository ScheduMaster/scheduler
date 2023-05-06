using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Application.Services;
using Application.Data.Entities;
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
            string authorizationHeader = context.Request.Headers["Authorization"].ToString();
            if(!string.IsNullOrEmpty(authorizationHeader))
            {
                // Validation of the Token expiration
                string token = authorizationHeader.Substring("Bearer ".Length).Trim();
                User user = tokenService.GetUserInfo(token);

                if (user != null)
                {
                    context.Items["User"] = user;
                }
                await _next(context);
            }

            await _next(context);
        }
    }
}
