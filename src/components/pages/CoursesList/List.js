import React from "react";
import PropTypes from "prop-types";

import { Trans } from "react-i18next";
import { Button } from "components/common";

const CoursesListTable = props => {

  const { courses } = props;

  return (
    <div className="segment">
      <table className="table">
        <thead>
          <tr>
            <th><Trans i18nKey="code" /></th>
            <th><Trans i18nKey="subject" /></th>
            <th><Trans i18nKey="group" /></th>
            <th><Trans i18nKey="details" /></th>
          </tr>
        </thead>
        <tbody>
          {
            courses.map(course => {
              return (
                <tr key={course._id}>
                  <td>{course.code.toUpperCase()}</td>
                  <td>{course.subject.name || course.subject.code || "-"}</td>
                  <td>{course.group.name || course.group.code || "-"}</td>
                  <td>
                    <Button variant="icon" icon="arrow-right" color="primary" size="small" to={`/course/${course.code}`} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )

}

CoursesListTable.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default CoursesListTable;