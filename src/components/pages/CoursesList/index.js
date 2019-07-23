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

import {
  fetchLeadCourses,
  fetchMyCourses,
  fetchCoursesList,
} from "actions/coursesActions";
import { Trans, withTranslation } from "react-i18next";

// Translation keys depending on user's role
const descriptionByUserRole = {
  teacher: "coursesLead.description",
  student: "myCourses.description",
  admin: "courses.description",
};

const emptyListMsgByUserRole = {
  techer: "coursesLead.noCourse",
  student: "myCourses.noCourses",
  admin: "courses.noCourses",
};

class CoursesList extends PureComponent {
  state = {
    loading: true,
    displayNewCourseForm: false,
  };

  componentDidUpdate = () => {
    if (this.props.courses.loading !== this.state.loading) {
      this.setState({ loading: this.props.courses.loading });
    }
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { userRole } = this.props;

    if (userRole === "teacher") {
      this.props.fetchLeadCourses();
    } else if (userRole === "student") {
      this.props.fetchMyCourses();
    } else if (userRole === "admin") {
      this.props.fetchAllCourses();
    }
  };

  openNewCourseForm = () => {
    this.setState({ displayNewCourseForm: true });
  };

  closeNewCourseForm = () => {
    this.setState({ displayNewCourseForm: false });
  };

  render = () => {
    const { loading, displayNewCourseForm } = this.state;
    const { courses, userRole } = this.props;

    return (
      <>
        <PageHeader
          header={<Trans i18nKey="courses.header" />}
          description={<Trans i18nKey={descriptionByUserRole[userRole]} />}
        />
        {loading ? (
          <Loader />
        ) : courses.error ? (
          <Illustration variant="fetchError" />
        ) : courses.data.length === 0 ? (
          <>
            <Illustration
              variant="empty"
              description={<Trans i18nKey={emptyListMsgByUserRole[userRole]} />}
            />
            {userRole === "admin" && (
              <Button.Group align="center">
                <Button variant="text" onClick={this.openNewCourseForm}>
                  <Trans i18nKey="course.add" />
                </Button>
              </Button.Group>
            )}
          </>
        ) : (
          <>
            <List
              courses={courses.data}
              displayedData={
                userRole === "admin"
                  ? ["all"]
                  : userRole === "teacher"
                  ? ["code", "subject", "group", "details"]
                  : userRole === "student"
                  ? ["code", "subject", "teacher", "details"]
                  : []
              }
            />
            {userRole === "admin" && (
              <FAB icon="plus" onClick={this.openNewCourseForm} />
            )}
          </>
        )}
        {displayNewCourseForm && <Add close={this.closeNewCourseForm} />}
      </>
    );
  };
}

const READ = state => ({
  courses: state.courses.list,
  userRole: state.currentUser.data.role,
});

const EMIT = dispatch => ({
  fetchLeadCourses: () => dispatch(fetchLeadCourses()),
  fetchMyCourses: () => dispatch(fetchMyCourses()),
  fetchAllCourses: () => dispatch(fetchCoursesList()),
});

export default connect(
  READ,
  EMIT
)(withTranslation()(CoursesList));
