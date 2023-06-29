import { JwtInterceptor } from './JwtInterceptor';

export class InvitationService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  generateInvitation = async (appointmentId) => {
    const data = await this.interceptor.post(`/api/invitation/generate`, { appointmentId }, {});
    return data;
  }

  getInvitation = async (appointmentId) => {
    const data = await this.interceptor.get(`/api/invitation/fetch/${appointmentId}`, {}, {});
    return data;
  }

  checkInvitation = async (invitationId) => {
    const data = await this.interceptor.post(`/api/invitation/check`, { invitationId }, {});
    return data;
  }

  acceptInvitation = async (invitationId) => {
    const data = await this.interceptor.get(`/api/invitation/accept/${invitationId}`, {}, {});
    return data;
  }

  sendInvitation = async (userId, appointmentId) => {
    const data = await this.interceptor.post(`/api/invitation/send`, { userId, appointmentId }, {});
    return data;
  }

  joinInvitation = async (invitationId) => {
    const data = await this.interceptor.get(`/api/invitation/join/${invitationId}`, {}, {});
    return data;
  }
}