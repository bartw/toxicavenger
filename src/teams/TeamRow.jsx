import React from "react";

export default function TeamRow({ isOwner, name, onSetSelected, onDelete }) {
  const handleDelete = e => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <tr onClick={onSetSelected}>
      <td>
        {name}
      </td>
      <td>
        {isOwner && <a onClick={handleDelete}>delete</a>}
      </td>
    </tr>
  );
}
