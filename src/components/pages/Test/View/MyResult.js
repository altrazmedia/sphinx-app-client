import React from "react";
import PropTypes from "prop-types";
import { ColumnView, Icon } from "components/common";
import { Trans } from "react-i18next";

const MyResult = props => {
  const { correctAnswers, score, questions } = props;

  return (
    <div className="my-result">
      <ColumnView>
        <ColumnView.Item
          name={<Trans i18nKey="test.score" />}
          value={
            <span className={score >= 50 ? "text-success" : "text-error"}>
              {score} %
            </span>
          }
        />
        <ColumnView.Item
          name={<Trans i18nKey="test.correctAnswers" />}
          value={
            <span>
              {correctAnswers} / {questions.length}
            </span>
          }
        />
      </ColumnView>
      {questions.map(question => (
        <div className="result-question" key={question._id}>
          <h3 className="result-question__header">
            <Icon
              name={question.correct ? "check-circle" : "times-circle"}
              color={question.correct ? "success" : "error"}
            />
            {question.content}
          </h3>
          <p className="result-question__answers">
            <span className="text-light">
              {<Trans i18nKey="test.yourAnswer" />}:{" "}
            </span>
            {question.options
              .filter(option => question.answer.includes(option._id))
              .map(option => option.content)
              .join(", ")}
          </p>
          <p className="result-question__answers">
            <span className="text-light">
              {<Trans i18nKey="test.correctAnswer" />}:{" "}
            </span>
            {question.options
              .filter(option => option.correct)
              .map(option => option.content)
              .join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

MyResult.propTypes = {
  correctAnswers: PropTypes.number.isRequired, // number of correct answers
  score: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MyResult;
