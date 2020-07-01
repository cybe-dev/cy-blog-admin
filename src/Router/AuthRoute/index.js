import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = (props) => {
  const ShowPage = props.component;
  return (
    <Route path={props.path}>
      {props.auth ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : (
        <ShowPage
          jwtHandler={props.jwtHandler}
          setHeaderShown={props.setHeaderShown}
          setTitle={props.setTitle}
        />
      )}
    </Route>
  );
};

export default AuthRoute;
