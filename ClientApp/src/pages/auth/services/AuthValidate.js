export class AuthValidate {
    constructor() {
      this.errors = {};
    }
  
    validateFirstName = (firstName) => {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!firstName.trim()) {
        this.errors["First name"] = 'First name is required';
      } else if (!nameRegex.test(firstName.trim())) {
        this.errors["First name"] = 'First name must contain only letters and spaces';
      }
    }

    validateLastName = (lastName) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (!lastName.trim()) {
          this.errors["Last name"] = 'Last name is required';
        } else if (!nameRegex.test(lastName.trim())) {
          this.errors["Last name"] = 'Last name must contain only letters and spaces';
        }
      }
  
    validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        this.errors["Email"] = 'Email is required';
      } else if (!emailRegex.test(email.trim())) {
        this.errors["Email"] = 'Invalid email address';
      }
    }
  
    validateRegisterPassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!password.trim()) {
        this.errors["Password"] = 'Password is required';
      } else if (!passwordRegex.test(password.trim())) {
        this.errors["Password"] = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }

    validateLoginPassword = (password) => {
      if (!password.trim()) {
        this.errors["Password"] = 'Password is required';
      }
    }
  
    validateConfirmPassword = (password, confirmPassword) => {
      if (password !== confirmPassword) {
        this.errors["Confirm password"] = 'Passwords do not match';
      }
    }
  
    validateAgreePolicy = (agreePolicy) => {
      if (!agreePolicy) {
        this.errors["Agree policy"] = 'You must agree out policy to continue'; 
      }
    }

    isValid = () => {
      return Object.keys(this.errors).length === 0;
    }
  
    getErrors = () => {
      return this.errors;
    }
  
    clearErrors = () => {
      this.errors = {};
    }
  }