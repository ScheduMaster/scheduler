import React, { Component } from "react";

export class NotificationContent extends Component {
    render () {
        return (
            <div className="list-group-item">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <span className="status-dot status-dot-animated bg-red d-block" />
                    </div>
                    <div className="col text-truncate">
                        <a href="#" className="text-body d-block">{this.props.title}</a>
                        <div className="d-block text-muted text-truncate mt-n1">
                           {this.props.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}