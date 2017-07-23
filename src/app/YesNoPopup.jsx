import React from "react";

export default function YesNoPopup({ text, onYes, onNo }) {
  console.log("yestno");
  return (
    <div className="overlay">
      <div className="popup">
        <div className="header">
          <a onClick={onNo} className="close">x</a>
          <h4>Confirm</h4>
        </div>
        <p>
          {text}
        </p>
        <div className="actions">
          <a onClick={onYes}>Yes</a>
          <a onClick={onNo}>No</a>
        </div>
      </div>
    </div>
  );
}
