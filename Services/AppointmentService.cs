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
        private readonly INotificationService _notificationService;

        public AppointmentService(DBContext context, IInvitationService invitationService, INotificationService notificationService)
        {
            _context = context;
            _invitationService = invitationService;
            _notificationService = notificationService;
        }

        public async Task<Appointment> CreateAppointment(Guid userId, CreateAppointmentModel model)
        {
            // Get user
            User user = _context.Users.SingleOrDefault(u => u.Id == userId);

            // Create a new Appointment model with the data from the CreateAppointmentModel
            Appointment createdAppointment = new Appointment 
            {
                UserId = userId,
                Name = model.Name,
                Start = model.Start,
                Location = model.Location,
                End = model.End,
                Status = true,
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
            await _context.SaveChangesAsync();
            
            // Send invitation to all attendees
            foreach (Guid attendee in model.Attendees)
            {
                // Generate invitation
                Invitation invitation = await _invitationService.GenerateInvitation(createdAppointment.Id, userId, attendee);
                
                // Create notification to partner
                string title = $"{user.FirstName} has invited you";
                string message = $"{user.GetUsername()} has invited you to the meeting at {DateTime.Now}";
                _notificationService.CreateNotification(invitation, title, message, attendee);
            }

            return createdAppointment;
        }

        public async Task<Appointment> UpdateAppointmentAsync(Appointment appointmentToUpdate, UpdateAppointmentModel model, Guid initiatorId)
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

            // Check if the array model.Attendees is empty. 
            // If null -> update on calendar otherwise update on form 
            if (model.Attendees != null)
            {
                // Update attendees && check the difference between the number of providers and attendees 
                if (model.Attendees.Count > 0 && appointmentToUpdate.Providers.Count != model.Attendees.Count)
                {
                    // Get the list of previous attendance 
                    List<Guid> previousAttendances = appointmentToUpdate.Providers
                        .Select(wp => wp.UserId)
                        .ToList();

                    // The differences
                    List<Guid> differentAttendees = model.Attendees.Except(previousAttendances).ToList();

                    // Remove initiator of the appointment from differentAttendees list
                    differentAttendees.RemoveAll(attendance => attendance == initiatorId);

                    // Initiator
                    User initiator = appointmentToUpdate.Initiator;

                    // Loop to update
                    foreach (Guid attendee in differentAttendees)
                    {
                        // Case 1: Attendee was removed: attendee is not in model.Attendees
                        if (!model.Attendees.Contains(attendee))
                        {
                            // Get provider
                            WorkProvider workProvider = _context.WorkProvider
                                .FirstOrDefault(w => w.AppointmentId == appointmentToUpdate.Id && w.UserId == attendee);

                            if (workProvider != null)
                            {
                                _context.WorkProvider.Remove(workProvider);
                            }
                        }

                        // Case 2: Attendee was added: attendee is not in appointmentToUpdate.Providers
                        if (!appointmentToUpdate.Providers.Any(provider => provider.UserId == attendee))
                        {
                            // Generate invitation
                            Invitation invitation = await _invitationService.GenerateInvitation(appointmentToUpdate.Id, initiatorId, attendee);

                            // Create notification to partner
                            string title = $"{initiator.FirstName} has invited you";
                            string message = $"{initiator.GetUsername()} has invited you to the meeting at {appointmentToUpdate.Start}";

                            _notificationService.CreateNotification(invitation, title, message, attendee);
                        }
                    }
                }
            }

            // Call the Appointment Context to update the appointment
            if (_context.ChangeTracker.Entries<Appointment>().Any(e => e.Entity == appointmentToUpdate && e.State != EntityState.Unchanged))
            {
                _context.Appointment.Update(appointmentToUpdate);
                await _context.SaveChangesAsync();
            }

            return appointmentToUpdate;
        }

        public async Task<bool> DeleteAppointmentAsync(Appointment deleteAppointment)
        {
            // Call the userContext to delete the appointment -> change status to false
            deleteAppointment.Status = false;
            _context.Appointment.Update(deleteAppointment);
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
                .Where(a => a.Status && (a.UserId == userId || a.Providers.Any(w => w.UserId == userId)))
                .ToList();

            return appointments;
        }

        public List<Appointment> GetOwnAppointments(Guid userId)
        {
            // Call the Appointment Context to get the Appointments
            List<Appointment> appointments = _context.Appointment
                .Include(a => a.Initiator) // Eager loading of Initiator entity
                .Include(a => a.Calendar) // Eager loading of Calendar entity
                .Include(a => a.Providers) // Eager loading of Providers collection
                    .ThenInclude(w => w.User) // Eager loading of User entity for each WorkProvider
                .Where(appointment => appointment.Status && appointment.UserId == userId)
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
            .Where(w => w.UserId == userId 
                && w.Appointment.Status 
                && w.Appointment.End >= DateTime.Now)
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
                .Include(w => w.Appointment)
                .SingleOrDefault(w => w.UserId == userId 
                    && w.AppointmentId == appointmentId
                    && w.Appointment.Status);

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

        public bool CheckUserInAppointment(Guid userId, Appointment appointment)
        {
            if (!appointment.Providers.Any(provider => provider.UserId == userId))
            {
               return false;
            }

            return true;
        }
    }
}
