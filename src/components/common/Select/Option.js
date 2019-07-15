import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Option = props => {
  const { onClick, text, isSelected, className, ...rest } = props;

  const classNames = cx(
    "select__option",
    { "select__option--selected": isSelected },
    className
  );

  return (
    <div {...rest} className={classNames} onClick={onClick}>
      { text }
    </div>
  )

}

Option.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.node.isRequired,
}

export default Option;