import React, { Component } from 'react';

// Components import
import { Hero } from "./components/Hero";
import { FeatureList } from "./components/FeatureList";
import { About } from "./components/About";
import { FQAList } from "./components/FQAList";
import { Contact } from "./components/Contact";

// Import data
import { featuresData } from './data/features';
import { questionsData } from './data/questions';

export class HomePage extends Component {
  render() {
    return (
      <div className="landing-page">
        <Hero />
        <FeatureList features={featuresData}/>
        <About />
        <FQAList questions={questionsData}/>
        <Contact />
      </div>
    );
  }
}
