import React from "react";
import RequestService from "../services/RequestService";
import RequestsComponent from "./RequestsComponent";

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
  }

  componentWillMount() {
    this.requestService = new RequestService(this.props.team.id, requests => {
      this.setState({ requests: requests });
    });
  }

  componentWillUnmount() {
    this.requestService.dispose();
  }

  onDelete = id => {
    this.requestService.delete(id);
  };

  render() {
    return (
      <RequestsComponent
        team={this.props.team}
        requests={this.state.requests}
        onDelete={this.onDelete}
      />
    );
  }
}
