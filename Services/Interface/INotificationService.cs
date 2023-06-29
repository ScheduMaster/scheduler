using Application.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface INotificationService
    {
        Task<List<Notification>> GetNotifications(Guid userId);
        Notification CreateNotification(Invitation invitation, string title, string message, Guid userId);
        Task<Notification> UpdateNotification(Invitation invitation, bool IsRead, Guid userId);
    }

}