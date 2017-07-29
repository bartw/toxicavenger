import React from "react";
import YesNoPopup from "../app/YesNoPopup";
import { Link } from "react-router-dom";

export default function TeamComponent({
  id,
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
          <Link to={"/teams/" + id + "/sprints"}>sprints</Link>}
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
          <Link to={"/teams/" + id + "/requests"}>requests</Link>}
        {isOwner &&
          pending > 0 &&
          <span className="action">
            <a onClick={actions.onShowRequests}>requests</a>(<span className="focus">{pending}</span>)
          </span>}
        {isOwner && <Link to={"/teams/" + id + "/members"}>members</Link>}
        {isOwner &&
          <YesNoPopup
            linkText="delete"
            text={"Do you want to delete team " + name + "?"}
            action={actions.onDelete}
          />}
      </td>
    </tr>
  );
}
