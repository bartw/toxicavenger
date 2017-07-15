import React from "react";
import PropTypes from "prop-types";

export default function AuthenticationComponent({
  isAuthenticated,
  name,
  login,
  logout
}) {
  return (
    <div className="right">
      {!isAuthenticated && <a onClick={login}>login</a>}
      {isAuthenticated && <a onClick={logout}>logout</a>}
    </div>
  );
}

AuthenticationComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
