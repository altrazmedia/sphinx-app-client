import React from "react";
import PropTypes from "prop-types";

const Menu = props => {

  const { items, value, onChange, className, ...rest } = props;

  const handleItemClick = item => () => {
    if (onChange) {
      onChange(item.value)
    }
  }

  return (
    <div className="menu" {...rest}>
      <ul className="menu__list">
        {
          items.map(item => {
            const isActive = item.value === value;
            return (
              <li className={`menu__item ${isActive ? "active" : ""}`} onClick={handleItemClick(item)}>
                {item.text}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

Menu.defaultProps = {
  items: []
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.node,
    value: PropTypes.string.isRequired
  })),
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default Menu;
