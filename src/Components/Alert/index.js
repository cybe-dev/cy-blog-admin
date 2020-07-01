import React from "react";

const Alert = (props) => {
  const className =
    "my-3 bg-" +
    props.color +
    "-200 p-2 rounded-sm border border-" +
    props.color +
    "-300 text-" +
    props.color +
    "-700 text-sm";

  return (
    <div style={props.style} className={className}>
      {props.body}
    </div>
  );
};

export default Alert;
