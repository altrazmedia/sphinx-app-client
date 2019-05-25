import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { Icon } from "components/common";


const ErrorMessage = props => {

  const { content, fullWidth, className, ...rest } = props;

  if (!content) {
    return null
  }

  const classNames = cx(
    "error-message",
    { fullWidth },
    className
  );

  return (
    <div className={classNames} {...rest}>
      <Icon color="inverted" name="exclamation-triangle" className="error-message__icon" />
      {content}
    </div>
  )
  

}

ErrorMessage.propTypes = {
  content: PropTypes.node,
  fullWidth: PropTypes.bool
}

export default ErrorMessage;