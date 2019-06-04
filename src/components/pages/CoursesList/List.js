import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Trans } from "react-i18next";
import { Button } from "components/common";

const CoursesListTable = props => {

  const { courses, displayedData } = props;

  const displayAll = displayedData.includes("all");

  return (
    <div className="segment">
      <table className="table">
        <thead>
          <tr>
            { (displayAll || displayedData.includes("code")) && <th><Trans i18nKey="code" /></th> }
            { (displayAll || displayedData.includes("subject")) && <th><Trans i18nKey="subject" /></th> }
            { (displayAll || displayedData.includes("group")) && <th><Trans i18nKey="group" /></th> }
            { (displayAll || displayedData.includes("teacher")) && <th><Trans i18nKey="users.teacher" /></th> }
            { (displayAll || displayedData.includes("details")) && <th><Trans i18nKey="details" /></th> }
          </tr>
        </thead>
        <tbody>
          {
            courses.map(course => {
              return (
                <tr key={course._id}>
                  { (displayAll || displayedData.includes("code")) && <td>{course.code.toUpperCase()}</td> }
                  { (displayAll || displayedData.includes("subject")) && <td>{course.subject.name}</td> }
                  { (displayAll || displayedData.includes("group")) && 
                    <td>
                      <Link to={`/group/${course.group.code}`} className="text-link">
                        {course.group.name}
                      </Link>
                    </td> 
                  }
                  { (displayAll || displayedData.includes("teacher")) && <td>{course.teacher.label}</td> }
                  { (displayAll || displayedData.includes("details")) && 
                    <td>
                      <Button variant="icon" icon="arrow-right" color="primary" size="small" to={`/course/${course.code}`} />
                    </td>
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )

}

CoursesListTable.defaultProps = {
  displayedData: []
}

CoursesListTable.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  displayedData: PropTypes.arrayOf(PropTypes.oneOf([
    "code", "subject", "group", "teacher", "details", "all"
  ]))
}

export default CoursesListTable;