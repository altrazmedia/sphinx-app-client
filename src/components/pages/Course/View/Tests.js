import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { FAB } from "components/common";
import AddTest from "../AddTest";

import { withTranslation } from "react-i18next";
import TestsList from "components/common/TestsList";

class CourseTests extends PureComponent {
  state = {
    displayNewTestForm: false,
  };

  openNewTestForm = () => {
    this.setState({ displayNewTestForm: true });
  };

  closeNewTestForm = () => {
    this.setState({ displayNewTestForm: false });
  };

  render = () => {
    const { tests, canCreateNew, t } = this.props;
    const { displayNewTestForm } = this.state;

    return (
      <>
        <TestsList menuType="secondary" tests={tests} />
        {canCreateNew && (
          <FAB
            title={t("test.startNew")}
            onClick={this.openNewTestForm}
            icon="plus"
          />
        )}
        {displayNewTestForm ? <AddTest close={this.closeNewTestForm} /> : null}
      </>
    );
  };
}

CourseTests.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
  canCreateNew: PropTypes.bool,
  // Can user create a new test for this course
};

export default withTranslation()(CourseTests);
