import React from "react";

export default function GoBackWrapper({ onGoBack, children }) {
  return (
    <div>
      <button onClick={onGoBack}>go back</button>
      {children}
    </div>
  );
}
