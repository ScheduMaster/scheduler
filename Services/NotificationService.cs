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
    public class NotificationService : INotificationService
    {
        private readonly DBContext _context;
        private readonly IInvitationService _invitationService;
        public NotificationService(DBContext context, IInvitationService invitationService)
        {
            _context = context;
            _invitationService = invitationService;
        }

        public async Task<List<Notification>> GetNotifications(Guid userId)
        {
            List<Notification> notifications = await _context.Notification
                .Where(n => n.UserId == userId && n.IsRead == false)
                .Take(6)
                .ToListAsync();
            
            return notifications;
        }

        public Notification CreateNotification(Invitation invitation, string title, string message, Guid userId)
        {
            // Get invitation url
            string invitationURL = _invitationService.GetInvitationUrl(invitation);

            // Create new notification
            Notification notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                Url = invitationURL,
                IsRead = false,
                CreatedAt = DateTime.Now
            };

            // Save into database
            _context.Notification.Add(notification);
            _context.SaveChangesAsync();

            return notification;
        }

        public async Task<Notification> UpdateNotification(Invitation invitation, bool IsRead, Guid userId)
        {
            string invitationURL = _invitationService.GetInvitationUrl(invitation);
            Notification notification = _context.Notification
                .SingleOrDefault(n => n.Url == invitationURL && n.UserId == userId);
            notification.IsRead = true;

            _context.Notification.Update(notification);
            await _context.SaveChangesAsync();

            return notification;
        }
    }
}
