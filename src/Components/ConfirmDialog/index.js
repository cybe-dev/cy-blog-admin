import React from "react";
import Button from "../Button";

const ConfirmDialog = (props) => {
  if (props.isShowing) {
    return (
      <div className="z-50 fixed top-0 right-0 left-0 h-full bg-black bg-opacity-75 flex items-start justify-center">
        <div className="bg-white w-full md:w-1/3 my-12 mx-5 p-5 rounded-sm shadow-md">
          <h4 className="text-lg text-black font-bold mb-2">{props.title}</h4>
          <p className="mb-10">{props.body}</p>
          <div className="mt-5 pt-3 border-t flex justify-end">
            <Button type="button" className="mr-3 px-3" onClick={props.toggle}>
              Batal
            </Button>
            <Button
              type="button"
              color="blue"
              className="px-3"
              onClick={props.confirmed}
            >
              Hapus
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ConfirmDialog;
