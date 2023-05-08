import React, { Component } from "react";
import { DropdownItem } from "./DropdownItem";

export class DropdownMenu extends Component {

    render () {
        const { dropdownsData } = this.props;

        return (
            <div className="dropdown-menu">
                <div className="dropdown-menu-columns">
                    {dropdownsData.map((dropdownColum, index) =>{
                        return (
                            <div className="dropdown-menu-column" key={index}>
                                {dropdownColum.map((item, index) => {
                                    return (
                                        <DropdownItem key={index} href={item.href} name={item.name}/>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}