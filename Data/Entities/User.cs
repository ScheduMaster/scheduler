using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System;

namespace Application.Data.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }

        public virtual List<Appointment> Appointments { get; set; }
        public virtual List<Exchange> ExchangesRequested { get; set; }
        public virtual List<Exchange> ExchangesRequestor { get; set; }
        public virtual List<Notification> Notifications { get; set; }
        public virtual List<Message> Messages { get; set; }
        public virtual List<Customer> Customers { get; set; }
        public virtual List<WorkProvider> WorkProviders { get; set; }
        public virtual List<AuthToken> Tokens { get; set; }
        public virtual List<Connection> Connections { get; set; }

        public string GetUsername()
        {
            return $"{LastName} {FirstName}";
        }
    }
}
