import React, { Component } from "react";
import brand from '../static/hero/brand.svg';
import shape from '../static/hero/dotted-shape.svg';
import hero from '../static/hero/hero-image.svg';

export class Hero extends Component {
    render () {
        return (
            <section className="ud-hero" id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-hero-content wow fadeInUp" data-wow-delay=".2s">
                                <h1 className="ud-hero-title">
                                    Open-Source Web Template for SaaS, Startup, Apps, and More
                                </h1>
                                <p className="ud-hero-desc">
                                    Multidisciplinary Web Template Built with Your Favourite
                                    Technology - HTML Bootstrap, Tailwind and React NextJS.
                                </p>
                                <ul className="ud-hero-buttons">
                                    <li>
                                        <a href="#" rel="nofollow noopener" target="_blank" className="ud-main-btn ud-white-btn">Download Now</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/uideck/play-bootstrap" rel="nofollow noopener" target="_blank" className="ud-main-btn ud-link-btn">
                                            Learn More<i className="lni lni-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="ud-hero-brands-wrapper wow fadeInUp" data-wow-delay=".3s">
                                <img src={brand} alt="brand" />
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