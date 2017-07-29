import React from "react";
import { render } from "react-dom";
import "reset-css/reset.css";
import "./style.css";
import {initializeApp} from "firebase";
import firebaseConfig from "./firebaseConfig";
import App from "./app/App";

initializeApp(firebaseConfig);

render(<App />, document.getElementById("root"));
