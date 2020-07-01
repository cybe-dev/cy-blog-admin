import React from "react";

const Wrapper = (props) => {
  return (
    <div
      className={`flex flex-wrap lg:flex-no-wrap${
        props.className ? ` ${props.className}` : null
      }`}
    >
      {props.children}
    </div>
  );
};

const Card = (props) => {
  return (
    <div
      className={`bg-white p-3 flex items-center${
        props.className ? ` ${props.className}` : null
      }`}
    >
      {props.children}
    </div>
  );
};

const Icon = (props) => {
  return (
    <div
      className={`w-12 h-12 rounded-full${
        props.className ? ` ` + props.className : null
      } flex items-center justify-center text-3xl text-white mr-3`}
    >
      {props.children}
    </div>
  );
};

const Data = (props) => {
  return (
    <div>
      <div className="text-xl font-bold m-0 roboto">{props.value}</div>
      <div className="m-0 roboto">{props.label}</div>
    </div>
  );
};

export { Wrapper, Card, Icon, Data };
