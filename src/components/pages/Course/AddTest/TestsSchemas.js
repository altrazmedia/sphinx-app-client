import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Trans } from "react-i18next";
import { Loader, ErrorMessage, Checkbox, Button } from "components/common";

// TODO: display more info about test schema
const TestsSchemas = props => {

  const { testsSchemas, selected, handleChange, next } = props;

  const handleCheckboxChange = schema => () => {
    handleChange(schema._id);
  }

  return (
    <>
      <h3 style={{ textAlign: "center" }}><Trans i18nKey="test.pickSchema" /></h3>
      {
        testsSchemas.loading ? 
          <Loader />
        : testsSchemas.error ?
          <ErrorMessage content={<Trans i18nKey="fetchError" />} />
        : testsSchemas.data.length === 0 ? 
          <ErrorMessage content={<Trans i18nKey="testsSchemas.emptyList" />} />
        : (
          <>
            <table className="table">
              <tbody>
                {
                  testsSchemas.data.map(schema => (
                    <tr>
                      <td>{schema.name}</td>
                      <td>
                        <Checkbox
                          checked={schema._id === selected}
                          onChange={handleCheckboxChange(schema)}
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <hr />
            <Button.Group align="right">
              <Button variant="icon" icon="angle-right" disabled={!next} onClick={next} color="primary" size="small" />
            </Button.Group>
          </>
        )
      }
    </>
  )


}

TestsSchemas.propTypes = {
  selected: PropTypes.string, // id of selected schema
  handleChange: PropTypes.func.isRequired,
  next: PropTypes.func, // function called on "Next" button clicked; can be undefined (then button should be disabled)
}

const READ = state => ({
  testsSchemas: state.testsSchemas.list
})

export default connect(READ)(TestsSchemas);