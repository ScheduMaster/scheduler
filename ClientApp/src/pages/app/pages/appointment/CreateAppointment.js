import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { CreateAppointmentForm } from "../../components/CreateAppointmentForm";

export class CreateAppointment extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Appointment" title="Create new appointment"/>
                <div className="page-body">
                    <div className="container-xl">
                        <CreateAppointmentForm />
                    </div>
                </div>
            </>
        )
    }
}