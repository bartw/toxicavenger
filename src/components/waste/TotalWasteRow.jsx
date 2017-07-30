import React from "react";

export default function TotalWasteRow({ waste }) {
  const total = waste.reduce((sum, item) => sum + item.duration, 0).toFixed(1);
  return (
    <tr>
      <td />
      <td />
      <td />
      <td className="bold right-text">
        {total}
      </td>
      <td />
    </tr>
  );
}
