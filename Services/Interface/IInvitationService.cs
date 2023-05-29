using Application.Data.Entities;
using System.Threading.Tasks;
using Application.Models.Requests;
using System.Collections.Generic;
using System;

namespace Application.Services
{
    public interface IInvitationService
    {
        Task<Invitation> CreateInvitation(Appointment appointment, CreateInvitationModel model, Guid UserId);
        Task<Invitation> CreateInvitation(SendInvitaionModel model, Guid UserId);
        Invitation GetInvitation(int appointmentId);
        Invitation GetInvitation(Guid invitationId);
    }

}