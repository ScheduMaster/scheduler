using Application.Data.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Data;
using Application.Models.Requests;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Application.Services 
{
    public class InvitationService : IInvitationService
    {
        private readonly DBContext _context;
        private readonly ICalendarService _calendarService;

        public InvitationService(DBContext context, ICalendarService calendarService)
        {
            _context = context;
            _calendarService = calendarService;
        }

        public async Task<Invitation> CreateInvitation(Appointment appointment, CreateInvitationModel model, Guid userId)
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

        public Invitation GetInvitation(int appointmentId)
        {
            Invitation invitation = _context.Invitation
                .Include(i => i.Appointment)
                .SingleOrDefault(i => i.AppointmentId == appointmentId);
            
            return invitation;
        }
        
        public Invitation GetInvitation(Guid invitationId)
        {
            Invitation invitation = _context.Invitation
                .Include(i => i.Appointment)
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
    }
}
