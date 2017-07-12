import React from "react";
import TeamRow from "./TeamRow";
import AddTeam from "./AddTeam";

export default function TeamsComponent({ user, teams, actions }) {
  const { onAdd, ...rowActions } = actions;
  const teamRows = teams.map(team =>
    <TeamRow
      key={team.id}
      user={user}
      team={team}
      actions={rowActions}
    />
  );
  return (
    <div>
      <h2>Teams</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th />
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
