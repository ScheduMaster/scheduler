using Application.Data.Entities;
using System.Threading.Tasks;
using Application.Models.Requests;
using System.Collections.Generic;
using System;

namespace Application.Services
{
    public interface ICalendarService
    {
        Task<Calendar> CreateCalendar(Guid userId, CreateCalendarModel model);
        Task<Calendar> UpdateCalendarAsync(Calendar calendar, UpdateCalendarModel model);
        Task<bool> DeleteCalendarAsync(Calendar calendar);
        List<Calendar> GetCalendars(Guid userId);
        Calendar GetCalendar(int id);
    }

}