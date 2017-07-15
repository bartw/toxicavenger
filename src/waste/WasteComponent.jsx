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
  return (
    <div>
      <h3>Waste</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wasteRows}
          </tbody>
        </table>
      </div>
      <AddWaste onAdd={onAdd} />
    </div>
  );
}
