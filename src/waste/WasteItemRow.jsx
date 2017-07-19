import React from "react";
import PropTypes from "prop-types";
import WasteItem from "../entities/WasteItem";

export default function WasteItemRow({ waste, onDelete }) {
  return (
    <tr>
      <td>
        {waste.userName}
      </td>
      <td>
        {waste.type}
      </td>
      <td>
        {waste.description}
      </td>
      <td className="right-text">
        {waste.duration.toFixed(1)}
      </td>
      <td>
        <a onClick={onDelete}>delete</a>
      </td>
    </tr>
  );
}

WasteItem.propTypes = {
  waste: PropTypes.instanceOf(WasteItem).isRequired,
  onDelete: PropTypes.func.isRequired
};