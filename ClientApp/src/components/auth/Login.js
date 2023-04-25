import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RegisterOption } from './components/RegisterOption';
import { LoginWithProvider } from './components/LoginWithProvider';
import eye from './static/icons-eye.svg';

export class LoginPage extends Component {
  render() {
    return (
        <>
          <div className="card card-md">
            <div className="card-body">
              <h2 className="h2 text-center mb-4">Login to your account</h2>
              <Form action="./" method="get" autoComplete="off" noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="your@email.com"/>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>
                    Password
                    <span className="form-label-description">
                      <a href="/auth/forgot-password">I forgot password</a>
                    </span>
                  </Form.Label>
                  <div className="input-group input-group-flat">
                    <Form.Control type="password" placeholder="Your password"/>
                    <span className="input-group-text">
                      <a href="#" className="link-secondary" title="Show password" data-bs-toggle="tooltip">
                        <img src={eye} alt="Show"/>
                      </a>
                    </span>
                  </div>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Check type="checkbox" label="Remember me on this device" />
                </Form.Group>
                <div className="form-footer">
                  <Button variant="primary" className="w-100">Sign in</Button>
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
