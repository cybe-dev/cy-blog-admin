import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const ShowPage = props.component;
  return (
    <Route path={props.path} exact={props.exact}>
      {!props.auth ? (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      ) : (
        <ShowPage
          setTitle={props.setTitle}
          setHeaderShown={props.setHeaderShown}
          jwt={props.auth}
        />
      )}
    </Route>
  );
};

export default PrivateRoute;
