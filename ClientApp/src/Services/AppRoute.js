import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from './AuthContext';

export class AppRoute extends Component {
  static contextType = AuthContext;
  
  render() {
    const { accessToken, refreshToken } = this.context;
    const { component: Component, layout: Layout, path: Path, ...rest } = this.props;
    const { type } = this.props;

    if (type === 'authenticated') {
      console.log((!accessToken || !refreshToken));
      if (!accessToken && !refreshToken) {
        return <Redirect to="/auth/login" />;
      }
      if (accessToken || refreshToken) {
        return <Route {...rest} render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )} />;
      }
    } else if (type === "non-authenticated") {
        return <Route {...rest} render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )} />;
    }
  }
}
