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
    this.props.onJoin(this.requestService.add);
  };

  onDelete = () => {
    this.props.onDelete(this.props.team.id);
  };

  render() {
    const isOwner = this.props.team.isOwner(this.props.user);
    const isMember = this.state.members.find(
      member => member.uid === this.props.user
    );
    return (
      <TeamComponent
        teamPath={"/teams/" + this.props.team.id}
        name={this.props.team.name}
        isOwner={isOwner}
        isMember={isMember}
        pending={this.state.requests.length}
        isPending={
          this.state.requests.filter(
            request => request.userId === this.props.user
          ).length > 0
        }
        onJoin={this.onJoin}
        onDelete={this.onDelete}
      />
    );
  }
}
