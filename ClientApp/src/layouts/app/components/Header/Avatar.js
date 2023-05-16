import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { UserService } from "../../../../services/UserService";

export class Avatar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            redirectToReferrer: false
        };
        this.userService = new UserService();
    }

    handleLogoutClick = async (event) => {
        event.preventDefault();
        await this.userService.logout();
        this.setState({ redirectToReferrer: true });
    }

    render () {
        const {  redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to="/auth/login" />;
        }

        return (
            <div className="nav-item dropdown">
                <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                    <span className="avatar avatar-sm" style={{ backgroundImage: "url(/images/layouts/app/Header/avatar.jpg)"}}/>
                    <div className="d-none d-xl-block ps-2">
                        <div>{this.props.name}</div>
                        <div className="mt-1 small text-muted">{this.props.role}</div>
                    </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    {this.props.dropdowns.map((dropdown, index) => {
                        return (
                            <a href={dropdown.href} key={index} className="dropdown-item">{dropdown.name}</a>
                        )
                    })}
                    <div className="dropdown-divider"/>
                    <a href="#" className="dropdown-item" onClick={this.handleLogoutClick}>Logout</a>
                </div>
            </div>
        )
    }
}