import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, PageHeader, Illustration } from "components/common";
import List from "components/common/TestsList";

import { Trans, withTranslation } from "react-i18next";
import { fetchMyTests } from "actions/testsActions";

/**
 * List of tests the user is taking part in
 */
class TestsLead extends PureComponent {
  state = {
    loading: true,
  };

  componentDidUpdate = () => {
    if (this.props.tests.loading !== this.state.loading) {
      this.setState({ loading: this.props.tests.loading });
    }
  };

  componentDidMount = () => {
    this.props.fetchTests();
  };

  render = () => {
    const { loading } = this.state;
    const { tests } = this.props;

    return (
      <div>
        <PageHeader
          header={<Trans i18nKey="myTests.header" />}
          description={<Trans i18nKey="myTests.description" />}
        />
        {loading ? (
          <Loader />
        ) : tests.error ? (
          <Illustration variant="fetchError" />
        ) : (
          <List tests={tests.data} />
        )}
      </div>
    );
  };
}

const READ = state => ({
  tests: state.tests.list,
});

const EMIT = dispatch => ({
  fetchTests: () => dispatch(fetchMyTests()),
});

export default connect(
  READ,
  EMIT
)(withTranslation()(TestsLead));
