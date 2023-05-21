using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Application.Data.Entities;

namespace Application.Models.Requests
{
    public class UpdateAppointmentModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string CalendarId { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }

        [Required]
        public Guid UserId { get; set; }
        
        public bool Editable { get; set; }

        [Required]
        public List<User> Attendees { get; set; }
    }
}