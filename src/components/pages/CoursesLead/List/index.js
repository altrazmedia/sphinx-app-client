import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, PageHeader, Illustration } from "components/common";

import { fetchLeadCourses } from "actions/leadCoursesActions";

class List extends PureComponent {

  state = {
    loading: true
  }

  componentDidUpdate = () => {
    if (this.props.courses.loading !== this.state.laoding) {
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
        <PageHeader header="Prowadzone zajęcia" description="Lista prowadzonych przez Ciebie zajęć" />
        {
          loading ? 
            <Loader />
          : courses.error ?  
            <Illustration image="warning" header="Coś poszło nie tak..." description="Nie udało się pobrać listy zajęć." />
          : courses.data.length === 0 ? 
            <Illustration image="empty" header="Pudło jest puste..." description="Nie znaleźliśmy żadnych prowadzonych przez Ciebie zajęć." />
          : (
            <div className="segment">
              <table className="table">
                <thead>
                  <tr>
                    <th>Oznaczenie</th>
                    <th>Przedmiot</th>
                    <th>Grupa</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    courses.data.map(course => {
                      return (
                        <tr key={course._id}>
                          <td>{course.code}</td>
                          <td>{course.subject.name || course.subject.code || "-"}</td>
                          <td>{course.group.name || course.group.code || "-"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          )
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

List.displayName = "LeadCoursesList";
export default connect(READ, EMIT)(List);