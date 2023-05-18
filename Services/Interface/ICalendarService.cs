using Application.Data.Entities;
using System.Threading.Tasks;
using Application.Models.Requests;
using System.Collections.Generic;

namespace Application.Services
{
    public interface ICalendarService
    {
        // Get data from user's appointment
        Task<Calendar> CreateCalendar(User user, CreateCalendarModel model);
    }

}