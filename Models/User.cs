using Microsoft.AspNetCore.Identity;
using System;

namespace Application.Models
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
    }

}
