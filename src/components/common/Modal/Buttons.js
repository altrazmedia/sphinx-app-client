import React from "react";

const ModalButtons = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={`modal__buttons ${className || ""}`} {...rest}>
      {children}
    </div>
  );
};

ModalButtons.defaultProps = {
  className: "",
};

export default ModalButtons;
