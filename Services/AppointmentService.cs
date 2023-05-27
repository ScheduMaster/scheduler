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
    public class AppointmentService : IAppointmentService
    {
        private readonly DBContext _context;
        private readonly ICalendarService _calendarService;

        public AppointmentService(DBContext context, ICalendarService calendarService)
        {
            _context = context;
            _calendarService = calendarService;
        }

        public async Task<Appointment> CreateAppointment(Guid UserId, CreateAppointmentModel model)
        {
            // Create a new Appointment model with the data from the CreateAppointmentModel
            Appointment createdAppointment = new Appointment 
            {
                UserId = UserId,
                Name = model.Name,
                Start = model.Start,
                End = model.End,
                CalendarId = model.CalendarId,
                Editable = model.Editable
            };

            // Call the dbContext to create the appointment
            _context.Appointment.Add(createdAppointment);
            await _context.SaveChangesAsync();

            // Add current user to attendees list
            model.Attendees.Add(new User { Id = UserId });

            // Add all attendees to work provider
            foreach (User attendee in model.Attendees)
            {
                _context.WorkProvider.Add(new WorkProvider 
                {
                    UserId = attendee.Id,
                    AppointmentId = createdAppointment.Id
                });
            }

            await _context.SaveChangesAsync();

            return createdAppointment;
        }

        public async Task<Appointment> UpdateAppointmentAsync(Appointment appointmentToUpdate, UpdateAppointmentModel model)
        {
            // Update the appointment's properties
            if (!string.IsNullOrEmpty(model.Name) && appointmentToUpdate.Name != model.Name)
            {
                appointmentToUpdate.Name = model.Name;
            }

            if (!string.IsNullOrEmpty(model.Location) && appointmentToUpdate.Location != model.Location)
            {
                appointmentToUpdate.Location = model.Location;
            }

            if (!(model.Start == DateTime.MinValue) && appointmentToUpdate.Start != model.Start)
            {
                appointmentToUpdate.Start = model.Start;
            }

            if (!(model.End == DateTime.MinValue) && appointmentToUpdate.End != model.End)
            {
                appointmentToUpdate.End = model.End;
            }

            if (model.Editable.HasValue && (model.Editable.Value != appointmentToUpdate.Editable))
            {
                appointmentToUpdate.Editable = model.Editable.Value;
            }

            if (!(model.CalendarId == 0) && appointmentToUpdate.CalendarId != model.CalendarId)
            {
                appointmentToUpdate.CalendarId = model.CalendarId;
            }

            // Call the Appointment Context to update the appointment
            _context.Appointment.Update(appointmentToUpdate);
            await _context.SaveChangesAsync();

            return appointmentToUpdate;
        }

        public async Task<bool> DeleteAppointmentAsync(Appointment deleteAppointment)
        {
            // Call the userContext to delete the user
            _context.Appointment.Remove(deleteAppointment);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public List<Appointment> GetAppointments(Guid userId)
        {
            // Call the Appointment Context to get the Appointments
            List<Appointment> appointments = _context.Appointment
                .Include(appointment => appointment.Initiator) // Eager loading of Initiator entity
                .Where(appointment => appointment.UserId == userId)
                .ToList();

            return appointments;
        }

        public List<Appointment> GetUpcommingAppointments(Guid userId)
        {
            // Call the Appointment Context to get the Appointments
            List<Appointment> appointments = _context.Appointment
                .Include(appointment => appointment.Initiator) // Eager loading of Initiator entity
                .Include(appointment => appointment.Calendar) // Eager loading of Calendar entity
                .Where(appointment => appointment.UserId == userId && appointment.Start > DateTime.Now)
                .ToList();

            return appointments;
        }

        public Appointment GetAppointment(int id)
        {
            // Get the appointment from the database
            Appointment appointment = _context.Appointment
                .Include(appointment => appointment.Initiator) // Eager loading of Initiator entity
                .SingleOrDefault(appointment => appointment.Id == id);

            // Check if the appointment exists
            if (appointment == null)
            {
                return null;
            }

            return appointment;
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

        public async Task<bool> AddIntoAppointment(Guid userId, int appointmentId)
        {
            // Check if user already in appointment particapation
            WorkProvider workProvider = _context.WorkProvider
                .SingleOrDefault(w => w.UserId == userId && w.AppointmentId == appointmentId);

            if (workProvider != null)
            {
                return true;
            }

            // Add all attendees to work provider
            _context.WorkProvider.Add(new WorkProvider 
            {
                UserId = userId,
                AppointmentId = appointmentId
            });

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
