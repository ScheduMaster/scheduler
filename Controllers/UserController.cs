using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Application.Data.Entities;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Application.Models.Requests;
using System.Collections.Generic;

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
        private readonly IHashService _hashService;

        public UserController(IConfiguration config, ITokenService tokenService, IAuthService authService, IUserService userService, IHashService hashService)
        {
            _config = config;
            _tokenService = tokenService;
            _authService = authService;
            _userService = userService;
            _hashService = hashService;
        }

        [HttpGet("info")]
        public IActionResult GetUserInfo()
        {
            try
            {
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

        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            try
            {
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new {
                    user.Id,
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.PhoneNumber,
                    user.Address
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("list")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetUsers()
        {
            try
            {
                List<User> users = _userService.GetUsers();
                
                var result = users.Select(user => new {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.PhoneNumber,
                    user.Email,
                    user.Address
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateProfileModel userToUpdate)
        {
            try
            {
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Call userService to update user
                await _userService.UpdateUserAsync(user, userToUpdate);

                return Ok(new { message = "Profile updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordModel updatePasswordModel)
        {
            try
            {
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Check if the old password is correct
                if (!_hashService.VerifyPassword(updatePasswordModel.OldPassword, user.PasswordHash))
                {
                    return BadRequest(new { message = "Invalid old password" });
                }

                // Update the user's password
                await _userService.UpdatePasswordAsync(user, updatePasswordModel.NewPassword);

                return Ok(new { message = "Password updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserModel model)
        {
            try
            {
                // Get the user to be updated
                User userToUpdate = _userService.GetUserInfo(id);

                if (userToUpdate == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Call userService to update user
                await _userService.UpdateUserAsync(userToUpdate, model);

                return Ok(new { message = "User updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                // Get the user to be updated
                User deteleUser = _userService.GetUserInfo(id);

                if (deteleUser == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Call userService to delete user
                await _userService.DeleteUserAsync(deteleUser);

                return Ok(new { message = "User deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateUserModel createUserModel)
        {
            // Call the UserService to create the user
            try
            {
                User user = await _userService.CreateUserAsync(createUserModel);

                // Return the user information
                return Ok(new {
                    Id = user.Id,
                    Email = user.Email,
                    Role = user.Role
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
    
}

