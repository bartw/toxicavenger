import React from "react";

export default function TeamComponent({
  name,
  isOwner,
  isMember,
  pending,
  isPending,
  actions
}) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {(isOwner || isMember) &&
          <a onClick={actions.onShowSprints}>sprints</a>}
        {!isOwner && !isMember && !isPending && <a onClick={actions.onJoin}>join</a>}
        {!isOwner && !isMember && isPending && <span className="action">pending</span>}
        {isOwner && <a onClick={actions.onShowRequests}>requests</a>}
        {isOwner && pending > 0 && <span className="action">({pending})</span>}
        {isOwner && <a onClick={actions.onShowMembers}>members</a>}
        {isOwner && <a onClick={actions.onDelete}>delete</a>}
      </td>
    </tr>
  );
}
