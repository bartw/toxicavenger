import React from "react";
import WasteItem from "./WasteItem";
import AddWaste from "./AddWaste";

export default function WasteComponent({ waste, onDelete, onAdd }) {
  const wasteRows = waste.map(item =>
    <WasteItem
      key={item.id}
      waste={item}
      onDelete={() => {
        onDelete(item.id);
      }}
    />
  );
  const total = waste.length ? waste.reduce((sum, item) => sum + item.duration, 0).toFixed(1) : 0;
  return (
    <div>
      <h3>Waste</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wasteRows}
            <tr>
              <td />
              <td />
              <td />
              <td className="bold right">
                {total}
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      <AddWaste onAdd={onAdd} />
    </div>
  );
}
