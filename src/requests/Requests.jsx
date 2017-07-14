import React from "react";
import RequestService from "../services/RequestService";
import RequestsComponent from "./RequestsComponent";

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
  }

  componentWillMount() {
    this.requestService = new RequestService(this.props.team, requests => {
      this.setState({ requests: requests });
    });
  }

  componentWillUnmount() {
    this.requestService.dispose();
  }

  onDelete = id => {
    this.requestService.delete(this.props.user, id);
  };

  onAdd = name => {
    this.requestService.add(this.props.user, name);
  };

  render() {
    return (
      <RequestsComponent
        requests={this.state.requests}
        onDelete={this.onDelete}
        onAdd={this.onAdd}
      />
    );
  }
}
