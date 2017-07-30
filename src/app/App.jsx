import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import Content from "./Content";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.authenticationService = new AuthenticationService(user => {
      this.setState({ user: user, loading: false });
    });
  }

  render() {
    return (
      <div>
        {!this.state.loading &&
          <Content
            user={this.state.user}
            login={this.authenticationService.login}
            logout={this.authenticationService.logout}
          />}
      </div>
    );
  }
}
