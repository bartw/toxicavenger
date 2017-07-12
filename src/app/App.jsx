import React from "react";
import Authentication from "../authentication/Authentication";
import Content from "./Content";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAuthenticationStateChanged = user => {
    this.setState({ user: user });
  };

  render() {
    return (
      <div>
        <Authentication onStateChanged={this.onAuthenticationStateChanged} />
        {this.state.user && <Content user={this.state.user} />}
      </div>
    );
  }
}
