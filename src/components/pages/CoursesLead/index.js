import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, PageHeader, Illustration } from "components/common";

import List from "./List";

import { fetchLeadCourses } from "actions/leadCoursesActions";
import { Trans } from "react-i18next";

class CoursesLead extends PureComponent {

  state = {
    loading: true
  }

  componentDidUpdate = () => {
    if (this.props.courses.loading !== this.state.loading) {
      this.setState({ loading: this.props.courses.loading })
    }
  }

  componentDidMount = () => {
    this.props.fetchCourses();
  }

  render = () => {

    const { loading } = this.state;
    const { courses } = this.props;

    return (
      <div>
        <PageHeader header={<Trans i18nKey="coursesLead.header" /> } />
        {
          loading ? 
            <Loader />
          : courses.error ?  
            <Illustration variant="fetchError" />
          : courses.data.length === 0 ? 
            <Illustration variant="empty" description={<Trans i18nKey="coursesLead.noCourses" />} />
          : <List courses={courses.data} />
            
        }
      </div>
    )

  }

}

const READ = state => ({
  courses: state.leadCourses
})

const EMIT = dispatch => ({
  fetchCourses: () => dispatch(fetchLeadCourses())
})

export default connect(READ, EMIT)(CoursesLead);