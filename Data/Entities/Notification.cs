using System;

namespace Application.Data.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Url { get; set; }
        public bool IsRead { get; set; }

        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}