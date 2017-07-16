import React from "react";
import Authentication from "../authentication/Authentication";

export default function Header({user, onAuthenticationStateChanged}) {
  return (
    <header>
      <div className="container">
        <Authentication
          user={user}
          onStateChanged={onAuthenticationStateChanged}
        />
        <h1>Toxic Avenger</h1>
      </div>
    </header>
  );
}
