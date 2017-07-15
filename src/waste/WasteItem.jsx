import React from "react";

export default function WasteItem({ waste, onDelete }) {
  return (
    <tr>
      <td>
        {waste.type}
      </td>
      <td>
        {waste.description}
      </td>
      <td>
        {waste.duration}
      </td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
