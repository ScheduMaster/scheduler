import { JwtInterceptor } from './JwtInterceptor';

export class AppointmentService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  deleteAppointment = async () => {
    return "Deleted event";
  }

  createAppointment = async (name, calendarId, location, start, end, editable, attendees) => {
    const data = await this.interceptor.post('/api/appointment/create', 
    {
      name: name,
      calendarId: calendarId,
      location: location,
      start: start,
      end: end,
      editable: editable,
      attendees: attendees
    }, {});

    return data;
  }

  getAppointments = async (isAll) => {
    const options = { all: true, own: false };
    if (isAll) {
      options.all = true;
      options.own = false;
    } else {
      options.all = false;
      options.own = true;
    }

    const data = await this.interceptor.post('/api/appointment/list', options, {});
    return data;
  }

  getUpcommingAppointments = async () => {
    const data = await this.interceptor.get('/api/appointment/upcomming', {}, {});
    return data;
  }

  updateAppointment = async (appointmentId, changes) => {
    const updateData = {};

    if (changes.start) {
      updateData.start = changes.start.d.d;
    }

    if (changes.location) {
      updateData.location = changes.location;
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

    const data = await this.interceptor.patch(`/api/appointment/update/${appointmentId}`, updateData, {});

    return data;
  }

  getAppointment = async (appointmentId) => {
    const data = await this.interceptor.get(`/api/appointment/view/${appointmentId}`, {}, {});

    return data;
  }

  updateAppointmentByFrom = async (appointmentId, title, location,
    calendarId, start, end, editable, attendees) => {
    const data = await this.interceptor.patch(`/api/appointment/update/${appointmentId}`, 
    {
      title: title,
      location: location,
      calendarId: calendarId,
      start: start,
      end: end,
      editable: editable,
      attendees: attendees
    }, {});

    return data;
  }
}