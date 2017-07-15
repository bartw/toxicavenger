import React from "react";
import MemberService from "../services/MemberService";
import MembersComponent from "./MembersComponent";

export default class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: [] };
  }

  componentWillMount() {
    this.memberService = new MemberService(this.props.team, members => {
      this.setState({ members: members });
    });
  }

  componentWillUnmount() {
    this.memberService.dispose();
  }

  onDelete = id => {
    this.memberService.delete(id);
  };

  render() {
    return (
      <MembersComponent
        members={this.state.members}
        onDelete={this.onDelete}
      />
    );
  }
}
