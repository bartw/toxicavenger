import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import TeamService from "../services/TeamService";
import Authentication from "../authentication/Authentication";
import Teams from "../teams/Teams";
import Requests from "../requests/Requests";
import Sprints from "../sprints/Sprints";
import WasteItems from "../wasteItems/WasteItems";
import GoBackWrapper from "../navigation/GoBackWrapper";

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

    onShowTeamMembers = id => {
    this.setState({ showTeamMembers: id });
  };

  onSetSelectedSprint = id => {
    this.setState({ selectedSprint: id });
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
    const showTeams = isAuthenticated && !this.state.selectedTeam && !this.state.showTeamRequests && !this.state.showTeamMembers && !this.state.selectedSprint;
    const showRequests = isAuthenticated && !this.state.selectedTeam && this.state.showTeamRequests && !this.state.showTeamMembers && !this.state.selectedSprint;
    const showMembers = isAuthenticated && !this.state.selectedTeam && !this.state.showTeamRequests && this.state.showTeamMembers && !this.state.selectedSprint;
    const showSprints = isAuthenticated && this.state.selectedTeam && !this.state.showTeamRequests && !this.state.showTeamMembers && !this.state.selectedSprint;
    const showWasteItems = isAuthenticated && this.state.selectedTeam && !this.state.showTeamRequests && !this.state.showTeamMembers && this.state.selectedSprint;
    return (
      <div>
        <Authentication
          isAuthenticated={isAuthenticated}
          name={name}
          login={this.authenticationService.login}
          logout={this.authenticationService.logout}
        />
        {showTeams &&
          <Teams
            uid={this.state.user.uid}
            teams={this.state.teams}
            onSetSelected={this.onSetSelectedTeam}
            onJoin={this.onJoinTeam}
            onShowRequests={this.onShowTeamRequests}
            onDelete={this.onDeleteTeam}
            onAdd={this.onAddTeam}
          />}
        {showRequests &&
          <GoBackWrapper onGoBack={() => this.setState({ showTeamRequests: null })}>
            <Requests/>
          </GoBackWrapper>}
        {showMembers &&
          <GoBackWrapper onGoBack={() => this.setState({ showTeamMembers: null })}>
            <Members/>
          </GoBackWrapper>}
        {showSprints &&
          <GoBackWrapper onGoBack={() => this.setState({ selectedTeam: null })}>
            <Sprints/>
          </GoBackWrapper>}
        {showWasteItems &&
          <GoBackWrapper onGoBack={() => this.setState({ selectedSprint: null })}>
            <WasteItems/>
          </GoBackWrapper>}
      </div>
    );
  }
}
