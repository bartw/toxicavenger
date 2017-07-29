import React from "react";
import { Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} user={user} /> : <Home />)}
    />
  );
}
