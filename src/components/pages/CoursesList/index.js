import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, PageHeader, Illustration } from "components/common";

import List from "./List";

import { fetchLeadCourses, fetchMyCourses } from "actions/coursesActions";
import { Trans } from "react-i18next";


// Translation keys depending on user's role
const headerByUserRole = {
  teacher: "coursesLead.header",
  student: "myCourses.header"
}

const emptyListMsgByUserRole = {
  techer: "coursesLead.noCourse",
  student: "myCourses.noCourses"
}

class CoursesList extends PureComponent {

  state = {
    loading: true
  }

  componentDidUpdate = () => {
    if (this.props.courses.loading !== this.state.loading) {
      this.setState({ loading: this.props.courses.loading })
    }
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    const { userRole } = this.props;

    if (userRole === "teacher") {
      this.props.fetchLeadCourses();
    }
    else if (userRole === "student") {
      this.props.fetchMyCourses();
    }
  }

  render = () => {

    const { loading } = this.state;
    const { courses, userRole } = this.props;

    return (
      <div>
        <PageHeader header={<Trans i18nKey={headerByUserRole[userRole]} /> } />
        {
          loading ? 
            <Loader />
          : courses.error ?  
            <Illustration variant="fetchError" />
          : courses.data.length === 0 ? 
            <Illustration variant="empty" description={<Trans i18nKey={emptyListMsgByUserRole[userRole]} />} />
          : <List courses={courses.data} />
            
        }
      </div>
    )

  }

}

const READ = state => ({
  courses: state.courses.list,
  userRole: state.currentUser.data.role
})

const EMIT = dispatch => ({
  fetchLeadCourses: () => dispatch(fetchLeadCourses()),
  fetchMyCourses:   () => dispatch(fetchMyCourses())
})

export default connect(READ, EMIT)(CoursesList);