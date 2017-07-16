import React from "react";
import SprintService from "../services/SprintService";
import TablePage from "../app/TablePage";
import Sprint from "./Sprint";
import AddSprint from "./AddSprint";

export default class Sprints extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sprints: [] };
  }

  componentWillMount() {
    this.sprintService = new SprintService(this.props.team.id, sprints => {
      this.setState({ sprints: sprints });
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
    const isOwner = this.props.team.isOwner(this.props.user);
    const sprintRows = this.state.sprints.map(sprint =>
      <Sprint
        key={sprint.id}
        isOwner={isOwner}
        name={sprint.name}
        onDelete={() => {
          this.onDelete(sprint.id);
        }}
        onShowWaste={() => {
          this.props.onShowWaste(sprint);
        }}
        onShowVisualization={() => {
          this.props.onShowVisualization(sprint);
        }}
      />
    );
    return (
      <TablePage
        title={`Sprints of ${this.props.team.name}`}
        headers={["name", "actions"]}
        rows={sprintRows}
      >
        {isOwner && <AddSprint onAdd={this.onAdd} />}
      </TablePage>
    );
  }
}
