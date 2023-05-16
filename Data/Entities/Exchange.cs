namespace Application.Data.Entities
{
    public class Exchange
    {
        public int Id { get; set; }
        public string ExchangeStatus { get; set; }
        public int AppointmentRequestorId { get; set; }
        public int AppointmentRequestedId { get; set; }
        
        public Appointment AppointmentRequestor { get; set; }
        public Appointment AppointmentRequested { get; set; }
    }
}