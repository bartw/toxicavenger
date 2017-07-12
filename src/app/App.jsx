import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import Authentication from "../authentication/Authentication";
import Content from "./Content";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService(user => {
      this.setState({ user: user });
    });
    this.state = {
      user: this.authenticationService.getCurrentUser()
    };
  }

  render() {
    const name = (this.state.user && this.state.user.displayName) || "guest";
    const isAuthenticated = !!this.state.user;
    return (
      <div>
        <Authentication
          isAuthenticated={isAuthenticated}
          name={name}
          login={this.authenticationService.login}
          logout={this.authenticationService.logout}
        />
        {isAuthenticated && <Content user={this.state.user.uid} />}
      </div>
    );
  }
}
