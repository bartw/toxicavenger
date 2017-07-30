import React from "react";
import TeamService from "../../services/TeamService";
import SprintService from "../../services/SprintService";
import WasteService from "../../services/WasteService";
import ChartCalculationService from "../../services/ChartCalculationService";
import PropTypes from "prop-types";
import Team from "../../entities/Team";
import Sprint from "../../entities/Sprint";
import ChartPropertyRadioButton from "./ChartPropertyRadioButton";
import WasteChartComponent from "./WasteChartComponent";

export default class WasteChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartProperties = [
      { key: "userId", value: "userName", label: "user name" },
      { key: "type", value: "type", label: "type" }
    ];

    this.state = { waste: [], chartProperty: this.chartProperties[0] };
  }

  componentDidMount() {
    this.wasteService = new WasteService(
      this.props.match.params.team,
      this.props.match.params.sprint,
      waste => {
        this.setState({ waste: waste });
      }
    );
    TeamService.getTeam(
      this.props.user.uid,
      this.props.match.params.team
    ).then(team => {
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

  onChangeChartProperty = e => {
    this.setState({
      chartProperty: this.chartProperties.find(
        chartProperty => chartProperty.key === e.target.value
      )
    });
  };

  render() {
    if (!this.state.team || !this.state.sprint) {
      return null;
    }
    const chartPropertyRadioButtons = this.chartProperties.map(chartProperty =>
      <ChartPropertyRadioButton
        key={chartProperty.key}
        chartProperty={chartProperty}
        currentKey={this.state.chartProperty.key}
        onChangeChartProperty={this.onChangeChartProperty}
      />
    );
    const chart = ChartCalculationService.calculate(
      this.state.waste,
      this.state.chartProperty
    );

    return (
      <WasteChartComponent
        sprint={this.state.sprint.name}
        team={this.state.team.name}
        chartPropertyRadioButtons={chartPropertyRadioButtons}
        chart={chart}
      />
    );
  }
}
