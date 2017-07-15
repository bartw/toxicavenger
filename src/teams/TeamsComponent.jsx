import React from "react";
import Team from "./Team";
import AddTeam from "./AddTeam";

export default function TeamsComponent({ user, teams, actions }) {
  const { onAdd, ...rowActions } = actions;
  const teamRows = teams.map(team =>
    <Team
      key={team.id}
      user={user}
      team={team}
      actions={rowActions}
    />
  );
  return (
    <div>
      <h3>Teams</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {teamRows}
          </tbody>
        </table>
      </div>
      <AddTeam onAdd={onAdd} />
    </div>
  );
}
