using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class CreateConnectionModel
    {
        [Required]
        public Guid PatnerId { get; set; }
        public string Message { get; set; }
    }
}