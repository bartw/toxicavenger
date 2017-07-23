import React from "react";
import RequestService from "../services/RequestService";
import MemberService from "../services/MemberService";
import TeamComponent from "./TeamComponent";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: [], requests: [] };
  }

  componentWillMount() {
    this.requestService = new RequestService(this.props.team.id, requests => {
      this.setState({ requests: requests });
    });
    this.memberService = new MemberService(this.props.team.id, members => {
      this.setState({ members: members });
    });
  }

  componentWillUnmount() {
    this.requestService.dispose();
    this.memberService.dispose();
  }

  onJoin = () => {
    this.props.actions.onJoin(this.requestService.add);
  };

  onShowSprints = () => {
    this.props.actions.onShowSprints(this.props.team);
  };

  onShowRequests = () => {
    this.props.actions.onShowRequests(this.props.team);
  };

  onShowMembers = () => {
    this.props.actions.onShowMembers(this.props.team);
  };

  onDelete = () => {
    this.props.actions.onDelete(this.props.team.id);
  };

  render() {
    const isOwner = this.props.team.isOwner(this.props.user);
    const isMember = this.state.members.find(
      member => member.uid === this.props.user
    );
    const actions = {
      onShowSprints: this.onShowSprints,
      onShowRequests: this.onShowRequests,
      onShowMembers: this.onShowMembers,
      onJoin: this.onJoin,
      onDelete: this.onDelete
    };
    return (
      <TeamComponent
        name={this.props.team.name}
        isOwner={isOwner}
        isMember={isMember}
        pending={this.state.requests.length}
        isPending={this.state.requests.filter(request => request.userId === this.props.user).length > 0}
        actions={actions}
      />
    );
  }
}
