import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import SignIn from "./components/signin";

const PrivateRoute = (props) => {
  const { homeAuthenticated } = props;
  const token = useSelector((state) => state.profile.user.token);
  let isAuthenticated = token;

  if (homeAuthenticated)
    return isAuthenticated ? (
      <Redirect to={{ pathname: "/home" }} />
    ) : (
      <Route {...props} />
    );

  return isAuthenticated ? (
      <Route {...props} />
  ) : (
      <Route path = "/" component={SignIn} />
  );
};

export default PrivateRoute;
