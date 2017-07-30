import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer";

test("Given a Footer when it renders then no errors are thrown", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Footer />, div);
});
