import React from "react";
import PropTypes from "prop-types";

import * as svgImages from "images/svgImages";
import { Trans } from "react-i18next";

/** SVG image with header and description */
const Illustration = props => {
  const { header, description, image, variant, className, ...rest } = props;

  const _imageName = image || imageNameByVariant[variant];
  const _image = React.createElement(svgImages[_imageName] || "span", {
    className: "illustration__svg",
  });
  const _header = header ? (
    header
  ) : headerKeyByVariant[variant] ? (
    <Trans i18nKey={headerKeyByVariant[variant]} />
  ) : null;
  const _description = description ? (
    description
  ) : descriptionKeyByVariant[variant] ? (
    <Trans i18nKey={descriptionKeyByVariant[variant]} />
  ) : null;

  return (
    <div className={`illustration ${className || ""}`} {...rest}>
      {_image}
      {_header && <h2 className="illustration__header">{_header}</h2>}
      {_description && (
        <p className="illustration__description">{_description}</p>
      )}
    </div>
  );
};

const imageNameByVariant = {
  empty: "empty",
  notPermitted: "warning",
  fetchError: "warning",
};

const headerKeyByVariant = {
  empty: "emptyBox",
  notPermitted: "accessDenied",
  fetchError: "somethingWrong",
};

const descriptionKeyByVariant = {
  notPermitted: "accessDenied.description",
  fetchError: "fetchError",
};

Illustration.propTypes = {
  header: PropTypes.node,
  description: PropTypes.node,
  image: PropTypes.string, // name of the svg file
  variant: PropTypes.oneOf(["empty", "notPermitted", "fetchError"]), // sets predefined headers and image
};

export default Illustration;
