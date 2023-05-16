import React, { Component } from "react";
import { PageHeader } from "./components/PageHeader";
import { UpdateUserForm } from "./components/UpdateUserForm";

export class UpdateUser extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="User" title="Update profile"/>
                <div className="page-body">
                    <div className="container-xl">
                        <UpdateUserForm />
                    </div>
                </div>
            </>
        )
    }
}