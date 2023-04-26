import React, { Component } from "react";
import { Search } from "./Navbar/Search";
import { NavbarItem } from "./Navbar/NavbarItem";

export class Navbar extends Component {
    render () {
        const { navbarsData } = this.props;
       
        return (
            <header className="navbar-expand-md">
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <div className="navbar navbar-light">
                    <div className="container-xl">
                        <ul className="navbar-nav">
                            {navbarsData.map((item, index) => {
                                return (
                                    <NavbarItem
                                        key={index}
                                        title={item.title}
                                        icon={item.icon}
                                        href={item.href}
                                        dropdown={item.dropdown}
                                        dropdownsData={item.dropdownsData}
                                    />
                                )
                            })}
                        </ul>
                        <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                            <Search />
                        </div>
                    </div>
                    </div>
                </div>
            </header>
        )
    }
}