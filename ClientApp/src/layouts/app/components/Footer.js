import React, { Component } from "react";
import { Item } from "./Footer/Item";
import sponsor from "../static/Footer/sponsor.svg"

export class Footer extends Component {
    render () {
        return (
            <footer className="footer footer-transparent d-print-none">
                <div className="container-xl">
                    <div className="row text-center align-items-center flex-row-reverse">
                        <div className="col-lg-auto ms-lg-auto">
                            <ul className="list-inline list-inline-dots mb-0">
                                {this.props.footersData.map((footer, index) => {
                                    return (
                                        <Item key={index} href={footer.href} name={footer.name}/>
                                    )
                                })}
                                <li className="list-inline-item">
                                    <a href="https://github.com/sponsors/codecalm" className="link-secondary" rel="noopener">
                                        <img src={sponsor} alt="Sponsor"/>
                                        Sponsor
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                            <ul className="list-inline list-inline-dots mb-0">
                                <li className="list-inline-item">
                                    Copyright © 2023
                                    <a href="." className="link-secondary">
                                        Scheduling Appointment 
                                    </a>
                                    . All rights reserved.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}