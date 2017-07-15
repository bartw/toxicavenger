import React from "react";
import WasteService from "../services/WasteService";
import WasteComponent from "./WasteComponent";

export default class Waste extends React.Component {
  constructor(props) {
    super(props);
    this.state = { waste: [] };
  }

  componentWillMount() {
    this.wasteService = new WasteService(
      this.props.team,
      this.props.sprint,
      waste => {
        this.setState({ waste: waste });
      }
    );
  }

  componentWillUnmount() {
    this.wasteService.dispose();
  }

  onAdd = (type, description, duration) => {
    this.wasteService.add(this.props.user.uid, this.props.user.displayName, type, description, duration);
  };

  onDelete = id => {
    this.wasteService.delete(id);
  };

  render() {
    return (
      <WasteComponent
        waste={this.state.waste}
        onAdd={this.onAdd}
        onDelete={this.onDelete}
      />
    );
  }
}
