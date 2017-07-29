import React from "react";
import TeamService from "../services/TeamService";
import MemberService from "../services/MemberService";
import TablePage from "../app/TablePage";
import Member from "./Member";

export default class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: [] };
  }

  componentDidMount() {
    this.memberService = new MemberService(
      this.props.match.params.team,
      members => {
        this.setState({ members: members });
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
    this.memberService.dispose();
  }

  onDelete = id => {
    this.memberService.delete(id);
  };

  render() {
    if (!this.state.team) {
      return null;
    }
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
        title={`Members of ${this.state.team.name}`}
        headers={["name", "actions"]}
        rows={memberRows}
      />
    );
  }
}
