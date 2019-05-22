import React from "react";
import PropTypes from "prop-types";

/** Simple heading with description */
const PageHeader = (props) => {

  const { className, header, description, ...rest } = props;

  return (
    <header className={`page-header ${className || ""}`} {...rest}>
      { header && <h1 className="page-header__header">{header}</h1> }
      { description && <p className="page-header__description">{description}</p> }
    </header>
  )

}

PageHeader.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string
}

export default PageHeader;