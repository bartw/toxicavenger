import React from "react";
import Sprint from "./Sprint";
import AddSprint from "./AddSprint";

export default function SprintsComponent({
  team,
  isOwner,
  sprints,
  onShowWaste,
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
        onShowWaste(sprint.id);
      }}
    />
  );
  return (
    <div>
      <h3>Sprints</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
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
