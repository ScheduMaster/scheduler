import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import HandleJoinInvitaion from "../../components/HandleJoinInvitaion";

export class JoinInvitation extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="Invitation" title="Join invitation"/>
                <div className="page-body">
                    <div className="container-xl">
                        <HandleJoinInvitaion />
                    </div>
                </div>
            </>
        )
    }
}