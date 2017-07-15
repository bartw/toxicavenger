import React from "react";
import MemberService from "../services/MemberService";
import RequestComponent from "./RequestComponent";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.memberService = new MemberService(this.props.team);
  }

  componentWillUnmount() {
    this.memberService.dispose();
  }

  onApprove = () => {
    this.memberService.add(this.props.request.userId, this.props.request.userName);
    this.props.onDelete();
  };

  render() {
    return (
      <RequestComponent
        name={this.props.request.userName}
        onDelete={this.props.onDelete}
        onApprove={this.onApprove}
      />
    );
  }
}
