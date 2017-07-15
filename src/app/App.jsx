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
        <header>
          <div className="container">
            <Authentication
              user={this.state.user}
              onStateChanged={this.onAuthenticationStateChanged}
            />
            <h1>Toxic Avenger</h1>
          </div>
        </header>
          <div className="container">
            {this.state.user && <Content user={this.state.user} />}
          </div>
        <footer>
          <div className="container">
            <p className="left">
              Made by{" "}
              <a href="https://bartwijnants.be" target="_blank" rel="noopener">
                Bart Wijnants
              </a>
            </p>
            <p className="right">
              <a
                href="https://github.com/bartw/toxicavenger"
                target="_blank"
                rel="noopener"
              >
                Fork me
              </a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
