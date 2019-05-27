import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { ColumnView, Icon } from "components/common";
import { Trans } from "react-i18next";

const TestMainInfo = props => {

  const { test } = props;

  return (
    <>
      {
        test.my_access === "student" || test.my_access === "teacher" ? 
          <>
            <p className="text-light"> 
              <Icon size="small" name={test.my_access === "student" ? "user-graduate" : "user-tie"} />
              <Trans i18nKey={`test.my_access.${test.my_access}`} />
            </p>
            <hr />
          </>
        : null
      }
      <ColumnView>
        <ColumnView.Item 
          name={<Trans i18nKey="status" /> }
          value={<Trans i18nKey={`test.${test.status}`} />}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="test.start" /> }
          value={moment(test.start).local().format("DD.MM.YYYY HH:mm")}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="test.end" /> }
          value={moment(test.end).local().format("DD.MM.YYYY HH:mm")}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="course" /> }
          value={test.course.code.toUpperCase()}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="subject" /> }
          value={test.course.subject.name}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="course.teacher" /> }
          value={test.course.teacher.label}
        />
        <ColumnView.Item 
          name={<Trans i18nKey="group" /> }
          value={test.course.group.code.toUpperCase()}
        />
      </ColumnView>
    </>
  )

}

TestMainInfo.propTypes = {
  test: PropTypes.object.isRequired
  // test data
}

export default TestMainInfo;