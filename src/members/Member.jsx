import React from "react";

export default function Member({ name, onDelete }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}
