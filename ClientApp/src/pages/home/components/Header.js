import React, { Component } from 'react';
import logo from "../static/logo/calendar.svg"

export class Header extends Component {
  scrollToNode = (section) => {
    this.props.onScrollToSection(section);
  };

  scrollToPosition = (value) => {
    this.props.onScrollToPosition(value);
  };

  render () {
    return (
      <header className="ud-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="/">
                  <img src={logo} alt="Logo" width={60}/>
                </a>
                <button className="navbar-toggler">
                  <span className="toggler-icon"> </span>
                  <span className="toggler-icon"> </span>
                  <span className="toggler-icon"> </span>
                </button>

                <div className="navbar-collapse">
                  <ul id="nav" className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <a className="ud-menu-scroll" href="/">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="ud-menu-scroll" href="/app">
                        App
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="ud-menu-scroll" href="#feature" onClick={() => this.scrollToPosition(1100)}>
                        Features
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="ud-menu-scroll" href="#about"  onClick={() => this.scrollToNode('about-section')}>
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="ud-menu-scroll" href="#fqa"  onClick={() => this.scrollToPosition(2750)}>
                        FQA
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="ud-menu-scroll" href="#contact"  onClick={() => this.scrollToNode('contact-section')}>
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="navbar-btn d-none d-sm-inline-block">
                  <a href="/auth/login" className="ud-main-btn ud-login-btn">Sign In</a>
                  <a className="ud-main-btn ud-white-btn" href="/auth/register"> Sign Up</a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}