using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class ResetPasswordModel
    {
        [Required]
        public string NewPassword { get; set; }
    }
}