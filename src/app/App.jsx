import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import Authentication from "../authentication/Authentication";
import Teams from "../teams/Teams";
import Requests from "../requests/Requests";
import Members from "../members/Members";
import Sprints from "../sprints/Sprints";
import Waste from "../waste/Waste";
import GoBackWrapper from "../navigation/GoBackWrapper";

const TEAMS = "TEAMS";
const REQUESTS = "REQUESTS";
const MEMBERS = "MEMBERS";
const SPRINTS = "SPRINTS";
const WASTE = "WASTE";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService(user => {
      this.setState({ user: user });
    });
    this.state = {
      user: this.authenticationService.getCurrentUser(),
      activePage: TEAMS
    };
  }

  onShowSprints = id => {
    this.setState({ activePage: SPRINTS, teamId: id });
  };

  onShowRequests = id => {
    this.setState({ activePage: REQUESTS, teamId: id });
  };

  onShowMembers = id => {
    this.setState({ activePage: MEMBERS, teamId: id });
  };

  onShowWaste = id => {
    this.setState({ activePage: WASTE, sprintId: id });
  };

  render() {
    const name = (this.state.user && this.state.user.displayName) || "guest";
    const isAuthenticated = !!this.state.user;
    return (
      <div>
        <Authentication
          isAuthenticated={isAuthenticated}
          name={name}
          login={this.authenticationService.login}
          logout={this.authenticationService.logout}
        />
        {isAuthenticated &&
          <div>
            {this.state.activePage === TEAMS &&
              <Teams
                user={this.state.user.uid}
                onShowSprints={this.onShowSprints}
                onShowRequests={this.onShowRequests}
                onShowMembers={this.onShowMembers}
              />}
            {this.state.activePage === REQUESTS &&
              <GoBackWrapper
                onGoBack={() =>
                  this.setState({ activePage: TEAMS, teamId: null })}
              >
                <Requests />
              </GoBackWrapper>}
            {this.state.activePage === MEMBERS &&
              <GoBackWrapper
                onGoBack={() =>
                  this.setState({ activePage: TEAMS, teamId: null })}
              >
                <Members />
              </GoBackWrapper>}
            {this.state.activePage === SPRINTS &&
              <GoBackWrapper
                onGoBack={() =>
                  this.setState({ activePage: TEAMS, teamId: null })}
              >
                <Sprints onShowWaste={this.onShowWaste} />
              </GoBackWrapper>}
            {this.state.activePage === WASTE &&
              <GoBackWrapper
                onGoBack={() =>
                  this.setState({ activePage: SPRINTS, sprintId: null })}
              >
                <Waste />
              </GoBackWrapper>}
          </div>}
      </div>
    );
  }
}
