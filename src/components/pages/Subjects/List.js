import React from "react";
import PropTypes from "prop-types";

import { Trans } from "react-i18next";

const SubjectsList = props => {
  const { subjects } = props;

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
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => {
            return (
              <tr key={subject._id}>
                <td>{subject.code.toUpperCase()}</td>
                <td>{subject.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

SubjectsList.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SubjectsList;
