using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class LogoutRequest
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}