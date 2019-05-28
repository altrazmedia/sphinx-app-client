import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, Illustration } from "components/common";
import { Trans } from "react-i18next";

import View from "./View";

import { fetchTest } from "actions/testsActions";

class SingleTest extends PureComponent {

  state = {
    loading: true
  }

  componentDidUpdate = () => {
    if (this.props.test.loading !== this.state.loading) {
      this.setState({ loading: this.props.test.loading })
    }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.fetchTest({ id });
  }

  render = () => {

    const { loading } = this.state;
    const { test } = this.props;

    return (
      <>
        {
          loading ? 
            <Loader />
          : test.error ?  
            test.error.status === 404 ? 
              <Illustration 
                image="search" 
                header={<Trans i18nKey="test.notFound.header" />} 
                description={<Trans i18nKey="test.notFound.description" />} 
              />
            : <Illustration variant={test.error.status === 403 ? "notPermitted" : "fetchError"} />
          : <View test={test.data} />
        }
      </>
    )
  }

}

const READ = state => ({
  test: state.tests.single
})

const EMIT = dispatch => ({
  fetchTest: payload => dispatch(fetchTest(payload))
})

export default connect(READ, EMIT)(SingleTest);