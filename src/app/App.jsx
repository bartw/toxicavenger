import React from "react";
import Header from "./Header";
import Home from "./Home";
import Content from "./Content";
import Teams from "../teams/Teams";
import Sprints from "../sprints/Sprints";
import Footer from "./Footer";
import AuthenticationService from "../services/AuthenticationService";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, ...rest }) =>
  <Route
    {...rest}
    render={props => (user ? <Component {...props} user={user} /> : <Home />)}
  />;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.authenticationService = new AuthenticationService(user => {
      this.setState({ user: user });
    });
    this.setState({ loading: false });
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
                <Route
                  path="/"
                  exact
                  render={() => <Home isAuthenticated={!!this.state.user} />}
                />
                <PrivateRoute
                  exact
                  path="/teams"
                  component={Teams}
                  user={this.state.user}
                />
                <PrivateRoute
                  exact
                  path="/teams/:team/sprints"
                  component={Sprints}
                  user={this.state.user}
                />
              </div>
              <Footer />
            </div>
          </Router>}
      </div>
    );
  }
}
