import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { Modal } from "components/common";
import { Trans } from "react-i18next";

import TestsSchemas from "./TestsSchemas";
import Dates from "./Dates";
import Confirmation from "./Confirmation";

import { fetchTestsSchemasList } from "actions/testsSchemasActions";
import { addTestToCourse } from "actions/courseActions";

class AddTest extends PureComponent {
  
  state = {
    page: "schema", // "schema", "dates", "confirmation"
    startNow: true,
    duration: "15",
    schema: "",
    startDate: "", // test start date, YYYY-MM-DD
    startTime: "", // test start time, HH:mm
    saveSuccess: false,
    saveError: null
  }

  componentDidMount = () => {
    this.fetchTestsSchemas();
  }

  /**
   * Fetching the list of tests schemas assigned to this course's subject
   */
  fetchTestsSchemas = () => {
    const { course } = this.props;
    const subjectId = course.subject._id;
    this.props.fetchTestsSchemas({ subject: subjectId })
  }


  handleChange = name => value => {
    this.setState({ [name]: value })
  }

  changePage = page => () => {
    this.setState({ page })
  }

  /** Schema and dates have been selected */
  confirm = () => {
    this.changePage("confirmation")();
    this.saveTest();
  }

  /** Sends the data to the server */
  saveTest = () => {
    const { schema, startNow, startDate, startTime, duration } = this.state;

    const start = startNow ? moment() : moment(`${startDate} ${startTime}`, "YYYY-MM-DD HH:mm");
    const end = moment(start).add(Number(duration), "minutes");


    const onSuccess = () => {
      this.setState({ saveSuccess: true })
    }

    const onError = (err) => {
      this.setState({ saveError: err })
    }

    this.props.addTest({ schema, start: start.utc().toDate(), end: end.utc().toDate(), onSuccess, onError })

  }


  render = () => {

    const { page, schema, startDate, startTime, startNow, duration, saveError, saveSuccess } = this.state;

    return (
      <Modal
        title={<Trans i18nKey="test.startNew" />}
        close={this.props.close}
      >
        <Modal.Content>
          {
            page === "schema" ? 
              <TestsSchemas
                selected={schema}
                handleChange={this.handleChange("schema")}
                next={
                  schema ? this.changePage("dates") : undefined // user can go further only if a schema is selected
                }
              />
            : page === "dates" ? 
              <Dates
                startTime={startTime}
                startDate={startDate}
                startNow={startNow}
                duration={duration}
                handleChange={this.handleChange}
                previous={this.changePage("schema")}
                confirm={
                  duration && (startNow || startDate && startTime) ? this.confirm : undefined
                }
              />
            : page === "confirmation" ? 
              <Confirmation 
                error={saveError}
                success={saveSuccess}
                previous={this.changePage("dates")}
                close={this.props.close}
              />
            : null
          }
        </Modal.Content>

      </Modal>
    );
  }

}

AddTest.propTypes = {
  close: PropTypes.func.isRequired // closing the window
}


const READ = state => ({
  course: state.course.data
})

const EMIT = dispatch => ({
  fetchTestsSchemas: payload => dispatch(fetchTestsSchemasList(payload)),
  addTest: payload => dispatch(addTestToCourse(payload))
})

export default connect(READ, EMIT)(AddTest)
