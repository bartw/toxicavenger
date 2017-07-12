import React from "react";
import AuthenticationComponent from "./AuthenticationComponent";
import AuthenticationService from "../services/AuthenticationService";

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.authenticationService = new AuthenticationService(this.props.onStateChanged);
  }

  render() {
    const name = (this.props.user && this.props.user.displayName) || "guest";
    return (
      <AuthenticationComponent
        isAuthenticated={this.authenticationService.isAuthenticated()}
        name={name}
        login={this.authenticationService.login}
        logout={this.authenticationService.logout}
      />
    );
  }
}