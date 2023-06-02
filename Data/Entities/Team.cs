using System;
using Application.Data.Entities;
using System.Collections.Generic;

namespace Application.Data.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string ReferralCode { get; set; }
        public string Name { get; set; }

        public virtual List<User> Users { get; set; }
    }
}