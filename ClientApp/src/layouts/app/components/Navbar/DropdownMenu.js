import React, { Component } from "react";
import { DropdownItem } from "./DropdownItem";

export class DropdownMenu extends Component {
    // constructor(props) {
    //     super(props);
    //     const { dropdownsData } = props;
    
    //     const dropdownsMenu = [];
    //     for (let i = 0; i < dropdownsData.length; i += 2) {
    //       const chunk = dropdownsData.slice(i, i + 2);
    //       dropdownsMenu.push(chunk);
    //     }
    
    //     this.state = { dropdownsMenu };
    // }

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