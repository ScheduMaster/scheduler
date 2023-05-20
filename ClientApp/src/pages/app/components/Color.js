import React, { Component } from "react";

export class Color extends Component {
  render () {
    const { value } = this.props;

    return (
      <div className="col-auto">
        <label className="form-colorinput">
          <input
            name="color"
            type="radio"
            defaultValue={value}
            className="form-colorinput-input"
          />
          <span 
            className="form-colorinput-color" 
            style={{ 
              backgroundColor: value,
              width: '30px',
              height: '20px',
            }}
          />
        </label>
      </div>
    )
  }
}