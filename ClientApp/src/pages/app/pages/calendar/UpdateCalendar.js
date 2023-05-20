import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import UpdateCalendarForm from "../../components/UpdateCalendarForm";

export class UpdateCalendar extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Calendar" title="Update calendar"/>
                <div className="page-body">
                    <div className="container-xl">
                        <UpdateCalendarForm />
                    </div>
                </div>
            </>
        )
    }
}