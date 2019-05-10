import React from "react";
import PropTypes from "prop-types";
import Ink from "react-ink";
import cx from "classnames";

import { Icon } from "components/common";

const Button = props => {

  const { color, type, content, children, icon, iconPosition, className, ...rest } = props;

  const classNames = cx(
    "button",
    `color-${color}`,
    `type-${type}`,
    { [`icon-position-${iconPosition}`]: type !== "icon" },
    className
  )

  const _content = type === "icon" ? null : content || children;
  const _icon = icon ? <Icon name={icon} key="icon" /> : null;
  
  const toRender = iconPosition === "left" ? [ _icon, _content ] : [ _content, _icon ];

  return (
    <button
      className={classNames}
      {...rest}
    >
      {toRender}
      {!props.disabled && <Ink radius={80} />}
    </button>
  )
  
}

Button.defaultProps = {
  color: "default",
  type: "default",
  iconPosition: "right",
  disabled: false
}

Button.propTypes = {
  color: PropTypes.oneOf([ "default", "primary", "secondary", "error", "success" ]),
  type: PropTypes.oneOf([ "default", "text", "icon" ]),
  icon: PropTypes.string, // Icon name
  iconPosition: PropTypes.oneOf([ "left", "right" ]),
  content: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button;