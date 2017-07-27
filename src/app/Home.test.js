import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";

test("Given a Home when it renders then no errors are thrown", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Home />, div);
});
