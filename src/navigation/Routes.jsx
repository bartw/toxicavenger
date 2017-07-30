import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../home/Home";
import Sprints from "../sprints/Sprints";
import Teams from "../teams/Teams";
import Requests from "../requests/Requests";
import Members from "../members/Members";
import Waste from "../waste/Waste";
import WasteChart from "../visualization/WasteChart";

export default function Routes({ user }) {
  const base = "/";
  const teams = base + "teams";
  const team = teams + "/:team/";
  const sprints = team + "sprints";
  const sprint = sprints + "/:sprint/";
  const waste = sprint + "waste";
  const visualize = sprint + "visualize";
  const requests = team + "requests";
  const members = team + "members";
  return (
    <div>
      <Route exact path={base} render={() => <Home authenticated={!!user} />} />
      <PrivateRoute exact path={teams} component={Teams} user={user} />
      <PrivateRoute exact path={sprints} component={Sprints} user={user} />
      <PrivateRoute exact path={requests} component={Requests} user={user} />
      <PrivateRoute exact path={members} component={Members} user={user} />
      <PrivateRoute exact path={waste} component={Waste} user={user} />
      <PrivateRoute exact path={visualize} component={WasteChart} user={user} />
    </div>
  );
}
