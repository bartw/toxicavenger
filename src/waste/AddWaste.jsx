import React from "react";

export default class AddSprint extends React.Component {
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
          disabled={!this.state.description || !this.state.duration}
        >
          Add
        </button>
      </div>
    );
  }
}
