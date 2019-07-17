import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Option from "./Option";
import { Icon } from "components/common";

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

  close = () => {
    this.setState({ open: false });
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

  handleOptionClick = option => () => {
    if (this.props.onChange) {
      this.props.onChange(option.value);
    }
    this.close();
  }

  handleKeyDown = e => {
    if (e.keyCode === 32) {
      // Spacebar clicked while main div was focused
      this.toggleOpen();
      e.preventDefault();
    }
  }

  handle

  render = () => {

    const { open } = this.state;
    const { children, className, value, options, placeholder, fullWidth, onChange, ...rest } = this.props;

    const classNames = cx(
      "select",
      { "select--open": open },
      { "select--fullWidth": fullWidth },
      className
    );

    const selectedValueText = this.getValueDisplayName();

    return (
      <div className={classNames} {...rest} tabIndex={0} onBlur={this.close} onKeyDown={this.handleKeyDown}>
        <div className="select__header" onClick={this.toggleOpen}>
          { 
            selectedValueText ? selectedValueText : 
            placeholder ? <span className="select__placeholder">{placeholder}</span> : <span />
          }
          <Icon name={open ? "caret-up" : "caret-down"} className="select__icon" />
        </div>
        <div className="select__options">
          {options.map(option => (
            <Option key={option.value} {...option} isSelected={option.value === value} onClick={this.handleOptionClick(option)} />
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