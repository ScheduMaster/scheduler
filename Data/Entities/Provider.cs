using System;

namespace Application.Data.Entities
{
    public class Provider
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}