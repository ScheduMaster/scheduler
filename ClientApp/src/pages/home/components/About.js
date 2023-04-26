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
                                <h2>Brilliant Toolkit to Build Nextgen Website Faster.</h2>
                                <p>
                                    The main ‘thrust’ is to focus on educating attendees on how to best
                                    protect highly vulnerable business applications with interactive
                                    panel discussions and roundtables led by subject matter experts.
                                </p>
                                <p>
                                    The main ‘thrust’ is to focus on educating attendees on how to best
                                    protect highly vulnerable business applications with interactive
                                    panel.
                                </p>
                                <a href="#" className="ud-main-btn">Learn More</a>
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