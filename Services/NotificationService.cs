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
                .Where(notification => notification.UserId == userId)
                .ToListAsync();
            
            return notifications;
        }

        public async Task<Notification> CreateNotification(Invitation invitation, string title, string message)
        {
            // Get invitation url
            string invitationURL = _invitationService.GetInvitationUrl(invitation.Id);
            
            // Create new notification
            Notification notification = new Notification
            {
                UserId = invitation.UserId,
                Title = title,
                Message = message,
                Url = invitationURL,
                IsRead = false,
                CreatedAt = DateTime.Now
            };

            // Save into database
            _context.Notification.Add(notification);
            await _context.SaveChangesAsync();

            return notification;
        }
    }
}
