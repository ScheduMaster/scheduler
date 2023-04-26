import React, { Component } from "react";
import { DropdownMenu } from "./DropdownMenu";

export class NavbarItem extends Component {
    render() {
        const { active, dropdown, title, icon, href, dropdownsData } = this.props;

        if (dropdown) {
            return (
                <li className={`nav-item dropdown ${active ? 'active' : ''}`}>
                    <a
                        className={`nav-link dropdown-toggle`}
                        href={href}
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                    >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"></span>
                            <img src={icon} alt={title}/>
                        <span className="nav-link-title">{title}</span>
                    </a>
                    <DropdownMenu dropdownsData={dropdownsData}/>
                </li>
            );
        } else {
          return (
                <li className={`nav-item ${active ? 'active' : ''}`}>
                    <a className="nav-link" href="./">
                        <span className="nav-link-icon d-md-none d-lg-inline-block"></span>
                            <img src={icon} alt={title}/>
                        <span className="nav-link-title">{title}</span>
                    </a>
                </li>
            );
        }
    }
}