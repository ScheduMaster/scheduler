import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import { UpdateProfileForm } from "../../components/UpdateProfileForm";

export class UpdateProfile extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="User" title="Update profile"/>
                <div className="page-body">
                    <div className="container-xl">
                        <UpdateProfileForm />
                    </div>
                </div>
            </>
        )
    }
}