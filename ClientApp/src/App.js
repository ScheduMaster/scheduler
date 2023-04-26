import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route as DefaultRoute } from 'react-router-dom'

// Layouts
import { Layout } from './pages/Layout';
import { Auth } from './layouts/auth/Auth';
import { Home } from './layouts/home/Home';

import { FetchData } from './pages/FetchData';
import { Counter } from './pages/Counter';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} layout={Home} />
          <Route path="/counter" component={Counter} layout={Layout} />
          <Route path="/fetch-data" component={FetchData} layout={Layout} />
          <Route path="/auth/login" component={LoginPage} layout={Auth} />
          <Route path="/auth/register" component={RegisterPage} layout={Auth} />
          <Route path="/auth/forgot-password" component={ForgotPassword} layout={Auth} />
        </Switch>
      </Router>
    );
  }
}

class DefaultLayout extends Component {
  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

class Route extends Component {
  render() {
    const { component: Component, layout: Layout = DefaultLayout, ...rest } =
      this.props;
    return (
      <DefaultRoute
        {...rest}
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    );
  }
}
