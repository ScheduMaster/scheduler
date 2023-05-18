using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class CreateCalendarModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string BackgroundColor { get; set; }
        [Required]
        public string BorderColor { get; set; }
        [Required]
        public string DragBackgroundColor { get; set; }
    }
}