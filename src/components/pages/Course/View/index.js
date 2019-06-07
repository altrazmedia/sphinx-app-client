import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Menu, PageHeader } from "components/common";
import { Trans, withTranslation } from "react-i18next";

import Main from "./Main";
import Tests from "./Tests";
import Scores from "./Scores";
import MyResults from "./MyResults";

class CourseView extends PureComponent {

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
    const { course } = this.props;
    const pages = [ "main" ];

    if (course.tests) {
      pages.push("tests")
    }

    if (course.finishedTests) {
      pages.push("scores")
    }

    if (course.my_results) {
      pages.push("my-results")
    }

    return pages;

  }

  render = () => {

    const { page } = this.state;
    const { course } = this.props;

    const pages = this.getAvailablePages();

    return (
      <>
        <PageHeader
          header={<span>{course.subject.name} ({course.code.toUpperCase()})</span>}
          description={<Trans i18nKey="course.header" />}
        />
        <Menu
          value={page}
          onChange={this.handlePageChange}
          items={pages.map(page => ({ value: page, text: <Trans i18nKey={`course.page.${page}`} /> }))}
        />
          {
            page === "main" ? 
              <Main course={course} />
            : page === "tests" ? 
              <Tests tests={course.tests} canCreateNew={course.my_access === "teacher"} />
            : page === "scores" ? 
              <Scores tests={course.finishedTests} students={course.group.students} />
            : page === "my-results" ? 
              <MyResults tests={course.my_results} />
            : null
          }
      </>
    )
  }
  
}

CourseView.propTypes = {
  course: PropTypes.object.isRequired
}

export default withTranslation()(CourseView);