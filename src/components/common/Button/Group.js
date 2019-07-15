import React from "react";
import PropTypes from "prop-types";

const Group = props => {

  const { children, className, align, ...rest } = props;

  return (
    <div className={`buttons-group buttons-group--align-${align} ${className}`} {...rest}>
      {children}
    </div>
  )

}

Group.defaultProps = {
  align: "left",
  className: ""
}

Group.propTypes = {
  align: PropTypes.oneOf([ "left", "center", "right", "space-between" ]),
}

export default Group;