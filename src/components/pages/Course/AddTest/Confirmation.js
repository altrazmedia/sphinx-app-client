import React from "react";
import PropTypes from "prop-types";
import { Loader, ErrorMessage, Button, Icon } from "components/common";
import { Trans } from "react-i18next";

const Confirmation = props => {
  const { success, error, close, previous } = props;

  if (!success && !error) {
    // Operation hasn't been processed yet
    return <Loader />;
  }

  if (error) {
    return (
      <div style={{ minHeight: 150 }}>
        <ErrorMessage
          content={
            <span>
              <Trans i18nKey="operationError" /> ({error.status}){" "}
            </span>
          }
        />
        <hr />
        <Button
          variant="icon"
          icon="angle-left"
          size="small"
          onClick={previous}
        />
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ minHeight: 150 }}>
        <h3 style={{ textAlign: "center" }}>
          <Icon name="check-circle" color="success" />
          <Trans i18nKey="course.testAdded" />
        </h3>
        <Button.Group align="center">
          <Button variant="text" onClick={close}>
            <Trans i18nKey="close" />
          </Button>
        </Button.Group>
      </div>
    );
  }
};

Confirmation.propTypes = {
  success: PropTypes.bool, // test has been added
  error: PropTypes.object, // object with error informations, can be undefined
  previous: PropTypes.func.isRequired, // going back to previous step
  close: PropTypes.func.isRequired, // closing the window
};

export default Confirmation;
