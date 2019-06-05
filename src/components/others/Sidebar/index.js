import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Icon, Button } from "components/common";
import { logout } from "actions/currentUserActions";

import i18n from "utils/i18n";

import logo from "images/logo-inv.png";
import poland from "images/poland.png"
import uk from "images/uk.png"

class Sidebar extends PureComponent {

  state = {
    open: false,
    lang: i18n.language
  }
  
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
   * Opens/closes the sidebar
   */
  toggleOpen = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  handleLanguageChange = lang => {
    i18n.changeLanguage(lang);
    this.setState({ lang })
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

    const { open, lang } = this.state;

    return (
      <aside className={`sidebar ${!open ? "sidebar--closed" : ""}`}>
        <div className="sidebar__upper">
          <div className="sidebar__header">
            <Link to="/">
              <img alt="Sphinx App" src={logo} className="sidebar__logo" /> 
            </Link>
            <Button className="sidebar__btn" variant="icon" size="small" icon="bars" onClick={this.toggleOpen} />
          </div>
          <div className="sidebar__langs">
            <img 
              alt="pl" 
              src={poland} 
              className={`sidebar__lang ${lang === "pl" ? "sidebar__lang--active" : ""}`}
              onClick={() => this.handleLanguageChange("pl")} 
            />
            <img 
              alt="en" 
              src={uk} 
              className={`sidebar__lang ${lang === "en" ? "sidebar__lang--active" : ""}`}
              onClick={() => this.handleLanguageChange("en")} 
            />
          </div>
        </div>

        <nav className="sidebar__nav">
          <ul>
            {
              navItems.map(item => {

                return (
                  <Link to={item.path} key={item.path} className={`sidebar__item`}>
                    <div className="sidebar__icon-wrapper">
                      <Icon  name={item.icon} className="sidebar__icon" />
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