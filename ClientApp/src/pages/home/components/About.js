import React, { Component } from "react";
import about from '../static/about/about-image.svg';

export class About extends Component {
    render () {
        return (
            <section id="about" className="ud-about">
                <div className="container">
                    <div className="ud-about-wrapper wow fadeInUp" data-wow-delay=".2s">
                        <div className="ud-about-content-wrapper">
                            <div className="ud-about-content">
                                <span className="tag">About Us</span>
                                <h2>Use TUI-Calendar UI component to build website faster.</h2>
                                <p>
                                    The Appointment Scheduler utilizes the Tui Calendar UI component, which 
                                    provides an intuitive and user-friendly interface for managing appointments.
                                </p>
                                <p>
                                    By combining ASP.NET and ReactJS, developers can build powerful, 
                                    scalable web applications that leverage the strengths of both technologies.
                                </p>
                                <a href="https://github.com/Blue-Pheasant/scheduler" className="ud-main-btn" rel="nofollow noopener" target="_blank">Learn More</a>
                            </div>
                        </div>
                        <div className="ud-about-image">
                            <img src={about} alt="about-image" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}