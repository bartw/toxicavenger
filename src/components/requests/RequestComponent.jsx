import React from "react";
import YesNoPopup from "../app/YesNoPopup";

export default function Request({ name, onApprove, onDelete }) {
  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        <a onClick={onApprove}>approve</a>
        <YesNoPopup
          linkText="delete"
          text={"Do you want to delete the request of " + name + "?"}
          action={onDelete}
        />
      </td>
    </tr>
  );
}
