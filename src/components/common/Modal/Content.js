import React from "react";

const Content = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={`modal__content ${className || ""}`} {...rest}>
      {children}
    </div>
  )
}

Content.defaultProps = {
  className: ""
}

export default Content;