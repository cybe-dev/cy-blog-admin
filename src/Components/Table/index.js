import React from "react";

const Responsive = (props) => {
  return (
    <div className="w-full overflow-auto">
      <table className="table-auto min-w-full">{props.children}</table>
    </div>
  );
};

const Thead = (props) => {
  let childOfChildren;
  const childrenWithProps = React.Children.map(props.children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (React.isValidElement(child)) {
      childOfChildren = React.Children.map(
        child.props.children,
        (childOfChildrenEach) => {
          if (React.isValidElement(childOfChildrenEach)) {
            return React.cloneElement(childOfChildrenEach, {
              classParent: " bg-gray-300",
            });
          }
          return childOfChildrenEach;
        }
      );
      return React.cloneElement(child, {
        children: childOfChildren,
      });
    }

    return child;
  });
  return <thead>{childrenWithProps}</thead>;
};

const Td = (props) => {
  let className = "p-2 border border-gray-400";
  if (props.className) {
    className += " " + props.className;
  }
  if (props.classParent) {
    className += " " + props.classParent;
  }
  return <td className={className}>{props.children}</td>;
};
const Th = (props) => {
  let className = "p-2 border border-gray-400 font-bold";
  if (props.className) {
    className += " " + props.className;
  }
  if (props.classParent) {
    className += " " + props.classParent;
  }
  return <th className={className}>{props.children}</th>;
};

export { Responsive, Td, Th, Thead };
