import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";

const Results = props => {

  const { attempts, questions, status } = props.test;

  const getScore = score => {
    if (score === undefined) { return "-" }
    const className = score >= 50 ? "text-success" : "text-error";
    return <span className={className}>{score} %</span>
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th><Trans i18nKey="student" /></th>
          <th><Trans i18nKey="test.questionAnswered" /></th>
          {
            status === "finished" ? 
              <>
                <th><Trans i18nKey="test.score" /></th>
              </>
            : null
          }
        </tr> 
      </thead>
      <tbody>
        {
          attempts.map(attempt => (
            <tr key={attempt._id}>
              <td>{attempt.student.label}</td>
              <td>{attempt.answered} / {questions.length}</td>
              {
                status === "finished" ? 
                  <>
                    <td>{getScore(attempt.score)}</td>
                  </>
                : null
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )

}

Results.propTypes = {
  test: PropTypes.object.isRequired, // whole test data
}

export default Results;