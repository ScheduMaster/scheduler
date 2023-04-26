import React, { Component } from "react";
import { PageHeader } from "./components/PageHeader";

export class Empty extends Component {
    render () {
        return (
            <>
                <PageHeader title="Empty page"/>
                <div className="page-body">
                    <div className="container-xl"></div>
                </div>
            </>
        )
    }
}