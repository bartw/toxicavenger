import React from "react";
import PropTypes from 'prop-types';

export default function AuthenticationComponent({ isAuthenticated, name, login, logout }) {
  return (
    <div>
      <h2>
        Welcome {name}
      </h2>
      {!isAuthenticated && <button onClick={login}>login</button>}
      {isAuthenticated && <button onClick={logout}>logout</button>}
    </div>
  );
}

AuthenticationComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
