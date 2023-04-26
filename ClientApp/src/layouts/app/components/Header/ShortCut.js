import React, { Component } from "react";

export class ShortCut extends Component {
    render () {
        return (
            <a href={this.props.href} className="btn" target="_blank" rel="noreferrer"> 
                <img src={this.props.icon} alt={this.props.name} width={24} height={24}/>
                {this.props.name}
            </a>
        )
    }
}