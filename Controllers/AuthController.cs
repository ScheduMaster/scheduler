using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Application.Data;
using Application.Data.Entities;
using BCrypt.Net;

namespace Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DBContext _context;

        public AuthController(IConfiguration config, DBContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            // Validate the user using data annotations
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the email address is already in use
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return Conflict("A user with this email address already exists");
            }

            // Hash the password using BCrypt.Net
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Create a new User object and save it to the database using Entity Framework
            User newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PasswordHash = hashedPassword
            };

            // Add user to database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            // Validate the user using data annotations
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the user from the database based on the email address
            User currentUser = _context.Users.SingleOrDefault(u => u.Email == user.Email);
            if (currentUser == null)
            {
                return Unauthorized("Invalid email or password");
            }

            // Verify that the password matches the stored hash using BCrypt.Net
            if (!BCrypt.Net.BCrypt.Verify(user.Password, currentUser.PasswordHash))
            {
                return Unauthorized("Invalid email or password");
            }

            // Create a new JWT token with a unique ID, email address, and expiration date
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_config.GetValue<string>("Jwt:SecretKey"));
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            // Return the token to the client
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                currentUser.Id,
                currentUser.Email
            });
        }

        [Authorize]
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken()
        {
            // Get the current user's ID and email address from the authentication token
            Guid userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            string userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

            // Retrieve the user from the database based on the ID
            User user = _context.Users.SingleOrDefault(u => u.Id == userId);
                    if (user == null)
        {
            return Unauthorized("Invalid user ID");
        }

        // Create a new JWT token with a unique ID, email address, and expiration date
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.ASCII.GetBytes(_config.GetValue<string>("Jwt:SecretKey"));
        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

        // Return the new token to the client
        return Ok(new
        {
            token = tokenHandler.WriteToken(token),
            user.Id,
            user.Email
        });
    }
    }   
}

