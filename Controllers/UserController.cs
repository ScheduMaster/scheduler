using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Application.Data.Entities;
using Application.Services;
using Microsoft.AspNetCore.Http;
namespace Application.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public UserController(IConfiguration config, ITokenService tokenService, IAuthService authService, IUserService userService)
        {
            _config = config;
            _tokenService = tokenService;
            _authService = authService;
            _userService = userService;
        }

        [HttpGet("info")]
        public IActionResult GetUserInfo()
        {
            try
            {
                // string token = HttpContext.Request.Headers["Authorization"].ToString().Substring("Bearer ".Length).Trim();
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new 
                    {
                        name = user.GetUsername(),
                        role = user.Role
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }   
}

