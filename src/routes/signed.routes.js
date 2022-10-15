import React, { Suspense } from "react";
import { Switch } from "react-router-dom";

import Loading from "../components/Loading";
import RouteComponent from "./Route";

import { listRoutes } from "../pages/index";

function SignedRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {listRoutes.map((route) => (
          <RouteComponent
            component={route.component}
            path={route.path}
            key={route.path}
            exact
            isPrivate={route.private}
          />
        ))}
      </Switch>
    </Suspense>
  );
}

export default SignedRoutes;
