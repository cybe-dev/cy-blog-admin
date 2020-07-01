import React from "react";

const InputText = (props) => {
  return (
    <div>
      <label className="text-gray-700 text-sm">{props.label}</label>
      <input
        type={props.type}
        className="mt-1 mb-3 block bg-white w-full p-1 rounded-sm border border-gray-400 focus:border-gray-700 text-gray-700 text-sm"
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default InputText;
