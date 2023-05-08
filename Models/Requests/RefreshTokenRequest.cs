using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class RefreshTokenRequest
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}