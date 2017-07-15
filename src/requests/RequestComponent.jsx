import React from "react";

export default function Request({ name, onApprove, onDelete }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <a onClick={onApprove}>approve</a>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
