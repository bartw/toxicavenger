import React from "react";

export default function TeamComponent({ name, isOwner, isMember, actions }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {(isOwner || isMember) && <a onClick={actions.onShowSprints}>sprints</a>}
        {!isOwner && !isMember && <a onClick={actions.onJoin}>join</a>}
        {isOwner && <a onClick={actions.onShowRequests}>requests</a>}
        {isOwner && <a onClick={actions.onShowMembers}>members</a>}
        {isOwner && <a onClick={actions.onDelete}>delete</a>}
      </td>
    </tr>
  );
}
