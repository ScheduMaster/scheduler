import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { LoginOption } from './components/LoginOption';

export class RegisterPage extends Component {

  render() {
    return (
      <>
        <Form className="card card-md" action="./" method="get" autoComplete="off" noValidate>
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Create new account</h2>
            <div className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </div>
            <div className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group input-group-flat">
                <Form.Control type="password" placeholder="Password" autoComplete="off" />
                <span className="input-group-text">
                  <a href="#" className="link-secondary" title="Show password" data-bs-toggle="tooltip">
                    
                  </a>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <Form.Check>
                <Form.Check.Input type="checkbox" />
                <Form.Check.Label>Agree the <a href="/term" tabIndex="-1">terms and policy</a>.</Form.Check.Label>
              </Form.Check>
            </div>
            <div className="form-footer">
              <Button type="submit" className="btn btn-primary w-100">Create new account</Button>
            </div>
          </div>
        </Form>
        <LoginOption/>
      </>
    );
  }
}
