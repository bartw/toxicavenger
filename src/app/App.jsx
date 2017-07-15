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
      <div id="container">
        <h1>Toxic Avenger</h1>
        <Authentication
          user={this.state.user}
          onStateChanged={this.onAuthenticationStateChanged}
        />
        {this.state.user && <Content user={this.state.user} />}
        <footer>
          <p>
            Made by <a href="https://bartwijnants.be" target="_blank" rel="noopener">Bart Wijnants</a>
          </p>
          <p>
            <a href="https://github.com/bartw/toxicavenger" target="_blank" rel="noopener">Fork me</a>
          </p>
        </footer>
      </div>
    );
  }
}
