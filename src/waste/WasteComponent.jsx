import React from "react";
import WasteItem from "./WasteItem";
import AddWaste from "./AddWaste";

export default function WasteComponent({ team, sprint, waste, onDelete, onAdd }) {
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
      <h3>Waste of {sprint} of {team}</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>type</th>
              <th>description</th>
              <th>duration</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {wasteRows}
            <tr>
              <td />
              <td />
              <td />
              <td className="bold right-text">
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
