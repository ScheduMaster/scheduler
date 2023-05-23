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
    public class AppointmentController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DBContext _context;
        private readonly ICalendarService _calendarService;
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IConfiguration config, DBContext context, ICalendarService calendarService, IAppointmentService appointmentService)
        {
            _config = config;
            _context = context;
            _calendarService = calendarService;
            _appointmentService = appointmentService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateAppointmentModel model)
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
                await _appointmentService.CreateAppointment(Guid.Parse(UserId), model);

                return Ok(new { message = "Appointment create successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("list")]
        public IActionResult GetAppointments()
        {
            try
            {
                // Get user id from request
                string UserId = (string)HttpContext.Items["UserId"];
               
                // Get all appointments of user from database by _appointmentService
                List<Appointment> appointments = _appointmentService.GetAppointments(Guid.Parse(UserId));
                
                var result = appointments.Select(appointment => new {
                    appointment.Id,
                    Title = appointment.Name,
                    Initiator = appointment.Initiator.GetUsername(),
                    appointment.Location,
                    appointment.Start,
                    appointment.End,
                    appointment.Status,
                    appointment.CalendarId,
                    Editable = appointment.Editable.ToString()
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, [FromBody] UpdateAppointmentModel model)
        {
            try
            {
                // Get the appointment to be updated
                Appointment appointmentToUpdate = _appointmentService.GetAppointment(id);
                
                if (appointmentToUpdate == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                // Call appointmentService to update appointment
                await _appointmentService.UpdateAppointmentAsync(appointmentToUpdate, model);

                return Ok(new { message = "Appointment updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}