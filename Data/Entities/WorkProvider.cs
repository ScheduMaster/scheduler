using System;
using System.Collections.Generic;

namespace Application.Data.Entities
{
    public class WorkProvider
    {
        public Guid UserId { get; set; }
        public int AppointmentId { get; set; }

        public virtual User User { get; set; }
        public virtual Appointment Appointment { get; set; }
    }
}