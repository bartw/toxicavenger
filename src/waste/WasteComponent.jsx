import React from "react";
import WasteItem from "./WasteItem";
import AddWaste from "./AddWaste";

export default function WasteComponent({ waste, onDelete, onAdd }) {
  const wasteRows = waste.map(waste =>
    <WasteItem
      key={waste.id}
      description={waste.description}
      duration={waste.duration}
      onDelete={() => {
        onDelete(waste.id);
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
