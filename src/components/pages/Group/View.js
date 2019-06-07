import React from "react";
import PropTypes from "prop-types";

import { PageHeader, Button } from "components/common";
import { Trans } from "react-i18next";

const GroupView = props => {

  const { group } = props;

  return (
    <>
      <PageHeader 
        header={(
          <span>
            {group.name} ({group.code.toUpperCase()})
          </span>
        )}
        description={<Trans i18nKey="group.groupInfo" />}
      />
      
      <h2><Trans i18nKey="group.members" /></h2>
      <div className="segment">
        <table className="table">
          <thead>
            <tr>
              <th><Trans i18nKey="users.label" /></th>
              <th><Trans i18nKey="users.email" /></th>
            </tr>
          </thead>
          <tbody>
            {
              group.students.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user.label}</td>
                    <td>{user.email}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/* 
        TODO: Some message if there are now courses or members
      */}
      <h2><Trans i18nKey="group.coursesAssigned" /></h2>
      <div className="segment">
        <table className="table">
          <thead>
            <tr>
              <th><Trans i18nKey="code" /></th>
              <th><Trans i18nKey="subject" /></th>
              <th><Trans i18nKey="users.teacher" /></th>
              <th><Trans i18nKey="details" /></th>
            </tr>
          </thead>
          <tbody>
            {
              group.courses.map(course => {
                return (
                  <tr key={course._id}>
                    <td>{course.code.toUpperCase()}</td>
                    <td>{course.subject.name || course.subject.code || "-"}</td>
                    <td>{course.teacher.label}</td>
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
    </>
  );

}


GroupView.propTypes = {
  group: PropTypes.object.isRequired,
  // group data returned from the server
}

export default GroupView;