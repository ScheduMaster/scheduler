using System.Collections.Generic;

using System;

namespace Application.Data.Entities
{
    public enum Status
    {
        PENDING,
        ACCEPTED,
        REJECTED,
        TERMINATED
    }
    
    public class Invitation
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid PartnerId { get; set; }
        public int AppointmentId { get; set; }
        public DateTime ExpiresAt { get; set; }
        public Status Status { get; set; }

        public virtual Appointment Appointment { get; set; }
        public virtual User Partner { get; set; }
    }
}
