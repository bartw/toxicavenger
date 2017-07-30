import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import MasterPage from "../page/MasterPage";

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
          <MasterPage
            user={this.state.user}
            login={this.authenticationService.login}
            logout={this.authenticationService.logout}
          />}
      </div>
    );
  }
}
