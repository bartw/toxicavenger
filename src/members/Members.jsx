import React from "react";
import MemberService from "../services/MemberService";
import TablePage from "../app/TablePage";
import Member from "./Member";

export default class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: [] };
  }

  componentWillMount() {
    this.memberService = new MemberService(this.props.team.id, members => {
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
    const memberRows = this.state.members.map(member =>
      <Member
        key={member.uid}
        name={member.name}
        onDelete={() => {
          this.onDelete(member.uid);
        }}
      />
    );
    return (
      <TablePage
        title={`Members of ${this.props.team.name}`}
        headers={["name", "actions"]}
        rows={memberRows}
      />
    );
  }
}
