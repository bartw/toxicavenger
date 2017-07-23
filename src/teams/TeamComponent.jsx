import React from "react";
import YesNoPopup from "../App/YesNoPopup";

export default function TeamComponent({
  name,
  isOwner,
  isMember,
  pending,
  isPending,
  showPopup,
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
        {!isOwner &&
          !isMember &&
          !isPending &&
          <a onClick={actions.onJoin}>join</a>}
        {!isOwner &&
          !isMember &&
          isPending &&
          <span className="action">pending</span>}
        {isOwner &&
          !pending &&
          <a onClick={actions.onShowRequests}>requests</a>}
        {isOwner &&
          pending > 0 &&
          <span className="action">
            <a onClick={actions.onShowRequests}>requests</a>(<span className="focus">{pending}</span>)
          </span>}
        {isOwner && <a onClick={actions.onShowMembers}>members</a>}
        {isOwner && <a onClick={actions.showPopup}>delete</a>}
        {showPopup &&
          <YesNoPopup
            text={"Do you want to delete team " + name + "?"}
            onYes={actions.onDelete}
            onNo={actions.hidePopup}
          />}
      </td>
    </tr>
  );
}
