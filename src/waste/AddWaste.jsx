import React from "react";

export default class AddSprint extends React.Component {
  constructor(props) {
    super(props);

    this.state = { description: "", duration: "" };
  }

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangeDuration = e => {
    this.setState({ duration: e.target.value });
  };

  onAdd = () => {
    this.props.onAdd(this.state.description, this.state.duration);
    this.setState({ description: "", duration: "" });
  };

  render() {
    return (
      <div>
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
        <button onClick={this.onAdd} disabled={!this.state.description || !this.state.duration}>
          Add
        </button>
      </div>
    );
  }
}
