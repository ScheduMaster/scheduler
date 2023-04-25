import React, { Component } from "react";

export class Feature extends Component {
    render () {
        return (
            <div className="col-xl-3 col-lg-3 col-sm-6">
                <div className="ud-single-feature wow fadeInUp" data-wow-delay=".1s">
                    <div className="ud-feature-icon">
                        <i className="lni lni-gift"></i>
                    </div>
                    <div className="ud-feature-content">
                        <h3 className="ud-feature-title">{this.props.title}</h3>
                        <p className="ud-feature-desc">{this.props.description}</p>
                        <a href={this.props.link} className="ud-feature-link">{this.props.linkText}</a>
                    </div>
                </div>
            </div>
        );
    }
}