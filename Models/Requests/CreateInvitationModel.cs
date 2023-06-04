using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class CreateInvitationModel
    {
        [Required]
        public int AppointmentId { get; set; }
        public DateTime? ExpiresAt { get; set; }
    }
}