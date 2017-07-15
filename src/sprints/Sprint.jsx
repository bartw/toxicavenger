import React from "react";

export default function Sprint({ name, isOwner, onShowWaste, onDelete }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <a onClick={onShowWaste}>waste</a>
        {isOwner && <a onClick={onDelete}>delete</a>}
      </td>
    </tr>
  );
}
