import React from "react";
import WasteService from "../services/WasteService";
import { Bar } from "react-chartjs-2";
import _ from "lodash";

export default class WasteChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartProperties = [
      { key: "userUid", value: "userName", label: "user name" },
      { key: "type", value: "type", label: "type" }
    ];

    this.state = { waste: [], chartProperty: this.chartProperties[1] };
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
            data: totalsPerGroup
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
        <h3>Visualization</h3>
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
