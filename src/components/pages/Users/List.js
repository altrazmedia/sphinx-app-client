import React from "react";
import PropTypes from "prop-types";

import { Trans } from "react-i18next";
import { Illustration } from "components/common";

import { formatDate } from "utils/functions";

const UsersList = props => {

  const { users } = props;

  if (users.length === 0) {
    return <Illustration variant="empty" description={<Trans i18nKey="users.noUsers" />} />
  }

  return (
    <div className="segment">
      <table className="table">
        <thead>
          <tr>
            <th><Trans i18nKey="users.label" /></th>
            <th><Trans i18nKey="users.email" /></th>
            <th><Trans i18nKey="users.created" /></th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return (
                <tr key={user._id}>
                  <td>{user.label}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.created)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )

}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default UsersList;