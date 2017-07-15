import React from "react";

export default function Sprint({ name, isOwner, onShowWaste, onShowVisualization, onDelete }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <a onClick={onShowWaste}>waste</a>
        <a onClick={onShowVisualization}>visualize</a>
        {isOwner && <a onClick={onDelete}>delete</a>}
      </td>
    </tr>
  );
}
