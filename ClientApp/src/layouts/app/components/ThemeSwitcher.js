import React, { Component } from 'react';

export class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);
    this.theme = 'tablerTheme';
    this.searchParams = new URLSearchParams(window.location.search);
    this.state = {
      currentTheme: this.searchParams.get('theme') || localStorage.getItem(this.theme) || 'light'
    };
  }

  componentDidMount() {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add('theme-' + this.state.currentTheme);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTheme !== this.state.currentTheme) {
      document.body.classList.remove('theme-' + prevState.currentTheme);
      document.body.classList.add('theme-' + this.state.currentTheme);
      localStorage.setItem(this.theme, this.state.currentTheme);
    }
  }

  render() {
    return null;
  }
}
