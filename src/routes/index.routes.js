import React from "react";
import { Router, Switch } from "react-router-dom";

import RouteComponent from "./Route";
import history from "../config/history";

import Login from "../pages/Login";
import Home from "../pages/Home";

import Layout from "../components/Layout/index";

export default function Route() {
  return (
    <Router history={history}>
      <Switch>
        <RouteComponent exact path="/" component={Login} isPrivate={false} />
        <RouteComponent exact path="/home" component={Home} isPrivate={true} />
        <Layout />
      </Switch>
    </Router>
  );
}
