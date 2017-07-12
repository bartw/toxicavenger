import React from "react";
import AuthenticationComponent from "./AuthenticationComponent";
import AuthenticationService from "../services/AuthenticationService";

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.authenticationService = new AuthenticationService(user => {
      this.setState({ user: user });
      this.props.onStateChanged(user ? user.uid : null);
    });
  }

  render() {
    const name = (this.state.user && this.state.user.displayName) || "guest";
    const isAuthenticated = !!this.state.user;
    return (
      <AuthenticationComponent
        isAuthenticated={isAuthenticated}
        name={name}
        login={this.authenticationService.login}
        logout={this.authenticationService.logout}
      />
    );
  }
}