import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Ink from "react-ink";


import Icon from "../Icon";

const FAB = props => {

  const { icon, to, children, ...rest } = props;


  const btn = (
    <button className="fab" {...rest}>
      <Icon name={icon} size="small" color="inverted" />
      <Ink radius={80} />
    </button>
  )

  return to ? <Link to={to}>{btn}</Link> : btn;

}

FAB.propTypes = {
  icon: PropTypes.string.isRequired,
  // Icon name
  to: PropTypes.string,
  // path to redirect to; button will be rendered as a Link if "to" is provided
}

export default FAB;