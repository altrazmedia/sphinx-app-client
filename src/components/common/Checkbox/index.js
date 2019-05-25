import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import uniqueid from "lodash.uniqueid";

class Checkbox extends PureComponent {

  constructor(props) {
    super(props);
    this._id = uniqueid("checkbox_")
  }

  render = () => {
    const { checked, onChange, className, disabled, label, ...rest } = this.props;
  
    const classNames = cx(
      "checkbox",
      { checked },
      { disabled },
      className
    );
  
    return (
      <div className={classNames} {...rest}>
        <label className="checkbox__label" htmlFor={this._id}>
          {label}
        </label>
        <input 
          disabled={Boolean(disabled)}
          id={this._id}
          type="checkbox"
          onChange={onChange}
          className="checkbox__input"
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