import React, { Component } from "react"
import { Link } from "react-router-dom";

export class RegisterOption extends Component {
    render () {
        return (
            <div className="text-center text-muted mt-3">
                Don't have account yet? {" "}
                <Link className="text-link" to="/auth/register">
                    Register{" "}
                </Link>
            </div>
        )
    }
}
