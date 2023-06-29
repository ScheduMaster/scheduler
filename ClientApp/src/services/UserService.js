import { JwtInterceptor } from './JwtInterceptor';
import Cookies from 'js-cookie';

export class UserService {
  constructor() {
    this.interceptor = new JwtInterceptor();
  }

  logout = async () => {
    const data = await this.interceptor.post('/api/auth/logout', { 
      refreshToken: Cookies.get('refreshToken')
    }, {});
    
    // Clear cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    return data;
  }

  getInfo = async () => {
    const data = await this.interceptor.get('/api/user/info')
    return data;
  }

  getProfile = async () => {
    const data = await this.interceptor.get('/api/user/profile')
    return data;
  }

  updateProfile = async (firstName, lastName, email, phoneNumber, address) => {
    const data = await this.interceptor.put('/api/user/profile', {
      firstName: firstName, 
      lastName: lastName, 
      email: email,
      phoneNumber: phoneNumber,
      address: address
    }, {});

    return data;
  }

  updateUserInfo = async (userId, firstName, lastName, email, phoneNumber, address, role) => {
    const data = await this.interceptor.put(`/api/user/update/${userId}`, {
      firstName: firstName, 
      lastName: lastName, 
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      role: role
    }, {});

    return data;
  }

  resetUserPassword = async (userId, passWord) => {
    const data = await this.interceptor.patch(`/api/user/reset-password/${userId}`, { newPassWord: passWord }, {});
    return data;
  }

  getUsers = async () => {
    const data = await this.interceptor.get('/api/user/list', {}, {});
    return data;
  }

  getUser = async (userId) => {
    const data = await this.interceptor.get(`/api/user/view/${userId}`, {}, {});
    return data;
  }

  createUser = async (firstName, lastName, email, passWord, role, address, phoneNumber) => {
    const data = await this.interceptor.post('/api/user/create', 
    { 
      firstName: firstName,
      lastName: lastName,
      email: email,
      passWord: passWord,
      role: role,
      address: address,
      phoneNumber: phoneNumber
    }, {});

    return data;
  }

  searchUsers = async (searchQuery, recordsPerPage, pageNumber) => {
    const data = await this.interceptor.post(`/api/user/search`, 
    { 
      searchQuery, recordsPerPage, pageNumber
    }, {});

    return data;
  }
}