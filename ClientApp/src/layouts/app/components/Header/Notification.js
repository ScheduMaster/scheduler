import React, { Component } from "react";
import { NotificationContent } from "./NotificationContent";
import bell from "../../static/Header/bell.svg";

export class Notification extends Component {
  render () {
    const { notifications } = this.props;

    return (
      <div className="nav-item dropdown d-none d-md-flex me-3">
        <a className="nav-link px-0" data-bs-toggle="dropdown" tabIndex={-1} aria-label="Show notifications" aria-expanded="false">
          <img src={bell} alt="bell" width={20} height={20}/>
          {
            notifications.length > 0
              ? <span className="badge bg-red" />
              : <></>
          }
        </a>
        <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
          <div className="card">
            <div className="card-header">
              {
                notifications.length > 0 
                  ? <h3 className="card-title">Last updates</h3>
                  : <h3 className="card-title">No notice</h3>
              }
            </div>
            <div className="list-group list-group-flush list-group-hoverable">
              { 
                notifications.length > 0 
                  ? notifications.map((notification, index) =>(
                      <NotificationContent 
                        title={notification.title} 
                        content={notification.message}
                        isRead={notification.isRead}
                        url={notification.url}
                        key={index}
                      />
                  ))
                  : <></>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}