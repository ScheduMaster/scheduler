import React, { Component } from "react";
import { PageHeader } from "../../components/PageHeader";
import ResetPasswordForm from "../../components/ResetPasswordForm";

export class ResetUserPassword extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="User" title="Reset user password"/>
                <div className="page-body">
                    <div className="container-xl">
                        <ResetPasswordForm />
                    </div>
                </div>
            </>
        )
    }
}