import { JwtInterceptor } from './JwtInterceptor';

export class InvitationService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  generateInvitation = async (appointmentId) => {
    const data = await this.interceptor.post(`/api/appointment/generate-invitation`, 
    {
      appointmentId: appointmentId
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return data;
  }

  getInvitation = async (appointmentId) => {
    const data = await this.interceptor.get(`/api/invitation/fetch/${appointmentId}`, {},
    {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return data;
  }

  checkInvitation = async (invitationId) => {
    const data = await this.interceptor.post(`/api/invitation/check`, 
    {
        invitationId: invitationId
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return data;
  }

  acceptInvitation = async (invitationId) => {
    const data = await this.interceptor.get(`/api/invitation/accept/${invitationId}`, {},
    {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return data;
  }
}