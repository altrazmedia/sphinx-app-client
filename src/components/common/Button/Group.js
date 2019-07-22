import React from "react";
import PropTypes from "prop-types";

const ButtonGroup = props => {

  const { className, align, ...rest } = props;

  return (
    <div className={`buttons-group buttons-group--align-${align} ${className}`} {...rest} />
  )

}

ButtonGroup.defaultProps = {
  align: "left",
  className: ""
}

ButtonGroup.propTypes = {
  align: PropTypes.oneOf([ "left", "center", "right", "space-between" ]),
}

export default ButtonGroup;