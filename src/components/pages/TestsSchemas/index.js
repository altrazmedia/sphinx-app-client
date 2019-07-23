import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchSubjects } from "actions/subjectsActions";

import List from "./List";
import Add from "./Add";
import Single from "./Single";
import NotFound from "components/others/404";

class TestsSchemas extends PureComponent {
  state = {
    subject: "", // id of selected subject
  };

  componentDidMount = () => {
    this.props.fetchSubjects();
  };

  changeSubject = subject => {
    this.setState({ subject });
  };

  render = () => {
    const { subject } = this.state;
    const path = "/tests-schemas";

    return (
      <Switch>
        <Route
          path={path}
          exact
          render={props => (
            <List
              subjectSelected={subject}
              changeSubject={this.changeSubject}
              {...props}
            />
          )}
        />
        <Route
          path={`${path}/add`}
          exact
          render={props => <Add defaultSubject={subject} {...props} />}
        />
        <Route path={`${path}/v/:id`} exact component={Single} />
        <Route component={NotFound} />
      </Switch>
    );
  };
}

const READ = state => ({
  subjects: state.subjects,
});

const EMIT = dispatch => ({
  fetchSubjects: () => dispatch(fetchSubjects()),
});

export default connect(
  READ,
  EMIT
)(TestsSchemas);
