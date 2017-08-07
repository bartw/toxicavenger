import _ from "lodash";

export default class ChartCalculationService {
  static calculate(waste, chartProperty) {
    const itemsByProperty = _(waste).groupBy(chartProperty.key);
    const labels = itemsByProperty
      .map(item => item[0][chartProperty.value])
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
  }
}
