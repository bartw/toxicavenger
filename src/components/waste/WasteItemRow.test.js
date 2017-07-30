import React from "react";
import ReactDOM from "react-dom";
import WasteItemRow from "./WasteItemRow";
import WasteItem from "../../entities/WasteItem";

test("Given a WasteItemRow when it renders then no errors are thrown", () => {
  const tbody = document.createElement("tbody");
  ReactDOM.render(
    <WasteItemRow
      waste={new WasteItem("id", "userId", "userName")}
      onDelete={() => {}}
    />,
    tbody
  );
});
