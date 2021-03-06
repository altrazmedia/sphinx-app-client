import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import uniqueid from "lodash.uniqueid";

class Checkbox extends PureComponent {
  _id = uniqueid("checkbox_");
  state = {
    isActive: false,
  };

  /** onFocus event on main div */
  handleFocus = () => {
    this.setState({ isActive: true });
  };

  /** onBlur event on main div */
  handleBlur = () => {
    this.setState({ isActive: false });
  };

  handleKeyDown = e => {
    if (e.keyCode === 32) {
      // space bar pressed
      e.preventDefault();
      this.inputRef.click(); // Simulating the click event on input
    }
  };

  /** Creating ref to the input element */
  handleInputRef = el => {
    this.inputRef = el;
  };

  render = () => {
    const {
      checked,
      onChange,
      className,
      disabled,
      label,
      ...rest
    } = this.props;
    const { isActive } = this.state;

    const classNames = cx(
      "checkbox",
      { "checkbox--checked": checked },
      { "checkbox--disabled": disabled },
      { "checkbox--active": isActive },
      className
    );

    return (
      <div
        className={classNames}
        {...rest}
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <label className="checkbox__label" htmlFor={this._id}>
          {label}
        </label>
        <input
          disabled={Boolean(disabled)}
          id={this._id}
          type="checkbox"
          onChange={onChange}
          className="checkbox__input"
          ref={this.handleInputRef}
        />
      </div>
    );
  };
}

Checkbox.defaultProps = {
  label: "",
};

Checkbox.propTypes = {
  label: PropTypes.node,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
