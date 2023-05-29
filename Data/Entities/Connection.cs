using System;
using System.Collections.Generic;

namespace Application.Data.Entities
{
    public enum Status
    {
        PENDING,
        ACCEPTED,
        REJECTED,
        TERMINATED
    }

    public class Connection
    {
        public Guid Id { get; set; }
        public Guid FisrtUserId { get; set; }
        public Guid SecondUserId { get; set; }
        public Status Status { get; set; }
        public string Message { get; set; }
        public DateTime ConnectionDate { get; set; }

        public virtual User FirstUser { get; set; }
        public virtual User SecondUser { get; set; }
    }
}