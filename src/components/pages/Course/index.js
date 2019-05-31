import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, Illustration } from "components/common";
import { Trans } from "react-i18next";

import View from "./View";

import { fetchCourse } from "actions/coursesActions";

class SingleCourse extends PureComponent {

  state = {
    loading: true
  }

  componentDidUpdate = () => {
    if (this.props.course.loading !== this.state.loading) {
      this.setState({ loading: this.props.course.loading })
    }
  }

  componentDidMount = () => {
    const { code } = this.props.match.params;
    this.props.fetchCourse({ code });
  }

  render = () => {

    const { loading } = this.state;
    const { course } = this.props;

    return (
      <>
        {
          loading ? 
            <Loader />
          : course.error ?  
            course.error.status === 404 ? 
              <Illustration 
                image="search" 
                header={<Trans i18nKey="course.notFound.header" />} 
                description={<Trans i18nKey="course.notFound.description" />} 
              />
            : <Illustration variant={course.error.status === 403 ? "notPermitted" : "fetchError"} />
          : <View course={course.data} />
        }
      </>
    )
  }

}

const READ = state => ({
  course: state.courses.single
})

const EMIT = dispatch => ({
  fetchCourse: payload => dispatch(fetchCourse(payload))
})

export default connect(READ, EMIT)(SingleCourse);