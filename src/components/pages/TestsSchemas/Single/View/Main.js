import React from "react";
import PropTypes from "prop-types";

import { ColumnView } from "components/common";
import Question from "../../Question";

import { Trans } from "react-i18next";


const TestSchemaMainInfo = props => {

  const { testSchema } = props;

  return (
    <>
      <div className="segment">
        <ColumnView>
          <ColumnView.Item name={<Trans i18nKey="subject" />} value={testSchema.subject.name} />
          <ColumnView.Item name={<Trans i18nKey="testsSchemas.author" />} value={testSchema.author.label} />
        </ColumnView>
      </div>
      <div className="segment">
        <h2><Trans i18nKey="testsSchemas.questions" /></h2>
        {
          testSchema.questions.map(question => (
            <Question question={question} key={question._id} />
            ))
        }
      </div>
    </>
  )

}

TestSchemaMainInfo.propTypes = {
  testSchema: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    subject: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
}


export default TestSchemaMainInfo;