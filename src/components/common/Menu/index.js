import React from "react";
import PropTypes from "prop-types";

const Menu = props => {

  const { items, value, type, onChange, className, ...rest } = props;

  const handleItemClick = item => () => {
    if (onChange) {
      onChange(item.value)
    }
  }

  return (
    <div className={`menu menu--${type}`} {...rest}>
      <ul className="menu__list">
        {
          items.map(item => {
            const isActive = item.value === value;
            return (
              <li className={`menu__item ${isActive ? "active" : ""}`} onClick={handleItemClick(item)} key={item.value}>
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
  items: [],
  type: "primary"
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.node,
    value: PropTypes.string.isRequired
  })),
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.oneOf([ "primary", "secondary" ]), // size of menu items
}

export default Menu;
