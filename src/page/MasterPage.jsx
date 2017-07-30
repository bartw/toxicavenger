import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Header from "./Header";
import Page from "./Page";
import Footer from "./Footer";

export default function MasterPage({ user, login, logout }) {
  return (
    <Router>
      <div>
        <Header user={user} login={login} logout={logout} />
        <Page user={user} />
        <Footer />
      </div>
    </Router>
  );
}
