import React from "react";

export default function TeamRow({ isOwner, name, onSetSelected, onDelete }) {
  return (
    <tr onClick={onSetSelected}>
      <td>
        {name}
      </td>
      <td>
        {isOwner && <a onClick={onDelete}>delete</a>}
      </td>
    </tr>
  );
}
