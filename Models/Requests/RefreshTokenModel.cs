using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class RefreshTokenModel
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}