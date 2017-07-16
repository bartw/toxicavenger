import React from "react";
import RequestService from "../services/RequestService";
import TablePage from "../app/TablePage";
import Request from "./Request";

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
    const requestRows = this.state.requests.map(request =>
      <Request
        key={request.id}
        team={this.props.team.id}
        request={request}
        onDelete={() => {
          this.onDelete(request.id);
        }}
      />
    );
    return (
      <TablePage
        title={`Requests of ${this.props.team.name}`}
        headers={["name", "actions"]}
        rows={requestRows}
      />
    );
  }
}
