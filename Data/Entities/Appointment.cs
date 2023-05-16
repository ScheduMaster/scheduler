using System;
using System.Collections.Generic;

namespace Application.Data.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime? CanceledAt { get; set; }
        public string Status { get; set; }
        public Guid? CancelerId { get; set; }
        public Guid ProviderId { get; set; }
        public Guid CustomerId { get; set; }
        public int WorkId { get; set; }

        public virtual User Canceler { get; set; }
        public virtual User Customer { get; set; }
        public virtual Work Work { get; set; }
        public virtual User Provider { get; set; }
    }
}
