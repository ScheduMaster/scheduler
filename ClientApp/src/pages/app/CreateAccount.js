import React, { Component } from "react";
import { PageHeader } from "./components/PageHeader";
import { CreateAccountForm } from "./components/CreateAccountForm";

export class CreateAccount extends Component {
    render () {
        return (
            <>
                <PageHeader preTitle="User" title="Create user account"/>
                <div className="page-body">
                    <div className="container-xl">
                        <CreateAccountForm />
                    </div>
                </div>
            </>
        )
    }
}