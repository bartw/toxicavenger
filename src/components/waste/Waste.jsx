import React from "react";
import TeamService from "../../services/TeamService";
import SprintService from "../../services/SprintService";
import WasteService from "../../services/WasteService";
import TablePage from "../app/TablePage";
import AddWaste from "./AddWaste";
import WasteItemRow from "./WasteItemRow";
import TotalWasteRow from "./TotalWasteRow";

export default class Waste extends React.Component {
  constructor(props) {
    super(props);
    this.state = { waste: [] };
  }

  componentDidMount() {
    this.wasteService = new WasteService(
      this.props.match.params.team,
      this.props.match.params.sprint,
      waste => {
        this.setState({ waste: waste });
      }
    );
    TeamService.getTeam(this.props.match.params.team).then(team => {
      this.setState({ team: team });
    });
    SprintService.getSprint(
      this.props.match.params.team,
      this.props.match.params.sprint
    ).then(sprint => {
      this.setState({ sprint: sprint });
    });
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
    wasteRows.push(<TotalWasteRow key="total" waste={this.state.waste} />);
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
