import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Trans } from "react-i18next";

const Scores = props => {

  const { students, tests } = props;

  const trimText = text => {
    if (text.length > 30) {
      return text.slice(0, 27) + "..."
    }
    return text 
  }

  /**
   * Gets the score of every test written by the given students and calculates the average score
   * @returns {Object} { average: average score (in %); scores: array of scores, with testName and unique key provided, in the same orded as tests in table header  }
   */
  const getStudentScores = studentId => {
    let totalPercentage = 0; // sum of scores
    let numberOfTests = 0; // number of tests the student took part in
    const scores = tests.map(test => {
      const userAttempt = test.attempts.find(attempt => attempt.student._id === studentId);
      if (userAttempt) {
        totalPercentage += userAttempt.score;
        numberOfTests++;
      }
      return {
        key: test._id,
        testName: test.testSchema.name,
        score: userAttempt ? userAttempt.score : null
      }
    })

    const average = numberOfTests === 0 ? 0 : totalPercentage / numberOfTests;

    return { scores, average }

  }

  return (
    <table className="table scores-table">
      <thead>
        <tr>
          <th><Trans i18nKey="student" /></th>
          {
            tests.map(test => (
              <th key={test._id} title={test.testSchema.name} className="scores-table__test-name"> 
                <Link to={`/test/${test._id}`}>
                  {trimText(test.testSchema.name)}
                </Link>
              </th>
            ))
          }
          <th><Trans i18nKey="test.scoresAverage" /></th>
        </tr>
      </thead>
      <tbody>
        {
          students.map(student => {
            const { scores, average } = getStudentScores(student._id);
            return (
              <tr key={student._id}>
                <td>{student.label}</td>
                {
                  scores.map(score => (
                    <td key={score.key} title={score.testName}>
                      {score.score === null ? "-" : score.score + " %"}
                    </td>
                  ))
                }
                <td>{average} %</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Scores;