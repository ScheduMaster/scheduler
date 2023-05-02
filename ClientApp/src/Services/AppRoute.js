import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from './AuthContext';

export class AppRoute extends Component {
  static contextType = AuthContext;
  
  render() {
    const { accessToken, refreshToken } = this.context;
    const { component: Component, layout: Layout, path: Path, ...rest } = this.props;
    const { type } = this.props;

    const isLoginPath = Path === "/auth/login";

    if (type === 'authenticated') {
      console.log((!accessToken || !refreshToken) && !isLoginPath);
      if ((!accessToken || !refreshToken) && !isLoginPath) {
        return <Redirect to="/auth/login" />;
      }
      if (accessToken && refreshToken) {
        return <Route {...rest} render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )} />;
      }
    }
  }
}
