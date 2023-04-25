import React, { Component } from "react"
import { Link } from "react-router-dom";
import github from '../static/icons8-github.svg';
import google from '../static/icons8-google.svg';

export class LoginWithProvider extends Component {
    render () {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <Link className="btn w-100" to="#">
                            <img src={github} alt="Github"/>
                            Login with Github{" "}
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="btn w-100" to="#">
                        <img src={google} alt="Google" height={32} width={32}/>
                            Login with Google{" "}
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
