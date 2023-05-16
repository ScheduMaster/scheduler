using System;
using Application.Data.Entities;

namespace Application.Data.Entities
{
    public class WorkProvider
    {
        public Guid UserId { get; set; }
        public int WorkId { get; set; }

        public User User { get; set; }
        public Work Work { get; set; }
    }
}