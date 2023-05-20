export class CalendarService {
    constructor() {
        this.interceptor = new JwtInterceptor();
    }

    updateEvent = async () => {
        return "Updated event";
    }

    deleteEvent = async () => {
        return "Deleted event";
    }

    createEvent = async () => {
      const res = await this.interceptor.post('/api/event/create', 
      {

      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return "Cretead event";
    }

    getEvents = async () => {
        return "Get all events";
    }

    getEvents = async (id) => {
        return `Get event has id: ${id}`;
    }
}