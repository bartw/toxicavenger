import React from "react";
import Request from "./Request";

export default function RequestsComponent({ requests, onDelete }) {
  const requestRows = requests.map(request =>
    <Request
      key={request.id}
      name={request.name}
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
              <th />
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
