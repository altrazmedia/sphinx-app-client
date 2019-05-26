import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { Button, Illustration, Icon } from "components/common"; 
import AddTest from "../AddTest";

import { withTranslation } from "react-i18next";

// Icon color based on test status
const statusColor = {
  ongoing: "success",
  pending: "default",
  finished: "error"
}

class CourseTests extends PureComponent {

  state = {
    displayNewTestForm: false
  }

  openNewTestForm = () => {
    this.setState({ displayNewTestForm: true })
  }

  closeNewTestForm = () => {
    this.setState({ displayNewTestForm: false })
  }

  render = () => {
    const { tests, canCreateNew, t } = this.props;
    const { displayNewTestForm } = this.state;

    return (
      <>
        {
          tests.length === 0 ? 
            <Illustration variant="empty" description={t("course.noTests")} />
          : (
            <>
              <p><b>{t("markings")}:</b></p>
              <br />
              <p>
                {
                  [ "ongoing", "finished", "pending" ].map(status => (
                    <React.Fragment key={status}>
                      <Icon name="clock" size="small" color={statusColor[status]} /> {t(`test.${status}`)}
                    </React.Fragment>
                  ))
                }
              </p>
              <table className="table" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>{t("test")}</th>
                    <th>{t("test.start")}</th>
                    <th>{t("test.end")}</th>
                    <th>{t("status")}</th>
                    <th>{t("details")}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tests.map(test => (
                      <tr key={test._id}>
                        <td>{test.testSchema.name}</td>
                        <td>{moment.utc(test.start).local().format("DD.MM.YYYY HH:mm")}</td>
                        <td>{moment.utc(test.end).local().format("DD.MM.YYYY HH:mm")}</td>
                        <td><Icon name="clock" color={statusColor[test.status]} size="small" title={t(`test.${test.status}`)} /></td>
                        <td>
                          <Button variant="icon" size="small" icon="arrow-right" color="primary" to={`/test/${test._id}`} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {
                canCreateNew ? 
                  <Button.Group align="right">
                    <Button onClick={this.openNewTestForm} icon="plus">
                      {t("test.startNew")}
                    </Button>
                  </Button.Group>
                : null
              }
            </>
          )
        }
        {
          displayNewTestForm ? 
            <AddTest close={this.closeNewTestForm} />
          : null
        }
      </>
    )
  }

}

CourseTests.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
  canCreateNew: PropTypes.bool,
  // Can user create a new test for this course
}

export default withTranslation()(CourseTests);