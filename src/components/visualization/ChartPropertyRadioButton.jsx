import React from "react";

export default function ChartPropertyRadioButton({chartProperty, currentKey, onChangeChartProperty}) {
  return (
    <label>
      <input
        name="chartProperty"
        type="radio"
        value={chartProperty.key}
        checked={currentKey === chartProperty.key}
        onChange={onChangeChartProperty}
      />
      {chartProperty.label}
    </label>
  );
}
