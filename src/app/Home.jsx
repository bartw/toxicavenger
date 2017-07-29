import React from "react";
import { Link } from "react-router-dom";

export default function Home({ isAuthenticated }) {
  return (
    <div className="welcome">
      <h2>Toxic Avenger</h2>
      <h3>Welcome</h3>
      {isAuthenticated
        ? <span>Explore the <Link to="/teams">teams</Link></span>
        : <p>Log in to start tracking your waste.</p>}
    </div>
  );
}
