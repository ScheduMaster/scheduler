using Application.Data.Entities;
using System.Threading.Tasks;
using Application.Models.Requests;
using System.Collections.Generic;
using System;

namespace Application.Services
{
    public interface IAppointmentService
    {
        Task<Appointment> CreateAppointment(Guid UserId, CreateAppointmentModel model);
        Task<Appointment> UpdateAppointmentAsync(Appointment appointment, UpdateAppointmentModel model);
        Task<bool> DeleteAppointmentAsync(Appointment appointment);
        List<Appointment> GetAppointments(Guid userId);
        List<Appointment> GetUpcommingAppointments(Guid userId);
        Appointment GetAppointment(int id);
        Task<Invitation> CreateInvitation(Appointment appointment, CreateInvitationModel model);
        Invitation GetInvitation(int appointmentId);
        Invitation GetInvitation(Guid invitationId);
        Task<bool> AddIntoAppointment(Guid userId, int appointmentId);
    }

}