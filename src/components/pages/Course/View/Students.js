import React from "react";
import PropTypes from "prop-types";

import { ColumnView, Illustration } from "components/common";
import { Trans } from "react-i18next";

const CourseStudents = props => {

  const { students } = props;

  if (students.length === 0) {
    return <Illustration variant="empty" description={<Trans i18nKey="course.noStudents" />} />;
  }

  return (
    <ColumnView>
      {
        students.map(student => (
          <ColumnView.Item 
            key={student._id}
            name={student.label}
            value={student.email}
          />
        ))
      }
    </ColumnView>
  )

}

CourseStudents.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired
  // list of students
}

export default CourseStudents;