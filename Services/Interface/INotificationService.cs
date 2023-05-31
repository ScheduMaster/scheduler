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
        Task<Notification> CreateNotification(Invitation invitation, string title, string message);
    }

}