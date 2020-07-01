import React from "react";

const Base = (props) => {
  if (props.isShowing) {
    return (
      <div className="z-50 fixed top-0 right-0 left-0 h-full bg-black bg-opacity-75 flex items-start justify-center">
        <div className="bg-white w-full md:w-1/2 my-12 mx-5 p-5 rounded-sm shadow-md">
          {props.children}
        </div>
      </div>
    );
  }
  return null;
};

const Head = (props) => {
  return (
    <h4 className="text-lg text-gray-700 font-bold mb-3 roboto border-b pb-3">
      {props.children}
    </h4>
  );
};

const Foot = (props) => {
  return <div className="flex justify-end">{props.children}</div>;
};

export { Base, Head, Foot };
