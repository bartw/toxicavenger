import React from "react";
import Request from "./Request";

export default function RequestsComponent({ team, requests, onDelete }) {
  const requestRows = requests.map(request =>
    <Request
      key={request.id}
      team={team}
      request={request}
      onDelete={() => {
        onDelete(request.id);
      }}
    />
  );
  return (
    <div>
      <h2>Requests</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
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
