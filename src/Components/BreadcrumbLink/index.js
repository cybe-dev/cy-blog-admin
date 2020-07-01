import React from "react";
import { Link } from "react-router-dom";

const BreadcrumbLink = (props) => {
  return (
    <li>
      <Link to={props.path} className="text-blue-800">
        {props.title}
      </Link>
    </li>
  );
};

export default BreadcrumbLink;
