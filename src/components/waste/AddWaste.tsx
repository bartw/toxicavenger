import * as React from "react";
//import PropTypes from "prop-types";

export interface AddWasteProps {
  onAdd: (type: string, description: string, duration: string) => any;
}

interface AddWasteState {
  type: string;
  description: string;
  duration: string;
}

export class AddWaste extends React.Component<AddWasteProps, AddWasteState> {
  private types: string[];

  constructor(props) {
    super(props);

    this.types = ["work", "meeting"];
    this.state = { type: this.types[0], description: "", duration: "" };
  }

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangeType = e => {
    this.setState({ type: e.target.value });
  };

  onChangeDuration = e => {
    this.setState({ duration: e.target.value });
  };

  onAdd = () => {
    this.props.onAdd(
      this.state.type,
      this.state.description,
      this.state.duration
    );
    this.setState({ type: this.types[0], description: "", duration: "" });
  };

  render() {
    const typeOptions = this.types.map(type =>
      <option key={type} value={type}>
        {type}
      </option>
    );
    return (
      <div>
        <select value={this.state.type} onChange={this.onChangeType}>
          {typeOptions}
        </select>
        <input
          type="text"
          value={this.state.description}
          onChange={this.onChangeDescription}
          placeholder="description"
        />
        <input
          type="number"
          step="0.5"
          min="0"
          value={this.state.duration}
          onChange={this.onChangeDuration}
          placeholder="duration"
        />
        <button
          onClick={this.onAdd}
          disabled={
            !this.state.type || !this.state.description || !this.state.duration
          }
        >
          Add
        </button>
      </div>
    );
  }
}

// AddWaste.propTypes = {
//   onAdd: PropTypes.func.isRequired
// };