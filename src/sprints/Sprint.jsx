import React from "react";
import YesNoPopup from "../app/YesNoPopup";

export default function Sprint({
  name,
  isOwner,
  onShowWaste,
  onShowVisualization,
  onDelete
}) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <a onClick={onShowWaste}>waste</a>
        <a onClick={onShowVisualization}>visualize</a>
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
