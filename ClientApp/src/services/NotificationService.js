import { JwtInterceptor } from './JwtInterceptor';

export class NotificationService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  getNotification = async () => {
    const data = await this.interceptor.post(`/api/notification/get`, {}, {});
    return data;
  }
}