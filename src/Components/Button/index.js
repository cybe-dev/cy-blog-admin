import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  let background, textColor, code, className;
  if (props.color == "blue") {
    code = 800;
    background = "blue";
    textColor = "white";
  } else if (props.color == "red") {
    code = 600;
    background = "red";
    textColor = "white";
  } else if (props.color == "green") {
    code = 600;
    background = "green";
    textColor = "white";
  } else if (props.color == "yellow") {
    code = 400;
    background = "yellow";
    textColor = "black";
  } else {
    code = 300;
    background = "gray";
    textColor = "black";
  }

  if (props.className) {
    className = props.className + " ";
  }

  if (props.type == "link") {
    return (
      <Link
        to={props.path}
        disabled={props.disabled}
        className={
          "py-1 px-2 inline-block " +
          className +
          "block bg-" +
          background +
          "-" +
          code +
          " text-" +
          textColor +
          " rounded-sm border border-" +
          background +
          "-" +
          (code + 100) +
          " focus:border-" +
          background +
          "-" +
          (code - 100) +
          " focus:bg-" +
          background +
          "-" +
          (code - 200) +
          " text-sm"
        }
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={
        "py-1 px-2 " +
        className +
        "block bg-" +
        background +
        "-" +
        code +
        " text-" +
        textColor +
        " rounded-sm border border-" +
        background +
        "-" +
        (code + 100) +
        " focus:border-" +
        background +
        "-" +
        (code - 100) +
        " focus:bg-" +
        background +
        "-" +
        (code - 200) +
        " text-sm"
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
