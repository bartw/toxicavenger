import React from "react";
import { Link } from "react-router-dom";

export default function Home({ authenticated }) {
  return (
    <div className="welcome">
      <h2>Toxic Avenger</h2>
      <h3>Welcome</h3>
      {authenticated
        ? <span>
            Explore the <Link to="/teams">teams</Link>
          </span>
        : <p>Log in to start tracking your waste.</p>}
    </div>
  );
}
