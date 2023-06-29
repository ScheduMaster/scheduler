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
    }, {});
    
    return data;
  }

  deleteCalendar = async (calendarId) => {
    const data = await this.interceptor.delete(`/api/calendar/delete/${calendarId}`, {}, {});
    return data;
  }

  getCalendar = async (calendarId) => {
    const data = await this.interceptor.get(`/api/calendar/view/${calendarId}`, {}, {}); 
    return data;
  }

  createCalendar = async (name, backgroundColor, borderColor, dragBackgroundColor) => {
    const data = await this.interceptor.post('/api/calendar/create', 
      { 
        name: name,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        dragBackgroundColor: dragBackgroundColor
      }, {});
      
    return data;
  }

  getCalendars = async () => {
    const data = await this.interceptor.get('/api/calendar/list', {}, {});
    return data;
  }
}