import React, { Component } from 'react';
import logo from "../static/images/logo/logo.svg"

export class Header extends Component {
    render () {
        return (
            <header className="ud-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <a className="navbar-brand" href="index.html">
                                    <img src={logo} alt="Logo" />
                                </a>
                                <button className="navbar-toggler">
                                    <span className="toggler-icon"> </span>
                                    <span className="toggler-icon"> </span>
                                    <span className="toggler-icon"> </span>
                                </button>

                                <div className="navbar-collapse">
                                    <ul id="nav" className="navbar-nav mx-auto">
                                        <li className="nav-item"><a className="ud-menu-scroll" href="/">Home</a></li>
                                        <li className="nav-item"><a className="ud-menu-scroll" href="/about">About</a></li>
                                        <li className="nav-item"><a className="ud-menu-scroll" href="/contact">Contact</a></li>
                                    </ul>
                                </div>

                                <div className="navbar-btn d-none d-sm-inline-block">
                                    <a href="/auth/login" className="ud-main-btn ud-login-btn">Sign In</a>
                                    <a className="ud-main-btn ud-white-btn" href="/auth/register"> Sign Up</a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}