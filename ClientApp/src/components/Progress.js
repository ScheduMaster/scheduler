import React, { Component } from "react";

export class Progress extends Component {
  render() {
    return (
      <div className="mb-3">
        <div className="progress">
          <div className="progress-bar progress-bar-indeterminate" />
        </div>
      </div>
    )
  }
}