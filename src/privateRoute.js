import React from "react";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import SignIn from "./components/signin";

const PrivateRoute = (props) => {
  const { path, component, homeAuthenticated } = props;
  const token = useSelector((state) => state.profile.user.token);
  let isAuthenticated = token;
  // try {
  //   jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
  //   isAuthenticated = true;
  // } catch (err) {
  //   isAuthenticated = false;
  // }

  //
  // if (homeAuthenticated)
  //   return isAuthenticated ? (
  //     <Redirect to={{ pathname: "/home" }} />
  //   ) : (
  //     <Route {...props} />
  //   );

  return isAuthenticated ? (
      <Route {...props} />
     // <Redirect to={{ pathname: path + "" }} />
  ) : (
      <Route path = "/" component={SignIn} />
  );
};

export default PrivateRoute;
