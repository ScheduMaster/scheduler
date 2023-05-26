import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import HandleAcceptInvitaion from "../../components/HandleAcceptInvitaion";

export class AcceptInvitation extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Invitation" title="Accept invitation"/>
                <div className="page-body">
                    <div className="container-xl">
                        <HandleAcceptInvitaion />
                    </div>
                </div>
            </>
        )
    }
}