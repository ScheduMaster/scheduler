using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Application.Data;
using Application.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly DBContext _context;
        public TokenService(IConfiguration config, DBContext context)
        {
            _config = config;
            _context = context;
        }

        public async Task<object> GenerateRefeshToken(User user)
        {
            // Create a new JWT token with a unique ID, email address, and expiration date
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            // Create a list of claims for the access token (in this example, just the user's ID and username)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            // Get key SecretKey from enviroment
            byte[] key = Encoding.ASCII.GetBytes(_config.GetValue<string>("Jwt:SecretKey"));

            // Create the JWT token with the claims and a secret key
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                
                // RefeshToken will be expired in 7 days
                Expires = DateTime.UtcNow.AddDays(14),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            // Create new refresh token object
            AuthToken RefreshToken = new AuthToken
            {
                Token = tokenHandler.WriteToken(token),
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                UserId = user.Id,
                Blacklisted = false,
                Type = TokenType.REFRESH
            };

            // Add refresh token to database
            _context.AuthToken.Add(RefreshToken);
            await _context.SaveChangesAsync();

            // Return the JWT token as a string
            return new 
                {
                    Token = RefreshToken.Token,
                    ExpiresAt = RefreshToken.ExpiresAt
                };
        }

        public object GenerateAccessToken(User user)
        {
            // Create a new JWT token with a unique ID, email address, and expiration date
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            // Get key SecretKey from enviroment
            byte[] key = Encoding.ASCII.GetBytes(_config.GetValue<string>("Jwt:SecretKey"));

            // Create the JWT token with the claims and a secret key
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),

                // AccessToken will be expired in 2 hours
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            // Return the JWT token as a string
            AuthToken AccessToken = new AuthToken
            {
                Token = tokenHandler.WriteToken(token),
                ExpiresAt = DateTime.UtcNow.AddHours(2),
                Type = TokenType.ACCESS,
                Blacklisted = false,
                UserId = user.Id
            };

            return new
                {
                    Token = AccessToken.Token,
                    ExpiresAt = AccessToken.ExpiresAt
                };
        }

        public User GetUserInfo(string accessToken)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = tokenHandler.ReadJwtToken(accessToken);

            // Get key SecretKey from enviroment
            byte[] key = Encoding.ASCII.GetBytes(_config.GetValue<string>("Jwt:SecretKey"));

            // Handle decrypt accessToken and return user
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(accessToken, validationParameters, out SecurityToken securityToken);

            Guid Id = Guid.Parse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Retrieve the user from the database based on the Id
            User user = _context.Users.SingleOrDefault(u => u.Id == Id);

            if(user == null)
            {
                throw new UnauthorizedAccessException("Invalid access token");
            }

            return user;
        }

        public object RefreshAccessToken(string refreshToken)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            // Get key SecretKey from enviroment
            byte[] key = Encoding.ASCII.GetBytes(_config.GetValue<string>("Jwt:SecretKey"));

            // Handle decrypt accessToken and return user
            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(refreshToken, validationParameters, out SecurityToken securityToken);

            Guid Id = Guid.Parse(claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier).Value);

            // Retrieve the user from the database based on the UserId
            AuthToken RefeshToken = _context.AuthToken.FirstOrDefault(t => t.UserId == Id);

            // Check if RefeshToken is exist in database
            if(RefeshToken == null)
            {
                throw new UnauthorizedAccessException("Not found refesh token");
            }

            // Add old RefeshToken into blacklisted
            RefeshToken.Blacklisted = true;
            _context.SaveChanges();

            // Retrieve the user from the database based on the Id
            User user = _context.Users.SingleOrDefault(u => u.Id == Id);

            // Generate a new refesh token
            object AccessToken = GenerateAccessToken(user);
            
            // Return the new refresh token
            return AccessToken;
        }

        public void RemoveExpiredRefreshTokens()
        {
            IQueryable<AuthToken> ExpiredTokens = _context.AuthToken.Where(rt => rt.ExpiresAt <= DateTime.UtcNow);
            _context.AuthToken.RemoveRange(ExpiredTokens);
        }

        public void RevokeRefreshToken(string token)
        {
            AuthToken RefreshToken = _context.AuthToken.SingleOrDefault(rt => rt.Token == token);

            if (RefreshToken != null)
            {
                _context.AuthToken.Remove(RefreshToken);
            }
        }
    }

}
