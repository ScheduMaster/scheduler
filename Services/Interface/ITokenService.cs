using Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface ITokenService
    {
        object RefreshAccessToken(string refreshToken);

        // Refresh an expired access token and return a new access token
        object GenerateAccessToken(User user);

        // Get user information by their access token
        User GetUserInfo(string accessToken);

        Task<object> GenerateRefeshToken(User user);
    }

}