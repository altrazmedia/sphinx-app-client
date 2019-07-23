import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import moment from "moment";

import { Illustration, Button } from "components/common";

// Displaying the results of tests completed by logged user
const MyResults = props => {
  const { tests } = props;

  if (tests.length === 0) {
    return (
      <Illustration
        variant="empty"
        description={<Trans i18nKey="course.myResults.empty" />}
      />
    );
  }

  const getScoreAverage = () => {
    let scoreSum = 0;
    tests.forEach(test => {
      scoreSum += test.attempt.score;
    });

    if (scoreSum === 0) {
      return 0;
    }
    return Math.floor((100 * scoreSum) / tests.length) / 100;
  };

  return (
    <div className="segment">
      <h3>
        <Trans i18nKey="course.myResults.average" />: {getScoreAverage()}%
      </h3>
      <table className="table" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>{<Trans i18nKey="test" />}</th>
            <th>{<Trans i18nKey="test.end" />}</th>
            <th>{<Trans i18nKey="test.score" />}</th>
            <th>{<Trans i18nKey="details" />}</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test => (
            <tr key={test._id}>
              <td>{test.testSchema.name}</td>
              <td>
                {moment
                  .utc(test.end)
                  .local()
                  .format("DD.MM.YYYY HH:mm")}
              </td>
              <td>{test.attempt.score}%</td>
              <td>
                <Button
                  variant="icon"
                  size="small"
                  icon="arrow-right"
                  color="primary"
                  to={`/test/${test._id}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

MyResults.propTypes = {
  tetst: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MyResults;
