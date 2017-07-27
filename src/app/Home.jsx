import React from "react";
import { Link } from "react-router-dom";

export default function Home({ isAuthenticated }) {
  return (
    <div className="welcome">
      <h2>Toxic Avenger</h2>
      <h3>Welcome</h3>
      {isAuthenticated
        ? <Link to="/teams">Teams</Link>
        : <p>Log in to start tracking your waste.</p>}
    </div>
  );
}
