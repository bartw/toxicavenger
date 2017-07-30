import React from "react";
import { render } from "react-dom";
import AppService from "./services/AppService";
import App from "./components/app/App";
import "reset-css/reset.css";
import "./style.css";

AppService.initialize();

render(<App />, document.getElementById("root"));
