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

  onJoin = join => {
    join(this.props.user.uid, this.props.user.displayName);
  };

  onDelete = id => {
    this.teamService.delete(this.props.user.uid, id);
  };

  onAdd = name => {
    this.teamService.add(this.props.user.uid, name);
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
        user={this.props.user.uid}
        teams={this.state.teams}
        actions={actions}
      />
    );
  }
}
