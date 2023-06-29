import React, { Component } from "react";
import { Question } from "./Question";
import shape from "../static/faq/shape.svg"

export class FQAList extends Component {
    render () {
        return (
            <section id="faq" className="ud-faq">
                <div className="shape">
                    <img src={shape} alt="shape" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ud-section-title text-center mx-auto">
                                <span>FAQ</span>
                                <h2>Any Questions? Answered</h2>
                                <p>
                                    These are common questions regarding meeting management systems
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.props.questions.map((chunk, index) => {
                            return (
                                <div className="col-lg-6" key={index}>
                                    {
                                        chunk.map((question, index) => {
                                            return (
                                                <Question
                                                    key={index}
                                                    question={question.question}
                                                    answer={question.answer}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        );
    }
}