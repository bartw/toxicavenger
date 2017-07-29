import React from "react";
import TeamService from "../services/TeamService";
import SprintService from "../services/SprintService";
import WasteService from "../services/WasteService";
import { Bar } from "react-chartjs-2";
import _ from "lodash";
import PropTypes from "prop-types";
import Team from "../entities/Team";
import Sprint from "../entities/Sprint";

export default class WasteChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartProperties = [
      { key: "userId", value: "userName", label: "user name" },
      { key: "type", value: "type", label: "type" }
    ];

    this.state = { waste: [], chartProperty: this.chartProperties[1] };
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

  onChangeChartProperty = e => {
    this.setState({
      chartProperty: this.chartProperties.find(
        chartProperty => chartProperty.key === e.target.value
      )
    });
  };

  calculateChart = () => {
    const itemsByProperty = _(this.state.waste).groupBy(
      this.state.chartProperty.key
    );
    const labels = itemsByProperty
      .map(item => item[0][this.state.chartProperty.value])
      .value();
    const totalsPerGroup = itemsByProperty
      .values()
      .map(items => items.reduce((sum, item) => sum + item.duration, 0))
      .value();

    return {
      data: {
        labels: labels,
        datasets: [
          {
            label: "Waste",
            data: totalsPerGroup,
            backgroundColor: [
              "#0074D9",
              "#7FDBFF",
              "#39CCCC",
              "#3D9970",
              "#2ECC40",
              "#01FF70",
              "#FFDC00",
              "#FF851B",
              "#FF4136",
              "#85144b",
              "#F012BE",
              "#B10DC9"
            ]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  };

  render() {
    if (!this.state.team || !this.state.sprint) {
      return null;
    }
    const chartPropertyRadioButtons = this.chartProperties.map(chartProperty =>
      <label key={chartProperty.key}>
        <input
          name="chartProperty"
          type="radio"
          value={chartProperty.key}
          checked={this.state.chartProperty.key === chartProperty.key}
          onChange={this.onChangeChartProperty}
        />
        {chartProperty.label}
      </label>
    );
    const chart = this.calculateChart();

    return (
      <div>
        <h3>
          Visualization of {this.state.sprint.name} of {this.state.team.name}
        </h3>
        <div>
          <fieldset>
            {chartPropertyRadioButtons}
          </fieldset>
          <Bar data={chart.data} options={chart.options} />
        </div>
      </div>
    );
  }
}
