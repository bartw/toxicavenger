import React from "react";
import PropTypes from "prop-types";

export default function Authentication({ user, login, logout }) {
  return (
    <div className="right">
      {!user && <a onClick={login}>login</a>}
      {user && <a onClick={logout}>logout</a>}
    </div>
  );
}

Authentication.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};