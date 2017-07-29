import React from "react";
import YesNoPopup from "../app/YesNoPopup";
import { Link } from "react-router-dom";

export default function Sprint({ name, isOwner, onDelete, sprintPath }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <Link to={sprintPath + "/waste"}>
          waste
        </Link>
        <Link to={sprintPath + "/visualize"}>
          visualize
        </Link>
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
