import React, { Component } from "react";
import { ContactForm } from "./ContactForm";

export class Contact extends Component {
    render () {
        return (
            <section id="contact" className="ud-contact">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-7">
                            <div className="ud-contact-content-wrapper">
                                <div className="ud-contact-title">
                                    <span>CONTACT US</span>
                                    <h2>
                                    Let’s talk about <br />
                                    Love to hear from you!
                                    </h2>
                                </div>
                                <div className="ud-contact-info-wrapper">
                                    <div className="ud-single-info">
                                        <div className="ud-info-icon">
                                            <i className="lni lni-map-marker" />
                                        </div>
                                        <div className="ud-info-meta">
                                            <h5>Our Location</h5>
                                            <p>Hong Bang University, Tan Binh, Ho Chi Minh</p>
                                        </div>
                                    </div>
                                    <div className="ud-single-info">
                                        <div className="ud-info-icon">
                                            <i className="lni lni-envelope" />
                                        </div>
                                        <div className="ud-info-meta">
                                            <h5>How Can We Help?</h5>
                                            <p>hoc1402@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <ContactForm/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}