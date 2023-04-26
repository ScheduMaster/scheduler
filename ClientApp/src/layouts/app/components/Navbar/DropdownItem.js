import React, { Component } from "react";

export class DropdownItem extends Component {
    render () {
        return (
            <a className="dropdown-item" href={this.props.href}>
                {this.props.name}
            </a>
        )
    }
}