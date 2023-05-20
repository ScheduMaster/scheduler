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

        public async Task<Calendar> CreateCalendar(Guid userId, CreateCalendarModel model)
        {
            // Create a new user model with the data from the CreateCalendarModel
            Calendar createdCalendar = new Calendar 
            {
                UserId = userId,
                Name = model.Name,
                BackgroundColor = model.BackgroundColor,
                BorderColor = model.BorderColor,
                DragBackgroundColor = model.DragBackgroundColor
            };

            // Call the dbContext to create the calendar
            _context.Calendar.Add(createdCalendar);
            await _context.SaveChangesAsync();

            return createdCalendar;
        }

        public async Task<Calendar> UpdateCalendarAsync(Calendar calendarToUpdate, UpdateCalendarModel model)
        {
            // Update the calendar's properties
            if (!string.IsNullOrEmpty(model.Name) && calendarToUpdate.Name != model.Name)
            {
                calendarToUpdate.Name = model.Name;
            }

            if (!string.IsNullOrEmpty(model.BackgroundColor) && calendarToUpdate.BackgroundColor != model.BackgroundColor)
            {
                calendarToUpdate.BackgroundColor = model.BackgroundColor;
            }

            if (!string.IsNullOrEmpty(model.BorderColor) && calendarToUpdate.BorderColor != model.BorderColor)
            {
                calendarToUpdate.BorderColor = model.BorderColor;
            }

            if (!string.IsNullOrEmpty(model.DragBackgroundColor) && calendarToUpdate.DragBackgroundColor != model.DragBackgroundColor)
            {
                calendarToUpdate.DragBackgroundColor = model.DragBackgroundColor;
            }

            // Call the Calendar Context to update the calendar
            _context.Calendar.Update(calendarToUpdate);
            await _context.SaveChangesAsync();

            return calendarToUpdate;
        }

        public async Task<bool> DeleteCalendarAsync(Calendar deleteCalendar)
        {
            // Call the userContext to delete the user
            _context.Calendar.Remove(deleteCalendar);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public List<Calendar> GetCalendars(Guid userId)
        {
            // Call the Calendar Context to get the Calendars
            List<Calendar> calendars = _context.Calendar.Where(calendar => calendar.UserId == userId).ToList();
            
            return calendars;
        }

        public Calendar GetCalendar(int id)
        {
            // Get the calendar from the database
            Calendar calendar = _context.Calendar.SingleOrDefault(calendar => calendar.Id == id);

            // Check if the calendar exists
            if (calendar == null)
            {
                return null;
            }

            return calendar;
        }
    }
}
