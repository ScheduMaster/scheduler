using System.Collections.Generic;

using System;

namespace Application.Data.Entities
{
    public class Calendar
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string BackgroundColor { get; set; }
        public string BorderColor { get; set; }
        public string DragBackgroundColor { get; set; }
    }
}
