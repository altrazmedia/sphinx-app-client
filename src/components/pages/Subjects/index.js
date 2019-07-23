import React, { PureComponent } from "react";
import { connect } from "react-redux";

import {
  Loader,
  PageHeader,
  Illustration,
  Button,
  FAB,
} from "components/common";

import List from "./List";
import Add from "./Add";

import { Trans, withTranslation } from "react-i18next";
import { fetchSubjects } from "actions/subjectsActions";

class Subjects extends PureComponent {
  state = {
    loading: true,
    displayNewSubjectForm: false,
  };

  componentDidUpdate = () => {
    if (this.props.subjects.loading !== this.state.loading) {
      this.setState({ loading: this.props.subjects.loading });
    }
  };

  componentDidMount = () => {
    this.props.fetchSubjects();
  };

  /** Opens a window with the new subject form */
  openNewSubjectForm = () => {
    this.setState({ displayNewSubjectForm: true });
  };

  /** Closes the new subject form */
  closeNewSubjectForm = () => {
    this.setState({ displayNewSubjectForm: false });
  };

  render = () => {
    const { loading, displayNewSubjectForm } = this.state;
    const { subjects } = this.props;

    return (
      <div>
        <PageHeader
          header={<Trans i18nKey="subjects.header" />}
          description={<Trans i18nKey="subjects.description" />}
        />
        {loading ? (
          <Loader />
        ) : subjects.error ? (
          <Illustration variant="fetchError" />
        ) : subjects.data.length === 0 ? (
          <>
            <Illustration
              variant="empty"
              description={<Trans i18nKey="subjects.noSubjects" />}
            />
            <Button.Group align="center">
              <Button variant="text" onClick={this.openNewSubjectForm}>
                <Trans i18nKey="subjects.add" />
              </Button>
            </Button.Group>
          </>
        ) : (
          <>
            <List subjects={subjects.data} />
            <FAB icon="plus" onClick={this.openNewSubjectForm} />
          </>
        )}
        {displayNewSubjectForm && <Add close={this.closeNewSubjectForm} />}
      </div>
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
)(withTranslation()(Subjects));
