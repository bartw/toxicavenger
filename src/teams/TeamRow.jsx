import React from "react";

export default function TeamRow({ user, team, actions }) {
  const isOwner = team.owner === user;
  const isMember = team.members.find(member => member === user);
  const onShowSprints = () => {
    actions.onShowSprints(team.id);
  };
  const onJoin = () => {
    actions.onJoin(team.id);
  };
  const onShowRequests = () => {
    actions.onShowRequests(team.id);
  };
  const onShowMembers = () => {
    actions.onShowMembers(team.id);
  };
  const onDelete = () => {
    actions.onDelete(team.id);
  };
  return (
    <tr>
      <td>
        {team.name}
      </td>
      <td>
        {(isOwner || isMember) && <a onClick={onShowSprints}>sprints</a>}
        {!isOwner && !isMember && <a onClick={onJoin}>join</a>}
        {isOwner && <a onClick={onShowRequests}>requests</a>}
        {isOwner && <a onClick={onShowMembers}>members</a>}
        {isOwner && <a onClick={onDelete}>delete</a>}
      </td>
    </tr>
  );
}
