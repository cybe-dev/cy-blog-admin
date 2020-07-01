import React from "react";

const Toast = (props) => {
  if (props.show) {
    return (
      <div className="fixed bottom-0 right-0 w-full lg:w-auto lg:p-5 fadeout">
        <div className="bg-green-600 w-full px-5 py-3 text-white rounded-sm shadow-md flex items-center">
          {props.children}
        </div>
      </div>
    );
  }

  return null;
};

export default Toast;
