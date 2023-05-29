using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class SendInvitaionModel
    {
        [Required]
        public Guid PartnerId { get; set; }
        [Required]
        public int AppointmentId { get; set; }
        public string Message { get; set; }
        public DateTime? ExpiresAt { get; set; }
    }
}