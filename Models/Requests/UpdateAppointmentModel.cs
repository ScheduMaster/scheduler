using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Application.Data.Entities;
using System.Text.Json.Serialization;
using Application.Helper;

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

        [JsonPropertyName("Editable")]
        [JsonConverter(typeof(StringToBooleanConverter))]
        public bool? Editable { get; set; }
        public List<Guid> Attendees { get; set; }
    }
}