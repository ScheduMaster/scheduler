import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { RegisterOption } from './components/RegisterOption';
import { LoginWithProvider } from './components/LoginWithProvider';
import { ErrorList } from '../../components/ErrorList';

// Services
import { AuthService } from './services/AuthService';

// Icons
import eye from './static/icons-eye.svg';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
      const { email, password } = this.state;
      const data = await this.auth.login(email, password);
      
      // Set cookies
      this.auth.saveCookies(data);
      this.setState({ redirectToReferrer: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { email, password, error, redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/app' } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
        <>
          <div className="card card-md">
            <div className="card-body">
              <h2 className="h2 text-center mb-4">Login to your account</h2>
              <Form onSubmit={this.handleFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email"
                    value={email}
                    placeholder="your@email.com"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Password
                    <span className="form-label-description">
                      <a href="/auth/forgot-password">I forgot password</a>
                    </span>
                  </Form.Label>
                  <div className="input-group input-group-flat">
                    <Form.Control 
                      type="password" 
                      placeholder="Your password"
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                    <span className="input-group-text">
                      <a className="link-secondary" title="Show password" data-bs-toggle="tooltip">
                        <img src={eye} alt="Show"/>
                      </a>
                    </span>
                  </div>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Check type="checkbox" label="Remember me on this device" />
                </Form.Group>
                <div className="form-footer">
                  {error ? <ErrorList errors={error}/> : ''}
                  <Button type="submit" variant="primary" className="w-100">Sign in</Button>
                </div>
              </Form>
            </div>
            <div className="hr-text">or</div>
            <LoginWithProvider/>
          </div>
          <RegisterOption/>
        </>
    );
  }
}
