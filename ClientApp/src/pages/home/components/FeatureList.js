import React, { Component } from "react";
import { Feature } from "./Feature";

export class FeatureList extends Component {
    render () {
        return (
            <section id="features" className="ud-features">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-section-title">
                                <span>Features</span>
                                <h2>Main Features of Play</h2>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available but
                                    the majority have suffered alteration in some form.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.props.features.map((feature, index) => (
                            <Feature
                                key={index}
                                title={feature.title}
                                desc={feature.desc}
                                link={feature.link}
                            />
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}