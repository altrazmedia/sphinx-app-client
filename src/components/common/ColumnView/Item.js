import React from "react";
import PropTypes from "prop-types";

const ColumnViewItem = props => {
  const { name, value, className, ...rest } = props;

  return (
    <div className={`column-view__item ${className || ""}`} {...rest}>
      <div className="column-view__name">{name}</div>
      <div className="column-view__value">{value}</div>
    </div>
  );
};

ColumnViewItem.propTypes = {
  name: PropTypes.node,
  value: PropTypes.node,
};

export default ColumnViewItem;
