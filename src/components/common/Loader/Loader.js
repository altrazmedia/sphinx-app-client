import React from "react";

const Loader = props => {
  const { className, ...rest } = props;

  return (
    <div className={`loader ${className || ""}`} {...rest}>
      <div className="loader__preloader">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
