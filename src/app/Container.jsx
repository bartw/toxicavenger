import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../navigation/PrivateRoute";
import Breadcrumbs from "../navigation/Breadcrumbs";
import Home from "./Home";
import Sprints from "../sprints/Sprints";
import Teams from "../teams/Teams";
import Requests from "../requests/Requests";
import Members from "../members/Members";
import Waste from "../waste/Waste";
import WasteChart from "../visualization/WasteChart";

export default function Container({ user }) {
  return (
    <div className="container">
      <Breadcrumbs isAuthenticated={!!user} />
      <Route path="/" exact render={() => <Home isAuthenticated={!!user} />} />
      <PrivateRoute exact path="/teams" component={Teams} user={user} />
      <PrivateRoute
        exact
        path="/teams/:team/sprints"
        component={Sprints}
        user={user}
      />
      <PrivateRoute
        exact
        path="/teams/:team/requests"
        component={Requests}
        user={user}
      />
      <PrivateRoute
        exact
        path="/teams/:team/members"
        component={Members}
        user={user}
      />
      <PrivateRoute
        exact
        path="/teams/:team/sprints/:sprint/waste"
        component={Waste}
        user={user}
      />
      <PrivateRoute
        exact
        path="/teams/:team/sprints/:sprint/visualize"
        component={WasteChart}
        user={user}
      />
    </div>
  );
}
