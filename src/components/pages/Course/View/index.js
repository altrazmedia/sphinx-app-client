import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Menu, PageHeader } from "components/common";
import { Trans } from "react-i18next";

import Main from "./Main";
import Students from "./Students";
import Tests from "./Tests";
import Scores from "./Scores";

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

    if (course.group && course.group.students) {
      pages.push("students")
    }

    if (course.tests) {
      pages.push("tests")
    }

    if (course.finishedTests) {
      pages.push("scores")
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
          header={(
            <span>
              {course.code.toUpperCase()}
              {" - "}
              <Trans i18nKey="course.header" />
            </span>
          )}
        />
        <Menu
          value={page}
          onChange={this.handlePageChange}
          items={pages.map(page => ({ value: page, text: <Trans i18nKey={`course.page.${page}`} /> }))}
        />
        <div className="segment">
          {
            page === "main" ? 
              <Main course={course} />
            : page === "students" ? 
              <Students students={course.group.students} />
            : page === "tests" ? 
              <Tests tests={course.tests} canCreateNew={course.my_access === "teacher"} />
            : page === "scores" ? 
              <Scores tests={course.finishedTests} students={course.group.students} />
            : null
          }
        </div>
      </>
    )
  }
  
}

CourseView.propTypes = {
  course: PropTypes.object.isRequired
}

export default CourseView;