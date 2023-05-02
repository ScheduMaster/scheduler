import React, { createContext, Component } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

export class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: Cookies.get("accessToken"),
      refreshToken: Cookies.get("refreshToken")
    };
    this.setToken = this.setToken.bind(this);
  }

  setToken(accessToken) {
    this.setState({ accessToken });
    Cookies.set("accessToken", accessToken);
  }

  render() {
    const { accessToken, refreshToken } = this.state;
    const { children } = this.props;

    return (
      <AuthContext.Provider value={{ accessToken, setToken: this.setToken, refreshToken }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
