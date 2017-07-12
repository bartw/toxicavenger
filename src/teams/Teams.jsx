import React from "react";
import TeamService from "../services/TeamService";
import TeamsComponent from "./TeamsComponent";

export default class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { teams: [] };
  }

  componentWillMount() {
    this.teamService = new TeamService(teams => {
      this.setState({ teams: teams });
    });
  }

  componentWillUnmount() {
    this.teamService.dispose();
  }

  onJoin = id => {
    this.teamService.join(this.props.user, id);
  };

  onDelete = id => {
    this.teamService.delete(this.props.user, id);
  };

  onAdd = name => {
    this.teamService.add(this.props.user, name);
  };

  render() {
    const actions = {
      onShowSprints: this.props.onShowSprints,
      onShowRequests: this.props.onShowRequests,
      onShowMembers: this.props.onShowMembers,
      onJoin: this.onJoin,
      onDelete: this.onDelete,
      onAdd: this.onAdd
    };
    return (
      <TeamsComponent
        user={this.props.user}
        teams={this.state.teams}
        actions={actions}
      />
    );
  }
}
