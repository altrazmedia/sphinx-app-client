import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import { Button } from "components/common";

const TestSolveConfirmation = props => {
  const { totalQuestions, answeredQuestions, close, t } = props;

  let translationString = "someAnswers"; // string to match a suitable translation key
  let headerClass = ""; // color of the header

  if (answeredQuestions === 0) {
    translationString = "zeroAnswers";
    headerClass = "text-error";
  } else if (answeredQuestions === totalQuestions) {
    translationString = "allAnswers";
    headerClass = "text-success";
  }

  return (
    <>
      <div className="test-solve__info">
        <h2 className={headerClass}>
          {t(`testSolve.${translationString}.header`, {
            total: totalQuestions,
            answered: answeredQuestions,
          })}
        </h2>
        <p>{t(`testSolve.${translationString}.description`)}</p>
        <Button variant="text" onClick={close}>
          {t("close")}
        </Button>
      </div>
    </>
  );
};

TestSolveConfirmation.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  // total number of questions
  answeredQuestions: PropTypes.number.isRequired,
  // number of question the user have provided answers to
  close: PropTypes.func.isRequired,
  // closing the window
};

export default withTranslation()(TestSolveConfirmation);
