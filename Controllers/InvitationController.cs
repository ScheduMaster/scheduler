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
    public class InvitationController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly DBContext _context;
        private readonly ICalendarService _calendarService;
        private readonly IAppointmentService _appointmentService;

        public InvitationController(IConfiguration config, DBContext context, ICalendarService calendarService, IAppointmentService appointmentService)
        {
            _config = config;
            _context = context;
            _calendarService = calendarService;
            _appointmentService = appointmentService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateInvitation([FromBody] CreateInvitationModel model)
        {
            try
            {
                // Get the appointment to be viewed
                Appointment appointment = _appointmentService.GetAppointment(model.AppointmentId);
                
                if (appointment == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                Invitation invitation = await _appointmentService.CreateInvitation(appointment, model);
                
                string host = _config.GetValue<string>("Host");
                string invitationURL = $"{host}/app/invitation/accept/{invitation.Id}";
                
                return Ok(new 
                {
                    invitation = invitationURL
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("fetch/{id}")]
        public IActionResult GetInvitation(int id)
        {
            try
            {
                // Get the appointment to be viewed
                Appointment appointment = _appointmentService.GetAppointment(id);
                
                if (appointment == null)
                {
                    return NotFound(new { message = "Appointment not found" });
                }

                Invitation invitation = _appointmentService.GetInvitation(appointment.Id);
                
                if (invitation == null) 
                {
                    return NotFound(new { message = "Invitation not found" });
                }

                string host = _config.GetValue<string>("Host");
                string invitationURL = $"{host}/app/invitation/accept/{invitation.Id}";
                
                return Ok(new 
                {
                    invitation = invitationURL
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("check")]
        public IActionResult CheckInvitation([FromBody] CheckInvitaionModel model)
        {
            try
            {
                // Get the invitation to be checked
                Invitation invitation = _appointmentService.GetInvitation(model.InvitationId);
                
                if (invitation == null)
                {
                    return NotFound(new { message = "Invitation not found" });
                }
                
                return Ok(new 
                { 
                    Message = "This is a valid invitation",
                    AppointmentId = invitation.AppointmentId
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("accept/{id}")]
        public IActionResult AcceptInvitation(Guid id)
        {
            try
            {
                // Get the invitation to be checked
                Invitation invitation = _appointmentService.GetInvitation(id);
                
                if (invitation == null)
                {
                    return NotFound(new { message = "Invitation not found" });
                }
                
                // Logic to add current user to appointment attendees list
                return Ok(new { message = "Successfully joined the invitation" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}