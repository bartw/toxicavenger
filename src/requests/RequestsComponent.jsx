import React from "react";
import Request from "./Request";

export default function RequestsComponent({ team, requests, onDelete }) {
  const requestRows = requests.map(request =>
    <Request
      key={request.id}
      team={team.id}
      request={request}
      onDelete={() => {
        onDelete(request.id);
      }}
    />
  );
  return (
    <div>
      <h3>Requests of {team.name}</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {requestRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}
