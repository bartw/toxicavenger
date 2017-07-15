import React from "react";

export default function GoBackWrapper({ onGoBack, children }) {
  return (
    <div className="goback">
      <a onClick={onGoBack}>back</a>
      {children}
    </div>
  );
}
