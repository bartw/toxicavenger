import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import TeamService from "../services/TeamService";
import Authentication from "../authentication/Authentication";
import Teams from "../teams/Teams";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.authenticationService = new AuthenticationService(user => {
      this.setState({ user: user });
      this.teamService = new TeamService(teams => {
        this.setState({ teams: teams });
      });
    });
    this.state = {
      user: this.authenticationService.getCurrentUser(),
      teams: []
    };
  }

  onSetSelectedTeam = id => {
    this.setState({ selectedTeam: id });
  };

  onJoinTeam = id => {
    this.teamService.join(this.state.user.uid, id);
  };

  onShowTeamRequests = id => {
    this.setState({ showTeamRequests: id });
  };

  onDeleteTeam = id => {
    this.teamService.delete(this.state.user.uid, id);
  };

  onAddTeam = name => {
    this.teamService.add(this.state.user.uid, name);
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
          !this.state.selectedTeam &&
          !this.state.showTeamRequests &&
          <Teams
            uid={this.state.user.uid}
            teams={this.state.teams}
            onSetSelected={this.onSetSelectedTeam}
            onJoin={this.onJoinTeam}
            onShowRequests={this.onShowTeamRequests}
            onDelete={this.onDeleteTeam}
            onAdd={this.onAddTeam}
          />}
        {isAuthenticated &&
          this.state.showTeamRequests &&
          !this.state.selectedTeam &&
          <h3>Requests</h3>}
        {isAuthenticated &&
          !this.state.showTeamRequests &&
          this.state.selectedTeam &&
          <h3>Sprints</h3>}
      </div>
    );
  }
}
