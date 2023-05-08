import React, { Component } from "react";
import { PageHeader } from "./components/PageHeader";
import { TuiCalendar } from "./components/TuiCalendar";

// Static data
import { initialCalendars, initialEvents, viewModeOptions } from "./data/calendar";

export class Calendar extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Overview" title="Calendar"/>
                <div className="page-body">
                    <div className="container-xl">
                        <TuiCalendar 
                            view={"month"}
                            initialCalendars={initialCalendars}
                            initialEvents={initialEvents}
                            viewModeOptions={viewModeOptions}
                        />
                    </div>
                </div>
            </>
        )
    }
}