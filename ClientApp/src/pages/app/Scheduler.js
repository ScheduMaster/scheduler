import React, { Component } from "react";
import { PageHeader } from "./components/PageHeader";
import { DataTable } from "./components/DataTable";

// Static data
import { entries, actions } from "./data/calendar";

export class Scheduler extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Upcoming appointments" title="Scheduler"/>
                <div className="page-body">
                    <div className="container-xl">
                        <DataTable entries={entries} actions={actions}/>
                    </div>
                </div>
            </>
        )
    }
}