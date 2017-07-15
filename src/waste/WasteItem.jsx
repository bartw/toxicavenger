import React from "react";

export default function WasteItem({ waste, onDelete }) {
  return (
    <tr>
      <td>
        {waste.userName}
      </td>
      <td>
        {waste.type}
      </td>
      <td>
        {waste.description}
      </td>
      <td className="rightText">
        {waste.duration.toFixed(1)}
      </td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
