import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LoginOption } from './components/LoginOption';
import { ErrorList } from './components/ErrorList';

// Services
import { AuthService } from './services/AuthService';

export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreePolicy: false,
      error: '',
      redirectToReferrer: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.auth = new AuthService('/api');
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { firstName, lastName, email, password, confirmPassword, agreePolicy } = this.state;
      const data = await this.auth.register(firstName, lastName, email, password, confirmPassword, agreePolicy);

      localStorage.setItem('token', data.token);
      this.setState({ redirectToReferrer: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { firstName, lastName, email, password, confirmPassword, agreePolicy, redirectToReferrer, error } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/auth/login' } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <>
        <Form className="card card-md" autoComplete="on" onSubmit={this.handleFormSubmit}>
          <div className="card-body">
            <h2 className="h2 text-center mb-4">Create new account</h2>
            <div className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text"
                name="firstName"
                placeholder="Enter first name" 
                value={firstName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text"
                name="lastName"
                placeholder="Enter last name" 
                value={lastName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email"
                name="email"
                placeholder="Enter email" 
                value={email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group input-group-flat">
                <Form.Control 
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group input-group-flat">
                <Form.Control 
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password" 
                  autoComplete="off" 
                  value={confirmPassword}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <Form.Check>
                <Form.Check.Input 
                  type="checkbox"
                  name="agreePolicy"
                  value={agreePolicy}
                  onChange={this.handleInputChange}
                />
                <Form.Check.Label>Agree the <a href="/term" tabIndex="-1">terms and policy</a>.</Form.Check.Label>
              </Form.Check>
            </div>
            <div className="form-footer">
              {error ? <ErrorList errors={error}/> : ''}
              <Button type="submit" className="btn btn-primary w-100">Create new account</Button>
            </div>
          </div>
        </Form>
        <LoginOption/>
      </>
    );
  }
}
