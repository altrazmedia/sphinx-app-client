import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Icon } from "components/common";
import { logout } from "actions/currentUserActions";

class Sidebar extends PureComponent {
  
  /**
   * Creates navigation items based on current user's role
   * @returns {Array}
   */
  getNavigationItems = () => {
    const { role } = this.props.currentUser.data;
    switch (role) {
      case "admin": {
        return [
          { name: "Użytkownicy", path: "/users", icon: "users" },
          { name: "Grupy studentów", path: "/groups", icon: "user-graduate" },
          { name: "Zajęcia", path: "/courses", icon: "chalkboard-teacher" },
          { name: "Przedmioty", path: "/subjects", icon: "atlas" }
        ];
      }
      case "student": {
        return [
          { name: "Zajęcia", path: "/my-courses", icon: "chalkboard-teacher" },
          { name: "Testy", path: "/my-tests", icon: "file-signature" },
          { name: "Użytkownicy", path: "/users", icon: "users" }
        ];
      }
      case "teacher": {
        return [
          { name: "Zajęcia", path: "/courses-lead", icon: "chalkboard-teacher" },
          { name: "Prowadzone testy", path: "/tests-lead", icon: "file-signature" },
          { name: "Schematy testów", path: "/tests-schemas", icon: "file-alt" },
          { name: "Użytkownicy", path: "/users", icon: "users" }
        ];
      }
      default: {
        return [];
      }
    }
  }

  /**
   * Checks if navigation item is active (page it leads to is open)
   * @param {Object} item
   * @returns {Boolean}
   */
  isItemActive = item => {
    const currentPath = this.props.history.location.pathname;
    return currentPath.indexOf(item.path) > -1
  }

  render = () => {

    const navItems = this.getNavigationItems();

    return (
      <aside className="sidebar">

        <nav className="sidebar__nav">
          <ul>
            {
              navItems.map(item => {

                const activeClass = this.isItemActive(item) ? "sidebar__item--active" : "";

                return (
                  <Link to={item.path} key={item.path} className={`sidebar__item ${activeClass}`}>
                    <div className="sidebar__icon-wrapper">
                      <Icon name={item.icon} className="sidebar__icon" />
                    </div>
                    <span className="sidebar__name">{item.name}</span>
                  </Link>
                )
              })
            }
          </ul>

        </nav>
        <div role="button" className="sidebar__item sidebar__item--logout" onClick={this.props.logout}>
          <div className="sidebar__icon-wrapper">
            <Icon name="power-off" className="sidebar__icon" />
          </div>
          <span className="sidebar__name">Wyloguj</span>
        </div>
      </aside>
    )
  }
  
}

const READ = state => ({
  currentUser: state.currentUser
})

const EMIT = dispatch => ({
  logout: () => dispatch(logout())
})

export default withRouter(connect(READ, EMIT)(Sidebar));