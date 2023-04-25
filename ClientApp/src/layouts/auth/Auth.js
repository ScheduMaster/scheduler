import React, { Component } from 'react';
import '@tabler/core/dist/css/tabler.min.css';
import logo from './static/logo.svg';

export class Auth extends Component {

  render() {
    return (
      <div className='d-flex flex-column'>
        <div className="page page-center">
          <div className="container container-tight py-4">
            <div className="text-center mb-4">
              <a href="." className="navbar-brand navbar-brand-autodark">
                <img src={logo} height="36" alt="Logo" />  
              </a>
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
