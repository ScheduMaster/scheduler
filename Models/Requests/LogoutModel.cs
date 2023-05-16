using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class LogoutModel
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}