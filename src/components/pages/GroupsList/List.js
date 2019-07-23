import React from "react";
import PropTypes from "prop-types";

import { Trans } from "react-i18next";
import { Button } from "components/common";

const GroupsList = props => {
  const { groups } = props;

  return (
    <div className="segment">
      <table className="table">
        <thead>
          <tr>
            <th>
              <Trans i18nKey="code" />
            </th>
            <th>
              <Trans i18nKey="name" />
            </th>
            <th>
              <Trans i18nKey="details" />
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => {
            return (
              <tr key={group._id}>
                <td>{group.code.toUpperCase()}</td>
                <td>{group.name}</td>
                <td>
                  <Button
                    to={`/group/${group.code}`}
                    variant="icon"
                    icon="arrow-right"
                    size="small"
                    color="primary"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

GroupsList.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GroupsList;
