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
    public class CalendarController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DBContext _context;
        private readonly ICalendarService _calendarService;

        public CalendarController(IConfiguration config, DBContext context, ICalendarService calendarService)
        {
            _config = config;
            _context = context;
            _calendarService = calendarService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateCalendarModel Request)
        {
            try
            {
                // Validate the user using data annotations
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get user id from request
                string UserId = (string)HttpContext.Items["UserId"];
               
                // Create a new user and add user to database
                await _calendarService.CreateCalendar(Guid.Parse(UserId), Request);

                return Ok(new { message = "Calendar create successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("list")]
        public IActionResult GetCalendars()
        {
            try
            {
                string UserId = (string)HttpContext.Items["UserId"];
                List<Calendar> calendars = _calendarService.GetCalendars(Guid.Parse(UserId));

                if (calendars.Count == 0)
                {
                    return NotFound(new { message = "No calendar available" });
                }

                var result = calendars.Select(calendar => new {
                    calendar.Id,
                    calendar.Name,
                    calendar.BackgroundColor,
                    calendar.BorderColor,
                    calendar.DragBackgroundColor
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCalendar(int id, [FromBody] UpdateCalendarModel model)
        {
            try
            {
                // Get the calendar to be updated
                Calendar calendarToUpdate = _calendarService.GetCalendar(id);

                if (calendarToUpdate == null)
                {
                    return NotFound(new { message = "Calendar not found" });
                }

                // Check if calendar is belong to this user
                string UserId = (string)HttpContext.Items["UserId"];
                if (calendarToUpdate.UserId != Guid.Parse(UserId))
                {
                    return Unauthorized(new { message = "Invalid permissions" });
                }
                 
                // Call userService to update user
                await _calendarService.UpdateCalendarAsync(calendarToUpdate, model);

                return Ok(new { message = "Calendar updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCalendar(int id)
        {
            try
            {
                // Get the user to be updated
                Calendar deteleCalendar = _calendarService.GetCalendar(id);

                if (deteleCalendar == null)
                {
                    return NotFound(new { message = "Calendar not found" });
                }

                // Check if calendar is belong to this user
                string UserId = (string)HttpContext.Items["UserId"];
                if (deteleCalendar.UserId != Guid.Parse(UserId))
                {
                    return Unauthorized(new { message = "Invalid permissions" });
                }

                // Call calendarService to delete calendar
                await _calendarService.DeleteCalendarAsync(deteleCalendar);

                return Ok(new { message = "Calendar deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("view/{id}")]
        public IActionResult GetCalendar(int id)
        {
            try
            {
                // Get the user to be updated
                Calendar viewCalendar = _calendarService.GetCalendar(id);

                if (viewCalendar == null)
                {
                    return NotFound(new { message = "Calendar not found" });
                }

                return Ok(new {
                    viewCalendar.Id,
                    viewCalendar.Name,
                    viewCalendar.BackgroundColor,
                    viewCalendar.BorderColor,
                    viewCalendar.DragBackgroundColor
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }   
}

