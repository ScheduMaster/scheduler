using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Application.Data.Entities;

namespace Application.Models.Requests
{
    public class CreateAppointmentModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int CalendarId { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }

        [Required]
        public bool Editable { get; set; }

        [Required]
        public List<User> Attendees { get; set; }
    }
}