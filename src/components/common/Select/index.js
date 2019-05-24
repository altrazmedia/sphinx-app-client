import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Option from "./Option";
import { Icon } from "components/common";

// TODO: close options on outside click
// TODO: aria and tabindex
class Select extends PureComponent {

  state = {
    open: false
  }

  toggleOpen = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  /**
   * Search for selected option and get it's 'text' property
   * @returns {String}
   */
  getValueDisplayName = () => {
    const { value, options } = this.props;
    const matchedOption = options.find(option => option.value === value);
    if (matchedOption) { return matchedOption.text || "" }
    return ""; 
  }

  onOptionClick = option => () => {
    if (this.props.onChange) {
      this.props.onChange(option.value);
    }
  }

  render = () => {

    const { open } = this.state;
    const { children, className, value, options, placeholder, fullWidth, onChange, ...rest } = this.props;

    const classNames = cx(
      "select",
      { open },
      { fullWidth },
      className
    );

    const selectedValueText = this.getValueDisplayName();

    return (
      <div className={classNames} {...rest} onClick={this.toggleOpen}>
        <div className="select__header">
          { 
            selectedValueText ? selectedValueText : 
            placeholder ? <span className="select__placeholder">{placeholder}</span> : "" 
          }
          <Icon name={open ? "caret-up" : "caret-down"} className="select__icon" />
        </div>
        <div className="select__options">
          {options.map(option => (
            <Option key={option.value} {...option} isSelected={option.value === value} onClick={this.onOptionClick(option)} />
          ))}
        </div>
      </div>
    )

  }


}

Select.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.node.isRequired
    })
  ),
  onChange: PropTypes.func,
  placeholder: PropTypes.node
}

export default Select;