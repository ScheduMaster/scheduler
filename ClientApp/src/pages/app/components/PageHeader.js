import React, { Component } from "react";

export class PageHeader extends Component {
    render () {
        return (
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <h2 className="page-title">{this.props.title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}