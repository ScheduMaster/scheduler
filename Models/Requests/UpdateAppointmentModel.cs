using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Application.Data.Entities;

namespace Application.Models.Requests
{
    public class UpdateAppointmentModel
    {
        public string Name { get; set; }
        public int CalendarId { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public Guid UserId { get; set; }
        public bool Editable { get; set; }
        public List<User> Attendees { get; set; }
    }
}