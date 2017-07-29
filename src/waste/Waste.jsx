import React from "react";
import TeamService from "../services/TeamService";
import SprintService from "../services/SprintService";
import WasteService from "../services/WasteService";
import TablePage from "../app/TablePage";
import AddWaste from "./AddWaste";
import WasteItemRow from "./WasteItemRow";

export default class Waste extends React.Component {
  constructor(props) {
    super(props);
    this.state = { waste: [] };
  }

  async componentDidMount() {
    this.wasteService = new WasteService(
      this.props.match.params.team,
      this.props.match.params.sprint,
      waste => {
        this.setState({ waste: waste });
      }
    );
    const team = await TeamService.getTeam(
      this.props.user.uid,
      this.props.match.params.team
    );
    this.setState({ team: team });
    const sprint = await SprintService.getSprint(
      this.props.match.params.team,
      this.props.match.params.sprint
    );
    this.setState({ sprint: sprint });
  }

  componentWillUnmount() {
    this.wasteService.dispose();
  }

  onAdd = (type, description, duration) => {
    this.wasteService.add(
      this.props.user.uid,
      this.props.user.displayName,
      type,
      description,
      duration
    );
  };

  onDelete = id => {
    this.wasteService.delete(id);
  };

  render() {
    if (!this.state.team || !this.state.sprint) {
      return null;
    }
    const wasteRows = this.state.waste.map(item =>
      <WasteItemRow
        key={item.id}
        waste={item}
        onDelete={() => {
          this.onDelete(item.id);
        }}
      />
    );
    const total = this.state.waste.length
      ? this.state.waste
          .reduce((sum, item) => sum + item.duration, 0)
          .toFixed(1)
      : 0;
    wasteRows.push(
      <tr key="total">
        <td />
        <td />
        <td />
        <td className="bold right-text">
          {total}
        </td>
        <td />
      </tr>
    );
    return (
      <TablePage
        title={`Waste of ${this.state.sprint.name} of ${this.state.team.name}`}
        headers={["name", "type", "description", "duration", "actions"]}
        rows={wasteRows}
      >
        <AddWaste onAdd={this.onAdd} />
      </TablePage>
    );
  }
}
