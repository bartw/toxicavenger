import React from "react";
import Member from "./Member";

export default function MembersComponent({ members, onDelete }) {
  const memberRows = members.map(member =>
    <Member
      key={member.uid}
      name={member.name}
      onDelete={() => {
        onDelete(member.uid);
      }}
    />
  );
  return (
    <div>
      <h2>Members</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memberRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}
