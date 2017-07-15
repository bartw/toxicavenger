import React from "react";
import Sprint from "./Sprint";
import AddSprint from "./AddSprint";

export default function SprintsComponent({
  team,
  isOwner,
  sprints,
  onShowWaste,
  onShowVisualization,
  onDelete,
  onAdd
}) {
  const sprintRows = sprints.map(sprint =>
    <Sprint
      key={sprint.id}
      isOwner={isOwner}
      name={sprint.name}
      onDelete={() => {
        onDelete(sprint.id);
      }}
      onShowWaste={() => {
        onShowWaste(sprint);
      }}
      onShowVisualization={() => {
        onShowVisualization(sprint);
      }}
    />
  );
  return (
    <div>
      <h3>Sprints of {team}</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {sprintRows}
          </tbody>
        </table>
      </div>
      {isOwner && <AddSprint onAdd={onAdd} />}
    </div>
  );
}
