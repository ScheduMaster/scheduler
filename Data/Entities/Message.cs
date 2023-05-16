using System;

namespace Application.Data.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Text { get; set; }
        public Guid AuthorId { get; set; }
        public User Author { get; set; }

        public int AppointmentId { get; set; }
        public Appointment Appointment { get; set; }
    }
}