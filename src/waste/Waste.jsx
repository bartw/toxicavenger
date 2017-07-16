import React from "react";
import WasteService from "../services/WasteService";
import TablePage from "../app/TablePage";
import AddWaste from "./AddWaste";
import WasteItem from "./WasteItem";

export default class Waste extends React.Component {
  constructor(props) {
    super(props);
    this.state = { waste: [] };
  }

  componentWillMount() {
    this.wasteService = new WasteService(
      this.props.team.id,
      this.props.sprint.id,
      waste => {
        this.setState({ waste: waste });
      }
    );
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
    const wasteRows = this.state.waste.map(item =>
      <WasteItem
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
        title={`Waste of ${this.props.sprint.name} of ${this.props.team.name}`}
        headers={["name", "type", "description", "duration", "actions"]}
        rows={wasteRows}
      >
        <AddWaste onAdd={this.onAdd} />
      </TablePage>
    );
  }
}
