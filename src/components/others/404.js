import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { Illustration } from "components/common";

// The 404 Page
const NotFound = props => {
  const { t } = props;

  return (
    <Illustration
      image="notfound"
      header={t("404.header")}
      description={
        <span>
          {`${t("404.description")} `}
          <Link className="text-link" to="/">
            {t("404.goBack")}
          </Link>
        </span>
      }
    />
  );
};

export default withTranslation()(NotFound);
