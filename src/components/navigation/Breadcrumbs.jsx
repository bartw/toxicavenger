import React from "react";
import { NavLink } from "react-router-dom";

function getUrlParts() {
  const url = location.href;
  const hashIndex = url.indexOf("#");
  const path = hashIndex < url.length - 1 ? url.slice(hashIndex + 1) : "";
  return path.split("/");
}

function getPath(parts, base, name) {
  var index = parts.indexOf(name);
  return index > 0 ? base + "/" + parts[index - 1] + "/" + name : null;
}

function BreadcrumbSeparator() {
  return <span className="breadcrumbSeparator">&gt;</span>;
}

function Breadcrumb({ to, text, hideSeparator, children }) {
  return (
    to &&
    <span>
      {!hideSeparator && <BreadcrumbSeparator />}
      <NavLink to={to} exact activeClassName="active">
        {text}
      </NavLink>
      {children}
    </span>
  );
}

export default function Breadcrumbs({ isAuthenticated }) {
  if (!isAuthenticated) {
    return null;
  }
  const parts = getUrlParts();
  const teamsPath = parts.indexOf("teams") !== -1 ? "/teams" : null;
  if (!teamsPath) {
    return null;
  }
  const sprintsPath = getPath(parts, teamsPath, "sprints");
  const wastePath = getPath(parts, sprintsPath, "waste");
  const visualizePath = getPath(parts, sprintsPath, "visualize");
  const requestsPath = getPath(parts, teamsPath, "requests");
  const membersPath = getPath(parts, teamsPath, "members");
  return (
    <span className="breadcrumbs">
      <Breadcrumb to="/" text="Home" hideSeparator={true}>
        <Breadcrumb to={teamsPath} text="Teams">
          <Breadcrumb to={sprintsPath} text="Sprints">
            <Breadcrumb to={wastePath} text="Waste" />
            <Breadcrumb to={visualizePath} text="Visualize" />
          </Breadcrumb>
          <Breadcrumb to={requestsPath} text="Requests" />
          <Breadcrumb to={membersPath} text="Members" />
        </Breadcrumb>
      </Breadcrumb>
    </span>
  );
}
