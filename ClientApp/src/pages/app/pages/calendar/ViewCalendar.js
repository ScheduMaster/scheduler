import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import CalendarDetail from "../../components/CalendarDetail";

export class ViewCalendar extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Calendar" title="View calendar"/>
                <div className="page-body">
                    <div className="container-xl">
                        <CalendarDetail />
                    </div>
                </div>
            </>
        )
    }
}