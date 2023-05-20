import { JwtInterceptor } from './JwtInterceptor';

export class CalendarService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  updateCalendar = async () => {
    return "Updated Calendar";
  }

  deleteCalendar = async () => {
    return "Deleted Calendar";
  }

  createCalendar = async (name, backgroundColor, borderColor, dragBackgroundColor) => {
    const res = await this.interceptor.post('/api/calendar/create', 
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

    if (!res.ok) {
      const responseJson = await res.json();
      throw new Error(JSON.stringify(responseJson));
    }
    
    const data = await res.json();
    return data;
  }

  getCalendars = async () => {
    const res = await this.interceptor.get('/api/calendar/list', {},
    {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      const responseJson = await res.json();
      throw new Error(JSON.stringify(responseJson));
    }
      
    const data = await res.json();
    return data;
  }
}