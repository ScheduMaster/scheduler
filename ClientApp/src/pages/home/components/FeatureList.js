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
                                    Scheduling, cancelling, and sending invitations, users can efficiently 
                                    organize their appointments and stay on top of their schedule.
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
                            />
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}