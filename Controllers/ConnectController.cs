using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Application.Data;
using Application.Data.Entities;
using Application.Services;
using Application.Models.Requests;
using Application.Models.Responses;
using System.Collections.Generic;


namespace Application.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ConnectController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DBContext _context;
        private readonly IUserService _userService;

        public ConnectController(IConfiguration config, DBContext context,IUserService userService)
        {
            _config = config;
            _context = context;
            _userService = userService;
        }

        [HttpPost("request")]
        public async Task<IActionResult> RequestConnection([FromBody] CreateConnectionModel model)
        {
            try
            {
                // Get the appointment to be viewed
                User partner = _userService.GetUserInfo(model.PatnerId);
                
                if (partner == null)
                {
                    return NotFound(new { message = "Partner not found" });
                }

                // Get current user
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                // Create new request connection || get previous connection
                Connection connection = await _userService.CreateRequestConnection(user, model);

                if (connection.Status == Status.PENDING)
                {
                    return Ok(new 
                    {
                        Message = "You already have a pending request",
                        Status = Status.PENDING
                    });
                }
                else
                {
                    if (connection.Status != Status.ACCEPTED)
                    {
                        connection.Status = Status.PENDING;

                        // Update status
                         _context.Connection.Update(connection);
                        await _context.SaveChangesAsync();

                        return Ok(new 
                        {
                            Message = "Send request successfully",
                            Status = Status.PENDING
                        });
                    }
                }

                return Ok(new 
                { 
                    Message = "Send request successfully",
                    Status = Status.ACCEPTED
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}