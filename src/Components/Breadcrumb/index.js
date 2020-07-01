import React from "react";

const Breadcrumb = (props) => {
  return <ul className="breadcrumb text-sm">{props.children}</ul>;
};

export default Breadcrumb;
