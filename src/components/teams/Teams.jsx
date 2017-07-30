import React from "react";
import TeamService from "../../services/TeamService";
import TablePage from "../app/TablePage";
import Team from "./Team";
import AddTeam from "./AddTeam";

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
    const teamRows = this.state.teams.map(team =>
      <Team
        key={team.id}
        user={this.props.user.uid}
        team={team}
        onJoin={this.onJoin}
        onDelete={this.onDelete}
      />
    );
    return (
      <TablePage title="Teams" headers={["name", "actions"]} rows={teamRows}>
        <AddTeam onAdd={this.onAdd} />
      </TablePage>
    );
  }
}
