import React from "react";
import PropTypes from "prop-types";

import { ColumnView, Icon } from "components/common";
import { Trans } from "react-i18next";

const CourseMainInfo = props => {

  const { course } = props;

  return (
    <>
      {
        course.my_access === "student" || course.my_access === "teacher" ? 
          <>
            <p className="text-light"> 
              <Icon size="small" name={course.my_access === "student" ? "user-graduate" : "user-tie"} />
              <Trans i18nKey={`course.my_access.${course.my_access}`} />
            </p>
            <hr />
          </>
        : null
      }
      <ColumnView>
        <ColumnView.Item 
          name={<Trans i18nKey="course.teacher" /> }
          value={course.teacher.label}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="subject" /> }
          value={course.subject.name}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="group" /> }
          value={course.group.code.toUpperCase()}
        />
      </ColumnView>
    </>
  )

}

CourseMainInfo.propTypes = {
  course: PropTypes.object.isRequired
  // course data
}

export default CourseMainInfo;