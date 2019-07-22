import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const SelectOption = props => {
  const { text, isSelected, className, ...rest } = props;

  const classNames = cx(
    "select__option",
    { "select__option--selected": isSelected },
    className
  );

  return (
    <div {...rest} className={classNames}>
      { text }
    </div>
  )

}

SelectOption.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.node.isRequired,
}

export default SelectOption;