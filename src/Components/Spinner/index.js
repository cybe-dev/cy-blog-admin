import React from "react";
import { MagicSpinner } from "react-spinners-kit";

const Spinner = (props) => {
  const display = props.loading ? "flex" : "hidden";
  return (
    <div
      className={
        display +
        " items-center justify-center bg-black fixed top-0 right-0 left-0 h-full bg-opacity-50 z-50"
      }
    >
      <div className="bg-white flex flex-col items-center justify-center rounded-md py-5 px-12 shadow-md">
        <MagicSpinner size={60} color="#2c5282" loading={props.loading} />
        Loading
      </div>
    </div>
  );
};

export default Spinner;
