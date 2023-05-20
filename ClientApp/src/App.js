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
import { Calendar } from './pages/app/pages/calendar/Calendar';
import { Scheduler } from './pages/app/pages/scheduler/Scheduler';
import { UpdateProfile } from './pages/app/pages/profile/UpdateProfile';
import { CreateAccount } from './pages/app/pages/user/CreateAccount';
import { Users } from './pages/app/pages/user/Users';
import { UpdateUserAccount } from './pages/app/pages/user/UpdateUserAccount';
import { ResetUserPassword } from './pages/app/pages/user/ResetUserPassword';
import { CreateCalendar } from './pages/app/pages/calendar/CreateCalendar';
import { Calendars } from './pages/app/pages/calendar/Calendars';

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
              <AppRoute exact path="/app/profile" component={UpdateProfile} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/user/list" component={Users} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/user/new" component={CreateAccount} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/user/update/:id" component={UpdateUserAccount} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/user/reset-password/:id" component={ResetUserPassword} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/calendar/new" component={CreateCalendar} layout={Application} type="authenticated" />
              <AppRoute exact path="/app/calendar/list" component={Calendars} layout={Application} type="authenticated" />
            </Switch>
        </Router>
      </AuthContextProvider>
    );
  }
}