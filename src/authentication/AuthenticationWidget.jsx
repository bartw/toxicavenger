import React from "react";
import AuthenticationService from "./AuthenticationService";

export default class AuthenticationWidget extends React.Component {
  constructor(props) {
    super(props);
    const onAuthenticationStateChanged = user => {
      this.setState({ user: user });
    };
    this.authenticationService = new AuthenticationService(
      onAuthenticationStateChanged
    );
    this.state = { user: this.authenticationService.getCurrentUser() };
  }

  render() {
    const name = (this.state.user && this.state.user.displayName) || "guest";
    const isAuthenticated = this.state.user;
    return (
      <div>
        <h2>
          Welcome {name}
        </h2>
        {!isAuthenticated &&
          <button onClick={this.authenticationService.login}>login</button>}
        {isAuthenticated &&
          <button onClick={this.authenticationService.logout}>logout</button>}
      </div>
    );
  }
}
