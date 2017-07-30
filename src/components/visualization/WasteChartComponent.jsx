import React from "react";
import { Bar } from "react-chartjs-2";

export default function WasteChartComponent({
  sprint,
  team,
  chartPropertyRadioButtons,
  chart
}) {
  return (
    <div>
      <h3>
        Visualization of {sprint} of {team}
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
