import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../navigation/PrivateRoute";
import Breadcrumbs from "../navigation/Breadcrumbs";
import Routes from "../navigation/Routes";

export default function Page({ user }) {
  return (
    <div className="container">
      <Breadcrumbs isAuthenticated={!!user} />
      <Routes user={user} />
    </div>
  );
}
