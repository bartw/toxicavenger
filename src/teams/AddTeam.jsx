import React from "react";

export default class AddTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: "" };

    this.onChangeName = e => {
      this.setState({ name: e.target.value });
    };
    
    this.onAdd = () => {
      this.props.onAdd(this.state.name);
      this.setState({ name: "" });
    };
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.onChangeName}
          placeholder="name"
        />
        <button onClick={this.onAdd} disabled={!this.state.name}>
          Add
        </button>
      </div>
    );
  }
}
