import React from "react";
import YesNoPopup from "../app/YesNoPopup";
import { Link } from "react-router-dom";

export default function TeamComponent({
  teamPath,
  name,
  isOwner,
  isMember,
  pending,
  isPending,
  onJoin,
  onDelete
}) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {(isOwner || isMember) &&
          <Link to={teamPath + "/sprints"}>sprints</Link>}
        {!isOwner && !isMember && !isPending && <a onClick={onJoin}>join</a>}
        {!isOwner &&
          !isMember &&
          isPending &&
          <span className="action">pending</span>}
        {isOwner &&
          !pending &&
          <Link to={teamPath + "/requests"}>requests</Link>}
        {isOwner &&
          pending > 0 &&
          <span className="action">
            <Link to={teamPath + "/requests"}>requests</Link>(<span className="focus">{pending}</span>)
          </span>}
        {isOwner && <Link to={teamPath + "/members"}>members</Link>}
        {isOwner &&
          <YesNoPopup
            linkText="delete"
            text={"Do you want to delete team " + name + "?"}
            action={onDelete}
          />}
      </td>
    </tr>
  );
}
