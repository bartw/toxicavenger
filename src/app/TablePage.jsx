import React from "react";

export default function TablePage({ title, headers, rows, children }) {
  const headerColumns = headers.map((header, index) =>
    <th key={index}>
      {header}
    </th>
  );
  return (
    <div>
      <h3>
        {title}
      </h3>
      <div>
        <table>
          <thead>
            <tr>
              {headerColumns}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      {children}
    </div>
  );
}
