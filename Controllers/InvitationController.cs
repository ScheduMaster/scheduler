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
        private readonly IInvitationService _invitationService;
        private readonly INotificationService _notificationService;
        private readonly IUserService _userService;

        public InvitationController
        (
            IConfiguration config, 
            DBContext context, 
            ICalendarService calendarService,
            IAppointmentService appointmentService,
            IInvitationService invitaitonService,
            INotificationService notificationService,
            IUserService userService
        )
        {
            _config = config;
            _context = context;
            _calendarService = calendarService;
            _appointmentService = appointmentService;
            _invitationService = invitaitonService;
            _notificationService = notificationService;
            _userService = userService;
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

                // Get current user from request
                string UserId = (string)HttpContext.Items["UserId"];

                Invitation invitation = await _invitationService.CreateInvitation(appointment, model);
                
                string host = _config.GetValue<string>("Host");
                string invitationURL = $"{host}/app/invitation/join/{invitation.Id}";
                
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

                Invitation invitation = _invitationService.GetInvitation(appointment.Id);
                
                if (invitation == null) 
                {
                    return NotFound(new { message = "Invitation not found" });
                }

                string invitationURL;

                // If invitation use for guest
                if (invitation.PartnerId == Guid.Empty)
                {
                    invitationURL = $"/app/invitation/join/{invitation.Id}";
                }
                else
                {
                    invitationURL = $"/app/invitation/accept/{invitation.Id}";
                }
                
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
                Invitation invitation = _invitationService.GetInvitation(model.InvitationId);
                
                if (invitation == null)
                {
                    return NotFound(new { message = "Invitation not found" });
                }
                
                return Ok(new 
                { 
                    Message = "This is a valid invitation",
                    AppointmentId = invitation.AppointmentId,
                    Name = invitation.Appointment.Name,
                    Inititor = invitation.Appointment.Initiator.GetUsername(),
                    Location = invitation.Appointment.Location,
                    Start = invitation.Appointment.Start,
                    End = invitation.Appointment.End
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Only work in add directly -> create new api for join by link
        [HttpGet("accept/{id}")]
        public async Task<IActionResult> AcceptInvitation(Guid id)
        {
            try
            {
                // Get current user from request
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                // Get the invitation to be checked
                Invitation invitation = _invitationService.GetInvitation(id);
                
                if (invitation == null)
                {
                    return NotFound(new { message = "Invitation not found" });
                }

                // Update noftification when user was added directly by initiator
                if (invitation.PartnerId != Guid.Empty)
                {
                    if (user.Id == invitation.UserId)
                    {
                        // Update IsRead status of notification
                        await _notificationService.UpdateNotification(invitation, true, user.Id);
                    }
                    else
                    {
                        // Update IsRead status of notification
                        await _notificationService.UpdateNotification(invitation, true, user.Id);

                        // Update status of invitation from pending to accepted
                        await _invitationService.UpdateStatus(invitation, Status.ACCEPTED);
                    }
                }

                // Check if current user is the inititor of appointment
                if (user.Id == invitation.UserId)
                {
                    return Ok(new { message = "You are already in this appointment." });
                }

                // Logic to add current user to appointment attendees list
                await _appointmentService.AddIntoAppointment(Guid.Parse(UserId), invitation.AppointmentId);
                
                // Create notification to inititor
                string title = $"{user.FirstName} has joined";
                string message = $"{user.GetUsername()} has accepted your meeting invitation at {DateTime.Now}";
                _notificationService.CreateNotification(invitation, title, message, invitation.UserId);

                return Ok(new { message = "Successfully joined the invitation" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendInvitation([FromBody] SendInvitaionModel model)
        {
            try
            {
                // Get current user from request
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                // Check if it contains a pending invitation request
                Invitation previousInvitation = _invitationService.GetInvitation(model.AppointmentId); 
                if (previousInvitation != null)
                {
                    return Ok(new 
                    { 
                        Message = "Invitation has already sent before.",
                        AppointmentId = previousInvitation.AppointmentId
                    });
                }

                // Create the new invitation
                Invitation invitation = await _invitationService.CreateInvitation(model, Guid.Parse(UserId));
                
                // Create notification to partner
                string title = $"{user.FirstName} has invited you";
                string message = $"{user.GetUsername()} has invited you to the meeting at {DateTime.Now}";
                _notificationService.CreateNotification(invitation, title, message, model.PartnerId);

                return Ok(new 
                { 
                    Message = "Send invitation successfully",
                    AppointmentId = invitation.AppointmentId
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("join/{id}")]
        public async Task<IActionResult> JoinInvitation(Guid id)
        {
            try
            {
                // Get current user from request
                string UserId = (string)HttpContext.Items["UserId"];
                User user = _userService.GetUserInfo(Guid.Parse(UserId));

                // Get the invitation to be checked
                Invitation invitation = _invitationService.GetInvitation(id);
                
                if (invitation == null)
                {
                    return NotFound(new { message = "Invitation not found" });
                }
                
                // Update noftification when user was joined by link
                if (invitation.PartnerId == Guid.Empty && user.Id == invitation.UserId)
                {
                    // Update IsRead status of notification
                    await _notificationService.UpdateNotification(invitation, true, user.Id);
                }

                // Check if current user is the inititor of appointment
                if (user.Id == invitation.UserId)
                {
                    return Ok(new { message = "You are already in this appointment." });
                }

                // Logic to add current user to appointment attendees list
                await _appointmentService.AddIntoAppointment(Guid.Parse(UserId), invitation.AppointmentId);
                
                // Create notification to inititor
                string title = $"{user.FirstName} has joined";
                string message = $"{user.GetUsername()} has joined your meeting invitation at {DateTime.Now}";
                _notificationService.CreateNotification(invitation, title, message, invitation.UserId);

                return Ok(new { message = "Successfully joined the invitation" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}