import { AuthValidate } from './AuthValidate';
import Cookies from 'js-cookie';

export class AuthService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.validator = new AuthValidate();
  }

  login = async (email, password) => {
    // validate input
    this.validator.clearErrors();
    this.validator.validateEmail(email);
    this.validator.validateLoginPassword(password);

    // Call api
    if (this.validator.isValid()) {
      const res = await fetch(`${this.baseUrl ?? ''}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .catch(error => { throw new Error(JSON.stringify(error)); });

      return res;
    } else {
      const errors = this.validator.getErrors();
      throw new Error(JSON.stringify(errors));
    }
  }

  register = async (firstName, lastName, email, password, confirmPassword, agreePolicy) => {
    // validate input
    this.validator.clearErrors();
    this.validator.validateFirstName(firstName);
    this.validator.validateLastName(lastName);
    this.validator.validateEmail(email);
    this.validator.validateRegisterPassword(password);
    this.validator.validateConfirmPassword(password, confirmPassword);
    this.validator.validateAgreePolicy(agreePolicy);

    // Call api
    if (this.validator.isValid()) {
      const res = await fetch(`${this.baseUrl ?? ''}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      })
      .then(response => response.json())
      .catch(error => { throw new Error(JSON.stringify(error)) });

      return res;
    } else {
      const errors = this.validator.getErrors();
      throw new Error(JSON.stringify(errors));
    }
  }

  saveCookies = (data) => {
    Cookies.set('accessToken', data.accessToken.token, { expires: new Date(data.accessToken.expiresAt) });
    Cookies.set('refreshToken', data.refreshToken.token, { expires: new Date(data.refreshToken.expiresAt) });
  }
}