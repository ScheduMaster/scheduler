import React, { Component } from "react";
import dotnet from '../static/hero/dotnet.svg';
import react from '../static/hero/react.svg';
import sqlserver from '../static/hero/sqlserver.svg';
import material from '../static/hero/material.svg';
import shape from '../static/hero/dotted-shape.svg';
import hero from '../static/hero/hero.png';

export class Hero extends Component {
    render () {
        return (
            <section className="ud-hero" id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-hero-content wow fadeInUp" data-wow-delay=".2s">
                                <h1 className="ud-hero-title">
                                    Open-Source Web Application for Startup, Personal, and More
                                </h1>
                                <p className="ud-hero-desc">
                                    The Appointment Scheduler is a web application that provides 
                                    a platform for users to easily manage their meeting appointments.
                                </p>
                                <ul className="ud-hero-buttons">
                                    <li>
                                        <a href="/auth/login" rel="nofollow noopener" className="ud-main-btn ud-white-btn">Trial Now</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/Blue-Pheasant/scheduler" rel="nofollow noopener" className="ud-main-btn ud-link-btn">
                                            Learn More<i className="lni lni-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="ud-hero-brands-wrapper wow fadeInUp" data-wow-delay=".3s">
                                <img src={dotnet} alt=".Net" width={50} style={{ margin: '5px' }}/>
                                <img src={react} alt="React" width={40} style={{ margin: '5px' }}/>
                                <img src={sqlserver} alt="SQL Server" width={40} style={{ margin: '5px' }}/>
                                <img src={material} alt="Material UI" width={40} style={{ margin: '5px' }}/>
                            </div>
                            <div className="ud-hero-image wow fadeInUp" data-wow-delay=".25s">
                                <img src={hero} alt="hero-image" />
                                <img
                                    src={shape}
                                    alt="shape"
                                    className="shape shape-1"
                                />
                                <img
                                    src={shape}
                                    alt="shape"
                                    className="shape shape-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}