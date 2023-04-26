import React, { Component } from "react";

export class Item extends Component {
    render () {
        return (
            <li className="list-inline-item">
                <a href={this.props.href} className="link-secondary">
                    {this.props.name}
                </a>
            </li>
        )
    }
}