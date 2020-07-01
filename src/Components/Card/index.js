import React from "react";

const Card = (props) => {
  return <div className="bg-gray-100 p-3 shadow-sm">{props.children}</div>;
};

export default Card;
