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
        private readonly IInvitationService _invitationService;

        public AppointmentService(DBContext context, IInvitationService invitationService)
        {
            _context = context;
            _invitationService = invitationService;
        }

        public async Task<Appointment> CreateAppointment(Guid userId, CreateAppointmentModel model)
        {
            // Create a new Appointment model with the data from the CreateAppointmentModel
            Appointment createdAppointment = new Appointment 
            {
                UserId = userId,
                Name = model.Name,
                Start = model.Start,
                Location = model.Location,
                End = model.End,
                CalendarId = model.CalendarId,
                Editable = model.Editable
            };

            // Call the dbContext to create the appointment
            _context.Appointment.Add(createdAppointment);
            await _context.SaveChangesAsync();

            // Add current user to WorkProvider
            _context.WorkProvider.Add(new WorkProvider 
            {
                UserId = userId,
                AppointmentId = createdAppointment.Id
            });

            // Send invitation to all attendees
            foreach (Guid attendee in model.Attendees)
            {
                await _invitationService.GenerateInvitation(createdAppointment.Id, userId, attendee);
            }

            await _context.SaveChangesAsync();

            return createdAppointment;
        }

        public async Task<Appointment> UpdateAppointmentAsync(Appointment appointmentToUpdate, UpdateAppointmentModel model, Guid userId)
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

            // Update attendees && check the difference between number of providers and attendees 
            if (!(model.Attendees.Count > 0) && appointmentToUpdate.Providers.Count != model.Attendees.Count)
            {
                // Get the list of providers with different UserIds compared to userIds list
                List<WorkProvider> differentAttendees = appointmentToUpdate.Providers.Where(provider => !model.Attendees.Contains(provider.UserId)).ToList();
                
                // Remove inititor of appointment from differentAttendees list
                differentAttendees.RemoveAll(da => da.UserId == userId);

                foreach (WorkProvider workProvider in differentAttendees)
                {
                    // Case 1: Attendee was removed: attendee is not in model.Attendees
                    if (!model.Attendees.Any(attendee => attendee == workProvider.UserId))
                    {
                        _context.WorkProvider.Remove(workProvider);
                    }

                    // Case 2: Attendee was added: attendee is not in appointmentToUpdate.Providers
                    if (!appointmentToUpdate.Providers.Any(provider => provider.UserId == workProvider.UserId))
                    {
                        await _invitationService.GenerateInvitation(workProvider.AppointmentId, userId, workProvider.UserId);
                    }
                }
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

        public List<Appointment> GetAllAppointments(Guid userId)
        {
            List<Appointment> appointments = _context.Appointment
                .Include(a => a.Initiator) // Eager loading of Initiator entity
                .Include(a => a.Calendar) // Eager loading of Calendar entity
                .Include(a => a.Providers) // Eager loading of Providers collection
                    .ThenInclude(w => w.User) // Eager loading of User entity for each WorkProvider
                .Where(a => a.UserId == userId || a.Providers.Any(w => w.UserId == userId))
                .ToList();

            return appointments;
        }

        public List<Appointment> GetOwnAppointments(Guid userId)
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
            List<WorkProvider> workProviders = _context.WorkProvider
            .Include(w => w.Appointment)
                .ThenInclude(a => a.Calendar)
            .Include(w => w.Appointment)
                .ThenInclude(a => a.Initiator)
            .Where(w => w.UserId == userId && w.Appointment.End >= DateTime.Now)
            .OrderBy(w => w.Appointment.Start)
            .ToList();
            
            List<Appointment> appointments = new List<Appointment>();
            foreach (WorkProvider workProvider in workProviders)
            {
                appointments.Add(workProvider.Appointment);
            }

            return appointments;
        }

        public Appointment GetAppointment(int id)
        {
            // Get the appointment from the database
            Appointment appointment = _context.Appointment
                .Include(appointment => appointment.Initiator) // Eager loading of Initiator entity
                .Include(appointment => appointment.Providers)
                    .ThenInclude(workProvider => workProvider.User)
                .SingleOrDefault(appointment => appointment.Id == id);

            // Check if the appointment exists
            if (appointment == null)
            {
                return null;
            }

            return appointment;
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
