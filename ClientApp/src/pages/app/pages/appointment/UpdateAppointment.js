import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import UpdateAppointmentForm from "../../components/UpdateAppointmentForm";

export class UpdateAppointment extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Calendar" title="Update calendar"/>
                <div className="page-body">
                    <div className="container-xl">
                        <UpdateAppointmentForm />
                    </div>
                </div>
            </>
        )
    }
}