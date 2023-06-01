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
    public class NotificationController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DBContext _context;
        private readonly IUserService _userService;
        private readonly INotificationService _notificationService;

        public NotificationController
        (
            IConfiguration config,
            DBContext context,
            IUserService userService,
            INotificationService notificationService
        )
        {
            _config = config;
            _context = context;
            _userService = userService;
            _notificationService = notificationService;
        }

        [HttpPost("get")]
        public async Task<IActionResult> GetNotifications([FromBody] GetNotificationModel model)
        {
            try
            {
                // Get current user
                string UserId = (string)HttpContext.Items["UserId"];
                List<Notification> notifications = await _notificationService.GetNotifications(Guid.Parse(UserId));
                
                return Ok(notifications.Select(notification => new 
                {
                    Title = notification.Title,
                    Message = notification.Message,
                    Url = notification.Url,
                    IsRead = notification.IsRead,
                    CreatedAt = notification.CreatedAt
                }));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}