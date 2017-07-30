import React from "react";
import YesNoPopup from "../app/YesNoPopup";

export default function Member({ name, onDelete }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <YesNoPopup
          linkText="delete"
          text={"Do you want to delete " + name + " from this team?"}
          action={onDelete}
        />
      </td>
    </tr>
  );
}
