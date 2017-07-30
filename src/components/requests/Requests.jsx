import React from "react";
import TeamService from "../../services/TeamService";
import RequestService from "../../services/RequestService";
import TablePage from "../app/TablePage";
import Request from "./Request";

export default class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
  }

  componentDidMount() {
    this.requestService = new RequestService(
      this.props.match.params.team,
      requests => {
        this.setState({ requests: requests });
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
    this.requestService.dispose();
  }

  onDelete = id => {
    this.requestService.delete(id);
  };

  render() {
    if (!this.state.team) {
      return null;
    }
    const requestRows = this.state.requests.map(request =>
      <Request
        key={request.id}
        team={this.state.team.id}
        request={request}
        onDelete={() => {
          this.onDelete(request.id);
        }}
      />
    );
    return (
      <TablePage
        title={`Requests of ${this.state.team.name}`}
        headers={["name", "actions"]}
        rows={requestRows}
      />
    );
  }
}
