import React from "react";
import TeamRow from "./TeamRow";
import AddTeam from "./AddTeam";

export default function Teams({ uid, teams, onSetSelected, onDelete, onAdd }) {
  const teamRows = teams.map(team =>
    <TeamRow
      key={team.id}
      isOwner={team.uid === uid}
      name={team.name}
      onSetSelected={() => {
        onSetSelected(team.id);
      }}
      onDelete={() => {
        onDelete(team.id);
      }}
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
