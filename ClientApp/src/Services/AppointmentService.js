import { JwtInterceptor } from './JwtInterceptor';

export class AppointmentService {
  constructor() {
    this.interceptor = new JwtInterceptor();
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

  updateAppointment = async (appointmentId, changes) => {
    const updateData = {};

    if (changes.start) {
      updateData.start = changes.start.d.d;
    }

    if (changes.end) {
      updateData.end = changes.end.d.d;
    }

    if (changes.title) {
      updateData.name = changes.title;
    }

    if (changes.calendarId) {
      updateData.calendarId = changes.calendarId;
    }

    const res = await this.interceptor.patch(`/api/appointment/update/${appointmentId}`, updateData,
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