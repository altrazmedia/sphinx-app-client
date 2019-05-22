import React from "react";
import PropTypes from "prop-types";

import * as svgImages from "images/svgImages";

/** SVG image with header and description */
const Illustration = props => {

  const { header, description, image, className, ...rest } = props;

  const _image = React.createElement(svgImages[image] || "span", { className: "illustration__svg" });

  return (
    <div className={`illustration ${className || ""}`} {...rest}>
      {_image}
      { header && <h2 className="illustration__header">{header}</h2> }
      { description && <p className="illustration__description">{description}</p> }
    </div>
  );

}


Illustration.propTypes = {
  header: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string // name of the svg file
}

export default Illustration;