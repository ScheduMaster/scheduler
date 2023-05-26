using System.Collections.Generic;

using System;

namespace Application.Data.Entities
{
    public class Invitation
    {
        public Guid Id { get; set; }
        public int AppointmentId { get; set; }
        public DateTime ExpiresAt { get; set; }

        public virtual Appointment Appointment { get; set; }
    }
}
