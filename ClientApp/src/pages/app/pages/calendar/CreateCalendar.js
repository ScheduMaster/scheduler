import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { CreateCalendarFrom } from "../../components/CreateCalendarFrom";

export class CreateCalendar extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Calendar" title="Create new calendar"/>
                <div className="page-body">
                    <div className="container-xl">
                        <CreateCalendarFrom />
                    </div>
                </div>
            </>
        )
    }
}