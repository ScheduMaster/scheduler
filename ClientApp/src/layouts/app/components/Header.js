import React, { Component } from "react";
import { Logo } from "./Header/Logo";
import { Notification } from "./Header/Notification";
import { ShortCutList } from "./Header/ShortCutList";
import { Avatar } from "./Header/Avatar";

export class Header extends Component {
    render () {

        return (
            <header className="navbar navbar-expand-md navbar-light d-print-none">
                <div className="container-xl">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Logo component */}
                    <Logo src={this.props.logo.src} name={this.props.logo.name}/>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="nav-item d-none d-md-flex me-3">
                            {/* ShortcutList compoent */}
                            <ShortCutList shortcutsData={this.props.shortcutsData}/>
                        </div>
                        <div className="d-none d-md-flex">
                            {/* Notification component */}
                            <Notification notifications={this.props.notificationsData}/>
                        </div>
                        {/* Avatar component */}
                        <Avatar 
                            name={this.props.avatar.name}
                            role={this.props.avatar.role}
                            dropdowns={this.props.avatar.dropdowns}
                        />
                    </div>
                </div>
            </header>
        )
    }
}