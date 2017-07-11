import React from "react";

export default function TeamRow({ isOwner, isMember, name, onSetSelected, onJoin, onShowRequests, onDelete }) {
  const handleJoin = e => {
    e.stopPropagation();
    onJoin();
  };

  const handleShowRequests = e => {
    e.stopPropagation();
    onShowRequests();
  };

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
        {!isOwner && !isMember && <a onClick={handleJoin}>join</a>}
        {isOwner && <a onClick={handleShowRequests}>requests</a>}
        {isOwner && <a onClick={handleDelete}>delete</a>}
      </td>
    </tr>
  );
}
