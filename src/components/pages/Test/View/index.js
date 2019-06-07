import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Menu, PageHeader } from "components/common";
import { Trans, withTranslation } from "react-i18next";

import Main from "./Main";
import Results from "./Results";
import SolveTest from "../SolveTest";
import MyResult from "./MyResult";

class TestView extends PureComponent {

  state = {
    page: "main", // Displayed page; "main", "users" or "tests"
    displayTestSolveWindow: false
  }

  handlePageChange = page => {
    this.setState({ page })
  }

  /**
   * Returns the list of available pages based on data returned from the server
   * @returns {Array}
   */
  getAvailablePages = () => {
    const { test } = this.props;
    const pages = [ "main" ];

    if (test.my_access === "teacher") {
      pages.push("results")
    }

    if (test.my_access === "student" && test.status === "finished") {
      pages.push("my-result")
    }


    return pages;

  }

  openTestSolveWindow = () => {
    this.setState({ displayTestSolveWindow: true })
  }

  closeTestSolveWindow = () => {
    this.setState({ displayTestSolveWindow: false })
  }


  render = () => {

    const { page, displayTestSolveWindow } = this.state;
    const { test } = this.props;

    const pages = this.getAvailablePages();

    return (
      <>
        <PageHeader
          header={<span>{test.testSchema.name} ({test.course.subject.name})</span>}
          description={<Trans i18nKey="test.description" />}
        />
        <Menu
          value={page}
          onChange={this.handlePageChange}
          items={pages.map(page => ({ value: page, text: <Trans i18nKey={`test.page.${page}`} /> }))}
        />
        <div className="segment">
          {
            page === "main" ? 
              <Main test={test} openTestSolveWindow={this.openTestSolveWindow} />
            : page === "results" ? 
              <Results test={test} /> 
            : page === "my-result" ? 
              <MyResult questions={test.my_attempt.questions} score={test.my_attempt.score} correctAnswers={test.my_attempt.correctAnswers} />
            : null
          }
        </div>
        {
          displayTestSolveWindow && 
            <SolveTest 
              close={this.closeTestSolveWindow}
              testId={test._id}
              questions={test.my_attempt.questions}
              name={test.testSchema.name}
              end={test.end}
            />
        }
      </>
    )
  }
  
}

TestView.propTypes = {
  test: PropTypes.object.isRequired
}

export default withTranslation()(TestView);