import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Icon = (props) => {

  const { color, size, name, className, ...rest } = props;

  const classNames = cx(
    "icon",
    `fas fa-${name}`,
    `icon--color-${color}`,
    `icon--size-${size}`,
    className
  );

  return (
    <i className={classNames} {...rest} />
  )

}

Icon.defaultProps = {
  color: "default",
  size: "default"
}

Icon.propTypes = {
  color: PropTypes.oneOf([ "default", "primary", "secondary", "error", "success", "inverted" ]),
  size: PropTypes.oneOf([ "default", "big", "small" ]),
  name: PropTypes.string.isRequired, // FontAwesome icon name
}

export default Icon;