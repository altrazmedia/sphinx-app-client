import React from "react";

const ModalContent = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={`modal__content ${className || ""}`} {...rest}>
      {children}
    </div>
  )
}

ModalContent.defaultProps = {
  className: ""
}

export default ModalContent;