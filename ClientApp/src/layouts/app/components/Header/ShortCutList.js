import React, { Component } from "react";
import { ShortCut } from "./ShortCut";

export class ShortCutList extends Component {
    render () {
        return (
            <div className="btn-list">
                {this.props.shortcutsData.map((shortcut, index) => {
                    return (
                        <ShortCut
                            key={index}
                            href={shortcut.href}
                            icon={shortcut.icon}
                            name={shortcut.name}
                        />
                    )
                })}
            </div>
        )
    }
}