import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Container from "./Container";
import Footer from "./Footer";

export default function Content({ user, login, logout }) {
  return (
    <Router>
      <div>
        <Header user={user} login={login} logout={logout} />
        <Container user={user} />
        <Footer />
      </div>
    </Router>
  );
}