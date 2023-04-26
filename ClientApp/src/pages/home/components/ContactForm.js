import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap';

export class ContactForm extends Component {
    render () {
        return (
            <div className="ud-contact-form-wrapper wow fadeInUp" data-wow-delay=".2s">
                <h3 className="ud-contact-form-title">Send us a Message</h3>
                <Form className="ud-contact-form" action="./" method="get" autoComplete="off">
                    <Form.Group className="ud-form-group">
                        <Form.Label htmlFor="fullName">Full Name*</Form.Label>
                        <Form.Control name="text" type="email" placeholder="Adam Gelius"/>
                    </Form.Group>
                    <Form.Group className="ud-form-group">
                        <Form.Label htmlFor="email">Email*</Form.Label>
                        <Form.Control name="email" type="email" placeholder="your@email.com"/>
                    </Form.Group>
                    <Form.Group className="ud-form-group">
                        <Form.Label htmlFor="phone">Phone*</Form.Label>
                        <Form.Control type="text" placeholder="+885 1254 5211 552" name="Phone"/>
                    </Form.Group>
                    <Form.Group className="ud-form-group">
                        <Form.Label htmlFor="message">Email address</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            type="text" 
                            placeholder="type your message here" 
                            defaultValue={""} 
                            rows={1}
                            name="message"
                        />
                    </Form.Group>
                    <Form.Group className="ud-form-group mb-0">
                        <Button type="submit" className="ud-main-btn">
                            Send Message
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}