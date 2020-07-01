import React from "react";
import { Link } from "react-router-dom";

const Parent = (props) => {
  return (
    <div className={props.menuDisplay + " lg:block m-3"}>
      <ul>{props.children}</ul>
    </div>
  );
};

const List = (props) => {
  const className =
    "flex w-full text-sm text-gray-400 hover:text-white items-center roboto hover:bg-blue-900 rounded-md px-3 py-1 my-2";

  const Icon = props.icon;

  const onClick = (e) => {
    if (props.onClick) {
      props.onClick(e);
    }
    props.toggle(e);
  };

  if (props.type == "link") {
    return (
      <Link to={props.to} className={className} onClick={onClick}>
        <Icon className="mr-4" /> {props.title}
      </Link>
    );
  }
  if (props.type == "button") {
    return (
      <button type="button" className={className} onClick={onClick}>
        <Icon className="mr-4" /> {props.title}
      </button>
    );
  }
};

export { Parent, List };
