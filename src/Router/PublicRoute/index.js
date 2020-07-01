import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = (props) => {
  const ShowPage = props.component;
  return (
    <Route path={props.path} exact={props.exact}>
      <ShowPage
        setTitle={props.setTitle}
        setHeaderShown={props.setHeaderShown}
      />
    </Route>
  );
};

export default PublicRoute;
