import { JwtInterceptor } from './JwtInterceptor';

export class AppointmentService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  updateAppointment = async () => {
    return "Updated event";
  }

  deleteAppointment = async () => {
    return "Deleted event";
  }

  createAppointment = async (name, calendarId, start, end, editable, attendees) => {
    const res = await this.interceptor.post('/api/appointment/create', 
    {
      name: name,
      calendarId: calendarId,
      start: start,
      end: end,
      editable: editable,
      attendees: attendees
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

  getAppointments = async () => {
    const res = await this.interceptor.get('/api/appointment/list', {},
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