import React from "react";

export default function GoBackWrapper({ onGoBack, children }) {
  return (
    <div className="goback">
      <button onClick={onGoBack}>go back</button>
      {children}
    </div>
  );
}
