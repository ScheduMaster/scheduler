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

        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Exchange> ExchangesRequested { get; set; }
        public virtual ICollection<Exchange> ExchangesRequestor { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<Provider> Providers { get; set; }
        public virtual ICollection<Work> Works { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<WorkProvider> WorkProviders { get; set; }
        public virtual ICollection<AuthToken> Tokens { get; set; }

        public string GetUsername()
        {
            return $"{LastName} {FirstName}";
        }
    }
}
