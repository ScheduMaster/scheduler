import React, { Component } from "react"
import { Link } from "react-router-dom";

export class LoginOption extends Component {
    render () {
        return (
            <div className="text-center text-muted mt-3">
                Have an Account?{" "}
                <Link className="text-link" to="/auth/login">
                    Login{" "}
                </Link>
            </div>
        )
    }
}
