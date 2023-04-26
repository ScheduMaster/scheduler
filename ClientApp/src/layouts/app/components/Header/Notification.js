import React, { Component } from "react";
import { NotificationContent } from "./NotificationContent";
import bell from "../../static/Header/bell.svg";

export class Notification extends Component {
    render () {
        return (
            <div className="nav-item dropdown d-none d-md-flex me-3">
                <a href="#" className="nav-link px-0" data-bs-toggle="dropdown" tabIndex={-1} aria-label="Show notifications" aria-expanded="false">
                    <img src={bell} alt="bell"/>
                    <span className="badge bg-red" />
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Last updates</h3>
                        </div>
                        <div className="list-group list-group-flush list-group-hoverable">
                            {this.props.notifications.map((notification, index) => {
                                return (
                                    <NotificationContent 
                                        title={notification.title} 
                                        content={notification.content}
                                        key={index}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}