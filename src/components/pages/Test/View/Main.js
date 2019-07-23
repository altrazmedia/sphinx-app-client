import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

import { ColumnView, Button } from "components/common";
import { Trans } from "react-i18next";

const TestMainInfo = props => {
  const { test, openTestSolveWindow } = props;

  return (
    <>
      <ColumnView>
        <ColumnView.Item
          name={<Trans i18nKey="status" />}
          value={<Trans i18nKey={`test.${test.status}`} />}
        />
        <ColumnView.Item
          name={<Trans i18nKey="test.start" />}
          value={moment(test.start)
            .local()
            .format("DD.MM.YYYY HH:mm")}
        />
        <ColumnView.Item
          name={<Trans i18nKey="test.end" />}
          value={moment(test.end)
            .local()
            .format("DD.MM.YYYY HH:mm")}
        />
        {test.my_attempt && test.status === "ongoing" && (
          <ColumnView.Item
            name={<Trans i18nKey="test.questionAnswered" />}
            value={
              <span>
                {test.my_attempt.answered} / {test.my_attempt.questions.length}
              </span>
            }
          />
        )}
        <br />
        <br />
        <ColumnView.Item
          name={<Trans i18nKey="course" />}
          value={
            <Link to={`/course/${test.course.code}`} className="text-link">
              {test.course.code.toUpperCase()}
            </Link>
          }
        />
        <ColumnView.Item
          name={<Trans i18nKey="subject" />}
          value={test.course.subject.name}
        />
        <ColumnView.Item
          name={<Trans i18nKey="course.teacher" />}
          value={test.course.teacher.label}
        />
        <ColumnView.Item
          name={<Trans i18nKey="group" />}
          value={test.course.group.code.toUpperCase()}
        />

        {test.my_access === "student" && test.status === "ongoing" ? (
          <Button.Group align="center">
            <Button onClick={openTestSolveWindow}>
              <Trans i18nKey="test.solve" />
            </Button>
          </Button.Group>
        ) : null}
      </ColumnView>
    </>
  );
};

TestMainInfo.propTypes = {
  test: PropTypes.object.isRequired,
  // test data
  openTestSolveWindow: PropTypes.func,
};

export default TestMainInfo;
