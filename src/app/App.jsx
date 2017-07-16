import React from "react";
import Header from "./Header";
import Public from "./Public";
import Content from "./Content";
import Footer from "./Footer";

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
        <Header
          user={this.state.user}
          onAuthenticationStateChanged={this.onAuthenticationStateChanged}
        />
        <div className="container">
          {!this.state.user && <Public />}
          {this.state.user && <Content user={this.state.user} />}
        </div>
        <Footer />
      </div>
    );
  }
}
