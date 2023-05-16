import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Services
import { AuthContextProvider } from './components/AuthContext';
import { AppRoute } from './components/AppRoute';

// Layouts
import { Auth } from './layouts/auth/Auth';
import { Home } from './layouts/home/Home';
import { Application } from './layouts/app/Application';

// Pages
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Calendar } from './pages/app/Calendar';
import { Scheduler } from './pages/app/Scheduler';
import { UpdateUser } from './pages/app/UpdateUser';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <AuthContextProvider>
        <Router forceRefresh={true}>
            <Switch>
              <AppRoute exact path="/" component={HomePage} layout={Home} type="non-authenticated"/>
              <AppRoute exact path="/auth/login" component={LoginPage} layout={Auth} type="non-authenticated"/>
              <AppRoute exact path="/auth/register" component={RegisterPage} layout={Auth} type="non-authenticated"/>
              <AppRoute exact path="/auth/forgot-password" component={ForgotPassword} layout={Auth} type="non-authenticated"/>
              <AppRoute exact path="/app" component={Calendar} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/scheduler" component={Scheduler} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/profile" component={UpdateUser} layout={Application} type="authenticated" />
            </Switch>
        </Router>
      </AuthContextProvider>
    );
  }
}