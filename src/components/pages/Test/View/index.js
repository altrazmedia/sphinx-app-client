import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Menu, PageHeader } from "components/common";
import { Trans } from "react-i18next";

import Main from "./Main";
import Results from "./Results";

class TestView extends PureComponent {

  state = {
    page: "main", // Displayed page; "main", "users" or "tests"
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

    // if (course.tests) {
    //   pages.push("tests")
    // }

    return pages;

  }

  render = () => {

    const { page } = this.state;
    const { test } = this.props;

    const pages = this.getAvailablePages();

    return (
      <>
        <PageHeader
          header={(
            <span>
              {test.testSchema.name}
              {" - "}
              <Trans i18nKey="test.header" />
            </span>
          )}
        />
        <Menu
          value={page}
          onChange={this.handlePageChange}
          items={pages.map(page => ({ value: page, text: <Trans i18nKey={`test.page.${page}`} /> }))}
        />
        <div className="segment">
          {
            page === "main" ? 
              <Main test={test} />
            : page === "results" ? 
              <Results test={test} /> 
            : null
          }
        </div>
      </>
    )
  }
  
}

TestView.propTypes = {
  test: PropTypes.object.isRequired
}

export default TestView;