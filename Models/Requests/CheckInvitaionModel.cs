using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class CheckInvitaionModel
    {
        [Required]
        public Guid InvitationId { get; set; }
    }
}