import React from "react";
import AuthenticationComponent from "./AuthenticationComponent";

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = (this.props.user && this.props.user.displayName) || "guest";
    return (
      <AuthenticationComponent
        isAuthenticated={!!this.props.user}
        name={name}
        login={this.props.login}
        logout={this.props.logout}
      />
    );
  }
}