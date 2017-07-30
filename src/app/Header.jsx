import React from "react";
import { Link } from "react-router-dom";
import Authentication from "../authentication/Authentication";

export default function Header({ user, login, logout }) {
  return (
    <header>
      <div className="container">
        <Authentication user={user} login={login} logout={logout} />
        <Link className="title" to="/">
          <h1>Toxic Avenger</h1>
        </Link>
      </div>
    </header>
  );
}
