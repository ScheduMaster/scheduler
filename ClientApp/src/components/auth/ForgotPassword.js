import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';
import mail from './static/icons-mail.svg';

export class ForgotPassword extends Component {
    render () {
        return (
            <>
                <Form className="card card-md" action="./" method="get" autoComplete="off" noValidate>
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Forgot password</h2>
                        <p className="text-muted mb-4">
                            Enter your email address and your password will be reset and emailed to you.
                        </p>
                        <div className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </div>
                        <div className="form-footer">
                            <Button variant="primary" className="w-100">
                                <img src={mail} alt="Mail" /> Send me new password
                            </Button>
                        </div>
                    </div>
                </Form>
                <div className="text-center text-muted mt-3">
                    Forget it, <a href="/auth/login">send me back</a> to the sign in screen.
                </div>
            </>
        )
    }
}