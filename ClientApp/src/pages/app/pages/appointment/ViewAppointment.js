import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import AppointmentDetail from "../../components/AppointmentDetail";

export class ViewAppointment extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Appoinemtn" title="View appointment"/>
                <div className="page-body">
                    <div className="container-xl">
                        <AppointmentDetail />
                    </div>
                </div>
            </>
        )
    }
}