import React from "react";
import YesNoPopup from "../app/YesNoPopup";
import { Link } from "react-router-dom";

export default function Sprint({
  name,
  isOwner,
  onShowWaste,
  onShowVisualization,
  onDelete,
  team,
  sprint
}) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <Link to={"/teams/" + team + "/sprints/" + sprint + "/waste"}>waste</Link>
        <Link to={"/teams/" + team + "/sprints/" + sprint + "/visualize"}>visualize</Link>
        {isOwner &&
          <YesNoPopup
            linkText="delete"
            text={"Do you want to delete sprint " + name + "?"}
            action={onDelete}
          />}
      </td>
    </tr>
  );
}
