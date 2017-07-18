import React from "react";
import ReactDOM from "react-dom";
import Public from "./Public";

test("Given a Public when it renders then no errors are thrown", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Public />, div);
});
