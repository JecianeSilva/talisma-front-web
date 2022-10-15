import React from "react";
import { Redirect, Route } from "react-router-dom";
import { store } from "../../store";

function RouteComponent({ component: Component, isPrivate, isAdmin, ...rest }) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/home" />;
  }
  return <Route component={Component} {...rest} />;
}

export default RouteComponent;
