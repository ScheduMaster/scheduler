using Application.Data.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Data;
using Application.Models.Requests;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace Application.Services 
{
    public class InvitationService : IInvitationService
    {
        private readonly DBContext _context;
        private readonly IConfiguration _config;
        private readonly ICalendarService _calendarService;

        public InvitationService(DBContext context, ICalendarService calendarService, IConfiguration config)
        {
            _context = context;
            _calendarService = calendarService;
            _config = config;
        }

        public async Task<Invitation> CreateInvitation(Appointment appointment, CreateInvitationModel model)
        {
            // Default expire time
            DateTime expiresAt = appointment.Start;

            if (model.ExpiresAt.HasValue && (model.ExpiresAt.Value != appointment.Start))
            {
                expiresAt = model.ExpiresAt.Value;
            }

            Invitation invitation = new Invitation 
            {  
                AppointmentId = appointment.Id,
                UserId = appointment.UserId,
                ExpiresAt = expiresAt
            };

            // Save invitation into database
            _context.Invitation.Add(invitation);
            await _context.SaveChangesAsync();;

            // Return invitation
            return invitation;
        }

        public Invitation GetInvitation(int appointmentId)
        {
            Invitation invitation = _context.Invitation
                .Include(i => i.Appointment)
                    .ThenInclude(a => a.Initiator)
                .SingleOrDefault(i => i.AppointmentId == appointmentId);
            
            return invitation;
        }
        
        public Invitation GetInvitation(Guid invitationId)
        {
            Invitation invitation = _context.Invitation
                .Include(i => i.Appointment)
                    .ThenInclude(a => a.Initiator)
                .SingleOrDefault(i => i.Id == invitationId);
            
            return invitation;
        }

        public async Task<Invitation> CreateInvitation(SendInvitaionModel model, Guid userId)
        {
            // Get appointment data from database
            Appointment appointment = _context.Appointment.SingleOrDefault(a => a.Id == model.AppointmentId);

            // Default expire time
            DateTime expiresAt = appointment.Start;

            if (model.ExpiresAt.HasValue && (model.ExpiresAt.Value != appointment.Start))
            {
                expiresAt = model.ExpiresAt.Value;
            }

            Invitation invitation = new Invitation 
            {  
                AppointmentId = appointment.Id,
                PartnerId = model.PartnerId,
                UserId = userId,
                ExpiresAt = expiresAt
            };

            // Save invitation into database
            _context.Invitation.Add(invitation);
            await _context.SaveChangesAsync();;

            // Return invitation
            return invitation;
        }

        public string GetInvitationUrl(Guid invitationId)
        {
            // Get invitation data from database
            Invitation invitation = _context.Invitation.SingleOrDefault(a => a.Id == invitationId);
            string invitationURL;
            
            // If invitation was used for guest
            if (invitation.PartnerId == Guid.Empty)
            {
                invitationURL = $"/app/invitation/join/{invitation.Id}";
            }
            else
            {
                invitationURL = $"/app/invitation/accept/{invitation.Id}";
            }
            
            return invitationURL;
        }

        public string GetInvitationUrl(Invitation invitation)
        {
            string invitationURL;
            
            // If invitation was used for guest
            if (invitation.PartnerId == Guid.Empty)
            {
                invitationURL = $"/app/invitation/join/{invitation.Id}";
            }
            else
            {
                invitationURL = $"/app/invitation/accept/{invitation.Id}";
            }
            
            return invitationURL;
        }

        public async Task<Invitation> GenerateInvitation(int appointmentId, Guid ownerId, Guid partnerId)
        {
            // Find if it contains an before invitation (status: pending/reject)
            Invitation previousInvitation = _context.Invitation
                .Include(invitation => invitation.Appointment)
                .SingleOrDefault(invitation => invitation.AppointmentId == appointmentId 
                    && invitation.UserId == ownerId && invitation.PartnerId == partnerId);
            
            if (previousInvitation != null)
            {
                Status status = previousInvitation.Status;
                if (status == Status.REJECTED || status == Status.TERMINATED)
                {
                    Invitation newInvitation = new Invitation 
                    { 
                        AppointmentId = appointmentId,
                        UserId = ownerId,
                        PartnerId = partnerId,
                        ExpiresAt = previousInvitation.Appointment.Start,
                        Status = Status.PENDING
                    };

                    // Save into database
                    await _context.Invitation.AddAsync(newInvitation);
                    await _context.SaveChangesAsync();

                    return newInvitation;
                }
            }

            // Create new invitation
            Appointment appointment = _context.Appointment.SingleOrDefault(a => a.Id == appointmentId);
            User owner = _context.Users.SingleOrDefault(u => u.Id == ownerId);
            string message = $"You have been invited to a meeting by {owner.GetUsername()}";

            return await CreateInvitation(
                new SendInvitaionModel {
                    PartnerId = partnerId,
                    AppointmentId = appointmentId,
                    Message = message,
                    ExpiresAt = appointment.Start
                },
                ownerId
            );
        }

        public async Task<Invitation> UpdateStatus(Invitation invitation, Status status)
        {
            invitation.Status = status;
            _context.Invitation.Update(invitation);
            await _context.SaveChangesAsync();
            
            return invitation;
        }
    }
}
