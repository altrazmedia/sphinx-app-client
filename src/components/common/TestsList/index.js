import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Menu } from "components/common";
import { withTranslation } from "react-i18next";

import List from "./List";

/**
 *  Displayng list of tests
 *  Filtering them by status
 */
class TestsList extends PureComponent {
  state = {
    page: "ongoing", // "ongoing", "finished" or "pending"; status of displayed tests
  };

  handlePageChange = page => {
    this.setState({ page });
  };

  render = () => {
    const { page } = this.state;
    const { tests, t, menuType } = this.props;

    return (
      <>
        <Menu
          value={page}
          onChange={this.handlePageChange}
          type={menuType}
          items={[
            { value: "ongoing", text: t("tests.ongoing") },
            { value: "finished", text: t("tests.finished") },
            { value: "pending", text: t("tests.pending") },
          ]}
        />
        <List
          status={page}
          tests={tests.filter(test => test.status === page)}
        />
      </>
    );
  };
}

TestsList.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuType: PropTypes.oneOf(["primary", "secondary"]),
};

export default withTranslation()(TestsList);
