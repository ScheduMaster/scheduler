import { Component } from 'react';
import React  from 'react';

// Components import
import { Header } from './components/Header'

// Import style
import './static/css/ud-styles.css';
import './static/css/lineicons.css'

export class Home extends Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
      </>
    );
  }
}
