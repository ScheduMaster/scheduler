import React, { Component } from "react";

export class ErrorList extends Component {
  render() {
    const { errors } = this.props;
    const isValid = (typeof errors === 'string' && errors.length > 2);

    return (
      <div className="alert alert-danger">
        {
          isValid ?
            Object.entries(JSON.parse(errors)).map(([key, value]) => (
              <p style={{ fontSize: "14px" }}  key={key}>
                <strong>{key}: </strong>
                {value}
              </p>
            ))
            : 
            <p style={{ fontSize: "14px" }}>
                <strong>Network: </strong>
                Can't connect to the server
              </p>
        }
      </div>
    );
  }
}
