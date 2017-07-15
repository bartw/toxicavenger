import React from "react";
import SprintService from "../services/SprintService";
import SprintsComponent from "./SprintsComponent";

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
    const isOwner = this.props.team.owner === this.props.user;
    return (
      <SprintsComponent
        team={this.props.team.name}
        isOwner={isOwner}
        sprints={this.state.sprints}
        onAdd={this.onAdd}
        onDelete={this.onDelete}
        onShowWaste={this.props.onShowWaste}
        onShowVisualization={this.props.onShowVisualization}
      />
    );
  }
}
