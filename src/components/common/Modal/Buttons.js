import React from "react";

const Buttons = props => {

  const { children, className, ...rest } = props;

  return (
    <div className={`modal__buttons ${className || ""}`} {...rest}>
      {children}
    </div>
  )

}

Buttons.defaultProps = {
  className: ""
}


export default Buttons;