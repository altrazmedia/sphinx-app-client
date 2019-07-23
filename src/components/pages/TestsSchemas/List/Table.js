import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";

import { Button } from "components/common";

import { formatDate } from "utils/functions";

const TestsSchemasTable = props => {
  const { tests } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <Trans i18nKey={"testsSchemas.name"} />
          </th>
          <th>
            <Trans i18nKey={"testsSchemas.author"} />
          </th>
          <th>
            <Trans i18nKey={"testsSchemas.questionsNr"} />
          </th>
          <th>
            <Trans i18nKey={"testsSchemas.created"} />
          </th>
          <th>
            <Trans i18nKey={"testsSchemas.details"} />
          </th>
        </tr>
      </thead>
      <tbody>
        {tests.map(test => (
          <tr key={test._id}>
            <td>{test.name}</td>
            <td>{test.author.label}</td>
            <td>{test.questions.length}</td>
            <td>{formatDate(test.created)}</td>
            <td>
              <Button
                variant="icon"
                size="small"
                icon="arrow-right"
                to={`/tests-schemas/v/${test._id}`}
                color="primary"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TestsSchemasTable.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TestsSchemasTable;
