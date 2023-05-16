using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}