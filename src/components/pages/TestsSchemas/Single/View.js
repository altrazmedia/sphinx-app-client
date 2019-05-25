import React from "react";
import PropTypes from "prop-types";

import { PageHeader, ColumnView } from "components/common";
import Question from "../Question";

import { Trans } from "react-i18next";

const SingleTestSchemaView = props => {

  const { test } = props;

  return (
    <>
      <PageHeader header={test.name} description={test.description} />
      <div className="segment">
        <ColumnView>
          <ColumnView.Item name={<Trans i18nKey="subject" />} value={test.subject.name} />
          <ColumnView.Item name={<Trans i18nKey="testsSchemas.author" />} value={test.author.label} />
          <ColumnView.Item name={<Trans i18nKey="testsSchemas.questions" />}  />
        </ColumnView>
        {
          test.questions.map(question => (
            <Question question={question} key={question._id} />
          ))
        }
      </div>
    </>
  )

}

SingleTestSchemaView.propTypes = {
  test: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    subject: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
}

export default SingleTestSchemaView;