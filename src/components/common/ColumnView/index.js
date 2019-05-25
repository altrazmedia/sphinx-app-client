import React from "react";

import Item from "./Item";

const ColumnView = props => {

  const { children, className, ...rest } = props;

  return (
    <div className={`column-view ${className || ""}`} {...rest}>
      {children}
    </div>
  )
 
}

ColumnView.Item = Item;

export default ColumnView;