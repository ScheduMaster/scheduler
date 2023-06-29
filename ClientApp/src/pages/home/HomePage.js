import React, { Component } from 'react';
import { Link } from 'react-scroll';

// Components import
import { Hero } from "./components/Hero";
import { FeatureList } from "./components/FeatureList";
import { About } from "./components/About";
import { FQAList } from "./components/FQAList";
import { Contact } from "./components/Contact";
import { Header } from './components/Header'

// Import data
import { featuresData } from './data/features';
import { questionsData } from './data/questions';

export class HomePage extends Component {
  onScrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  onScrollToPosition = (scrollValue) => {
    window.scrollTo({
      top: scrollValue,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <>
        <Header onScrollSection={this.onScrollToSection} onScrollToPosition={this.onScrollToPosition}/>
        <div className="landing-page">
          <Hero />
          <FeatureList features={featuresData} id="feature-section"/>
          <About id="about-section"/>
          <FQAList questions={questionsData} id="fqa-section"/>
          <Contact id="contact-section"/>
        </div>
      </>
    );
  }
}
