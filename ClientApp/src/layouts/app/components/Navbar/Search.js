import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import search from "../../static/Navbar/search.svg";

export class Search extends Component {
    render () {
        return (
            <Form action="./" method="get" autoComplete="off" noValidate="">
                <div className="input-icon">
                    <span className="input-icon-addon">
                        <img src={search} alt="Search"/>
                    </span>
                    <Form.Control 
                        type="text" 
                        placeholder="Search…" 
                        aria-label="Search in website" 
                        defaultValue=""
                    />
                </div>
          </Form>
        )
    }
}