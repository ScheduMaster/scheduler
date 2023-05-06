using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Application.Data;
using Application.Data.Entities;
using Application.Services;

namespace Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ITokenService _tokenService;
        private readonly IAuthService _authService;

        public UserController(IConfiguration config, ITokenService tokenService, IAuthService authService)
        {
            _config = config;
            _tokenService = tokenService;
            _authService = authService;
        }

        [HttpGet("info")]
        public IActionResult GetUserInfo()
        {
            try
            {
                string token = HttpContext.Request.Headers["Authorization"].ToString().Substring("Bearer ".Length).Trim();
                User user = _tokenService.GetUserInfo(token);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(new 
                    {
                        name = user.FirstName,
                        role = "Administrator"
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }   
}

