import { JwtInterceptor } from './JwtInterceptor';
import Cookies from 'js-cookie';

export class UserService {
    constructor() {
      this.interceptor = new JwtInterceptor();
    }

    logout = async () => {
      const res = await this.interceptor.post('/api/auth/logout', { 
        refreshToken: Cookies.get('refreshToken')
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
      
      // Clear cookies
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      const data = await res.json();
      return data;
    }

    getInfo = async () => {
      const res = await this.interceptor.get('/api/user/info')

      if (!res.ok) {
        const responseJson = await res.json();
        console.log(responseJson);
        throw new Error(JSON.stringify(responseJson));
      }
        
      const data = await res.json();
      return data;
    }

    getProfile = async () => {
      const res = await this.interceptor.get('/api/user/profile')
      
      if (!res.ok) {
        const responseJson = await res.json();
        throw new Error(JSON.stringify(responseJson));
      }
        
      const data = await res.json();
      return data;
    }

    updateProfile = async (firstName, lastName, email, phoneNumber, address) => {
      const res = await this.interceptor.put('/api/user/profile', {
        firstName: firstName, 
        lastName: lastName, 
        email: email,
        phoneNumber: phoneNumber,
        address: address
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

    getUsers = async () => {
      const res = await this.interceptor.get('/api/user/list', {},
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

    getUser = async (email) => {
      const res = await this.interceptor.patch('/api/user/list', { email: email })
      
      if (!res.ok) {
        const responseJson = await res.json();
        throw new Error(JSON.stringify(responseJson));
      }
        
      const data = await res.json();
      return data;
    }
}