import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, PageHeader, Illustration, Button } from "components/common";

import List from "./List";
import Add from "./Add";

import { Trans } from "react-i18next";
import { fetchSubjects } from "actions/subjectsActions";

class Subjects extends PureComponent {

  state = {
    loading: true,
    displayNewSubjectForm: false
  }

  componentDidUpdate = () => {
    if (this.props.subjects.loading !== this.state.laoding) {
      this.setState({ loading: this.props.subjects.loading })
    }
  }

  componentDidMount = () => {
    this.props.fetchSubjects();
  }

  /** Opens a window with the new subject form */
  openNewSubjectForm = () => {
    this.setState({ displayNewSubjectForm: true })
  }

  /** Closes the new subject form */
  closeNewSubjectForm = () => {
    this.setState({ displayNewSubjectForm: false })
  }


  render = () => {

    const { loading, displayNewSubjectForm } = this.state;
    const { subjects } = this.props;

    return (
      <div>
        <PageHeader header={<Trans i18nKey="subjects.header" /> } />
        {
          loading ? 
            <Loader />
          : subjects.error ?  
            <Illustration variant="fetchError" />
          : subjects.data.length === 0 ? 
            <>
              <Illustration variant="empty" description={<Trans i18nKey="subjects.noSubjects" />} />
              <Button.Group align="center">
                <Button icon="plus" onClick={this.openNewSubjectForm}>
                  <Trans i18nKey="subjects.add" />
                </Button>
              </Button.Group>
            </>
          : <>
              <List subjects={subjects.data} />
              <Button.Group align="right">
                <Button icon="plus" onClick={this.openNewSubjectForm}>
                  <Trans i18nKey="subjects.add" />
                </Button>
              </Button.Group>
            </>
            
        }
        {
          displayNewSubjectForm &&  <Add close={this.closeNewSubjectForm} />
        }
      </div>
    )

  }

}

const READ = state => ({
  subjects: state.subjects
})

const EMIT = dispatch => ({
  fetchSubjects: () => dispatch(fetchSubjects())
})

export default connect(READ, EMIT)(Subjects);