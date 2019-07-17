import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import uniqueid from "lodash.uniqueid";

class Checkbox extends PureComponent {

  _id = uniqueid("checkbox_");
  state = {
    isActive: false
  }

  handleFocus = () => {
    this.setState({ isActive: true })
  }

  handleBlur = () => {
    this.setState({ isActive: false })
  }

  handleKeyDown = e => {
    if (e.keyCode === 32) {
      // space bar pressed 
      e.preventDefault();
      if (!this.props.disabled) {
        this.inputRef.click();
      }
    }
  }

  render = () => {
    const { checked, onChange, className, disabled, label, ...rest } = this.props;
    const { isActive } = this.state;
  
    const classNames = cx(
      "checkbox",
      { "checkbox--checked": checked },
      { "checkbox--disabled": disabled },
      { "checkbox--active": isActive },
      className
    );
  
    return (
      <div className={classNames} {...rest} tabIndex={0} onKeyDown={this.handleKeyDown} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <label className="checkbox__label" htmlFor={this._id}>
          {label}
        </label>
        <input 
          disabled={Boolean(disabled)}
          id={this._id}
          type="checkbox"
          onChange={onChange}
          className="checkbox__input"
          ref={el => this.inputRef = el}
        />
      </div>
    )

  }


}

Checkbox.defaultProps = {
  label: ""
}

Checkbox.propTypes = {
  label: PropTypes.node,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default Checkbox;