using System;
using Application.Data.Entities;
using System.Collections.Generic;

namespace Application.Data.Entities
{
    public class Customer
    {
        public Guid Id { get; set; }

        public virtual User user { get; set; }
    }
}