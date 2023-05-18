using Application.Data.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Data;
using Application.Models.Requests;
using System.Collections.Generic;

namespace Application.Services 
{
    public class CalendarService : ICalendarService
    {
        private readonly DBContext _context;

        public CalendarService(DBContext context)
        {
            _context = context;
        }
        
        public async Task<Calendar> CreateCalendar(User user, CreateCalendarModel model);
        {
            // Create a new user model with the data from the CreateCalendarModel
            Calendar createdCalendar = new Calendar 
            {
                UserId = user.Id,
                Name = model.Name,
                BackgroundColor = model.BackgroundColor,
                BorderColor = model.BorderColor,
                DragBackgroundColor = model.DragBackgroundColor
            };

            // Call the dbContext to create the calendar
            _context.Calendar.Add(createdCalendar);

            await _context.SaveChangesAsync();
            
            return newCalendar;
        }
    }
}
