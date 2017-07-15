import React from "react";

export default function Sprint({ description, duration, onDelete }) {
  return (
    <tr>
      <td>
        {description}
      </td>
      <td>
        {duration}
      </td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
