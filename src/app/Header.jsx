import React from "react";
import Authentication from "../authentication/Authentication";

export default function Header({user, login, logout}) {
  return (
    <header>
      <div className="container">
        <Authentication
          user={user}
          login={login}
          logout={logout}
        />
        <h1>Toxic Avenger</h1>
      </div>
    </header>
  );
}
