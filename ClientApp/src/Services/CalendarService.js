import { JwtInterceptor } from './JwtInterceptor';

export class CalendarService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  updateCalendar = async (calendarId, name, backgroundColor, borderColor, dragBackgroundColor) => {
    const data = await this.interceptor.put(`/api/calendar/update/${calendarId}`, {
      name: name, 
      backgroundColor: backgroundColor, 
      borderColor: borderColor,
      dragBackgroundColor: dragBackgroundColor
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return data;
  }

  deleteCalendar = async (calendarId) => {
    const data = await this.interceptor.delete(`/api/calendar/delete/${calendarId}`, { }, 
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    return data;
  }

  getCalendar = async (calendarId) => {
    const data = await this.interceptor.get(`/api/calendar/view/${calendarId}`, { }, 
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    return data;
  }

  createCalendar = async (name, backgroundColor, borderColor, dragBackgroundColor) => {
    const data = await this.interceptor.post('/api/calendar/create', 
      { 
        name: name,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        dragBackgroundColor: dragBackgroundColor
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    return data;
  }

  getCalendars = async () => {
    const data = await this.interceptor.get('/api/calendar/list', {},
    {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return data;
  }
}