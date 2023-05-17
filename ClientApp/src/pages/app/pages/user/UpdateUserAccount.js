import React, { Component } from "react";
import { PageHeader } from "../components/PageHeader";
import UpdateUserForm from "../components/UpdateUserForm";

export class UpdateUserAccount extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="User" title="Update user account"/>
                <div className="page-body">
                    <div className="container-xl">
                        <UpdateUserForm />
                    </div>
                </div>
            </>
        )
    }
}