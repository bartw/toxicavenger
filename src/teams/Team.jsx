import React from "react";
import RequestService from "../services/RequestService";
import TeamComponent from "./TeamComponent";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.requestService = new RequestService(this.props.team.id, () => {});
  }

  componentWillUnmount() {
    this.requestService.dispose();
  }

  onJoin = () => {
    this.props.actions.onJoin(this.requestService.add);
  };

  onShowSprints = () => {
    this.props.actions.onShowSprints(this.props.team.id);
  };

  onShowRequests = () => {
    this.props.actions.onShowRequests(this.props.team.id);
  };

  onShowMembers = () => {
    this.props.actions.onShowMembers(this.props.team.id);
  };

  onDelete = () => {
    this.props.actions.onDelete(this.props.team.id);
  };

  render() {
    const isOwner = this.props.team.owner === this.props.user;
    const isMember = false;//this.props.team.members.find(member => member === this.props.user);
    const actions = {
      onShowSprints: this.onShowSprints,
      onShowRequests: this.onShowRequests,
      onShowMembers: this.onShowMembers,
      onJoin: this.onJoin,
      onDelete: this.onDelete
    };
    return (
      <TeamComponent name={this.props.team.name} isOwner={isOwner} isMember={isMember} actions={actions} />
    );
  }
}
