import React from "react";
import TeamService from "../services/TeamService";
import SprintService from "../services/SprintService";
import TablePage from "../app/TablePage";
import Sprint from "./Sprint";
import AddSprint from "./AddSprint";

export default class Sprints extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sprints: [] };
  }

  componentDidMount() {
    this.sprintService = new SprintService(
      this.props.match.params.team,
      sprints => {
        this.setState({ sprints: sprints });
      }
    );
    TeamService.getTeam(
      this.props.user.uid,
      this.props.match.params.team
    ).then(team => {
      this.setState({ team: team });
    });
  }

  componentWillUnmount() {
    this.sprintService.dispose();
  }

  onAdd = name => {
    this.sprintService.add(name);
  };

  onDelete = id => {
    this.sprintService.delete(id);
  };

  render() {
    if (!this.state.team) {
      return null;
    }
    const isOwner = this.state.team.isOwner(this.props.user.uid);
    const sprintRows = this.state.sprints.map(sprint =>
      <Sprint
        key={sprint.id}
        isOwner={isOwner}
        name={sprint.name}
        onDelete={() => {
          this.onDelete(sprint.id);
        }}
        sprintPath={"/teams/" + this.state.team.id + "/sprints/" + sprint.id}
      />
    );
    return (
      <TablePage
        title={`Sprints of ${this.state.team.name}`}
        headers={["name", "actions"]}
        rows={sprintRows}
      >
        {isOwner && <AddSprint onAdd={this.onAdd} />}
      </TablePage>
    );
  }
}
