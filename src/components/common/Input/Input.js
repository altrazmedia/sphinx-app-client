import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { Icon } from "components/common";

class Input extends PureComponent {

  state = {
    isActive: false
  }

  toggleActive = isActive => () => {
    this.setState({ isActive })
  }


  render = () => {

    const { fullWidth, className, icon, error, ...rest } = this.props;
    const { isActive } = this.state;

    const classNames = cx(
      "input",
      { fullWidth },
      { error },
      { active: isActive },
      className
    );
  
    return (
      <div className={classNames}>
        { icon && <div className="input__icon-wrapper"><Icon name={icon} className="input__icon" /></div>  }
        <input
          className="input__input"
          onFocus={this.toggleActive(true)}
          onBlur={this.toggleActive(false)}
          {...rest}
        />
        { typeof error === "string" && error.length > 0 && <span className="input__error">{error}</span> }
      </div>
    )
  }

}

Input.ptopTypes = {
  fullWidth: PropTypes.bool, // true -> Input gets full width of its parent
  icon: PropTypes.string, // name of icon to be dislpayed
  error: PropTypes.oneOfType([
    PropTypes.string, // error message to be displayed below the input
    PropTypes.bool // input is displayed in `error` colors
  ])
}

export default Input;