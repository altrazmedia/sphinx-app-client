import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

import { Button, Illustration } from "components/common";
import { Trans } from "react-i18next";


const List = props => {

  const { tests, status } = props;

  if (tests.length === 0) {
    return <Illustration variant="empty" description={<Trans i18nKey={`tests.empty.${status}`} />} />
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th><Trans i18nKey="test" /></th>
          <th><Trans i18nKey="course" /></th>
          <th><Trans i18nKey="test.start" /></th>
          <th><Trans i18nKey="test.end" /></th>
          { tests[0].hasOwnProperty("questionsAnswered") && <th><Trans i18nKey="test.questionAnswered" /></th> }
          <th><Trans i18nKey="details" /></th>
        </tr>
      </thead>
      <tbody>
        {
          tests.map(test => (
            <tr key={test._id}>
              <td>{test.testSchema.name}</td>
              <td>
                <Link to={`/course/${test.course.code}`} className="text-link">
                  {test.course.code.toUpperCase()}
                </Link>
              </td>
              <td>{moment.utc(test.start).local().format("DD.MM.YYYY HH:mm")}</td>
              <td>{moment.utc(test.end).local().format("DD.MM.YYYY HH:mm")}</td>
              { test.hasOwnProperty("questionsAnswered") && <td>{test.questionsAnswered} / {test.questionsQuantity}</td> }
              <td>
                <Button variant="icon" icon="arrow-right" size="small" color="primary" to={`/test/${test._id}`} />
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )

}

List.propTypes = {
  status: PropTypes.oneOf([ "ongoing", "pending", "finished" ]).isRequired,
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default List;