import React from "react";
import Header from "./Header";
import Public from "./Public";
import Content from "./Content";
import Footer from "./Footer";
import AuthenticationService from "../services/AuthenticationService";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";

const Home = () =>
  <div>
    <h1>Toxic Avenger</h1>
    <Link to="/teams">Teams</Link>
  </div>;

const PrivateRoute = ({ component: Component, user, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      user
        ? <Component {...props} user={user} />
        : <Redirect
            to={{
              pathname: "/public",
              state: { from: props.location }
            }}
          />}
  />;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.authenticationService = new AuthenticationService(user => {
      this.setState({ loading: false, user: user });
    });
  }

  render() {
    return (
      <div>
        {this.state.loading && <div>Loading</div>}
        {!this.state.loading &&
          <Router>
            <div>
              <Header
                user={this.state.user}
                login={this.authenticationService.login}
                logout={this.authenticationService.logout}
              />
              <div className="container">
                <Route path="/" exact component={Home} />
                <PrivateRoute
                  exact
                  path="/teams"
                  component={Content}
                  isAuthenticated={this.state.user}
                  user={this.state.user}
                />
                <Route path="/public" component={Public} />
              </div>
              <Footer />
            </div>
          </Router>}
      </div>
    );
  }
  /*
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
  */
}
