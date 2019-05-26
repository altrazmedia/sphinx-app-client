import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Ink from "react-ink";
import cx from "classnames";

import { Icon } from "components/common";

const Button = props => {

  const { color, type, variant, content, to, children, icon, iconPosition, size, className, ...rest } = props;

  const classNames = cx(
    "button",
    `color-${color}`,
    `variant-${variant}`,
    `size-${size}`,
    { [`icon-position-${iconPosition}`]: variant !== "icon" },
    className
  )

  const _content = variant === "icon" ? null : content || children;
  const _icon = icon ? <Icon name={icon} key="icon" size="small" /> : null;
  
  const toRender = iconPosition === "left" ? [ _icon, _content ] : [ _content, _icon ];

  const _btn = (
    <button
      className={classNames}
      type={type}
      {...rest}
    >
      {toRender}
      {!props.disabled && <Ink radius={80} />}
    </button>
  )

  return to ? <Link to={to}>{_btn}</Link> : _btn;
  
}

Button.defaultProps = {
  color: "default",
  variant: "default",
  iconPosition: "right",
  size: "default",
  disabled: false,
  type: "button"
}

Button.propTypes = {
  color: PropTypes.oneOf([ "default", "primary", "secondary", "error", "success" ]),
  variant: PropTypes.oneOf([ "default", "text", "icon" ]),
  size: PropTypes.oneOf([ "default", "small" ]), // 'small' works only with 'icon' variant
  icon: PropTypes.string, // Icon name
  iconPosition: PropTypes.oneOf([ "left", "right" ]),
  content: PropTypes.string,
  disabled: PropTypes.bool,
  to: PropTypes.string // if provided, Button will be rendered as router Link and will pass 'to' prop
}

export default Button;