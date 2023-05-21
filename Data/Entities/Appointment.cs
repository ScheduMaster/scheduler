using System;
using System.Collections.Generic;

namespace Application.Data.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime? CanceledAt { get; set; }
        public string Status { get; set; }
        public Guid UserId { get; set; }
        public int CalendarId { get; set; }
        public bool Editable { get; set; }
        
        public virtual User Initiator { get; set; }
        public virtual Calendar Calendar { get; set; }
        public virtual List<WorkProvider> Providers { get; set; }
    }
}
