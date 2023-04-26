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
                    {/* Logo component */}
                    <Logo src={this.props.logo.src} name={this.props.logo.name}/>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="d-none d-md-flex">
                            {/* ShortcutList compoent */}
                            <ShortCutList shortcutsData={this.props.shortcutsData}/>
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