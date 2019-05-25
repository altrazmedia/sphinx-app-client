import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Illustration, Loader } from "components/common";
import { Trans } from "react-i18next";

import View from "./View";

import { fetchTestSchema } from "actions/testsSchemasActions";

class SingleTestSchema extends PureComponent {

  state = {
    loading: true
  }

  componentDidUpdate = () => {
    if (this.props.testSchema.loading !== this.state.loading) {
      this.setState({ loading: this.props.testSchema.loading })
    }
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.fetchTestSchema({ testSchema: id })
  }
  
  render = () => {

    const { testSchema } = this.props;
    const { loading } = this.state;

    return (
      <>
        {
          loading ? 
            <Loader /> 
          : testSchema.error ? 
            testSchema.error.status === 404 ? 
              <Illustration 
                image="search"
                header={<Trans i18nKey="testSchema.notFound.header"/> }
                description={<Trans i18nKey="testSchema.notFound.description"/> }
              />
            : <Illustration variant={testSchema.error.status === 403 ? "notPermitted" : "fetchError" } />
          : <View test={testSchema.data} />
        }
      </>
    )
  }

}

const READ = state => ({
  testSchema: state.testsSchemas.single
})

const EMIT = dispatch => ({
  fetchTestSchema: payload => dispatch(fetchTestSchema(payload))
})

export default connect(READ, EMIT)(SingleTestSchema);