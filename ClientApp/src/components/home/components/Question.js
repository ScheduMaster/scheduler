import React, { Component } from "react";

export class Question extends Component {
    render () {
        return (
            <div className="ud-single-faq wow fadeInUp" data-wow-delay=".1s">
                <div className="accordion">
                    <button className="ud-faq-btn collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <span className="icon flex-shrink-0">
                            <i className="lni lni-chevron-down" />
                        </span>
                        <span>{this.props.question}</span>
                    </button>
                        <div id="collapseOne" className="accordion-collapse collapse">
                        <div className="ud-faq-body">{this.props.answer}</div>
                    </div>
                </div>
            </div>
        );
    }
}