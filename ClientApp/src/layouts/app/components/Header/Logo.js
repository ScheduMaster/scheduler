import React, { Component } from "react";

export class Logo extends Component {
    render () {
        return (
            <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                <a href="/">
                    <img
                        src={this.props.src}
                        width={110}
                        height={32}
                        alt={this.props.name}
                        className="navbar-brand-image"
                    />
                </a>
            </h1>
        )
    }
}