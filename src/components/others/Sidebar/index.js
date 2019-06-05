import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

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
    const { t, currentUser } = this.props;
    const { role } = currentUser.data;
    switch (role) {
      case "admin": {
        return [
          { name: t("page.users"), path: "/users", icon: "users" },
          { name: t("page.groups"), path: "/groups", icon: "user-graduate" },
          { name: t("page.courses"), path: "/courses", icon: "chalkboard-teacher" },
          { name: t("page.subjects"), path: "/subjects", icon: "atlas" }
        ];
      }
      case "student": {
        return [
          { name: t("page.courses"), path: "/my-courses", icon: "chalkboard-teacher" },
          { name: t("page.tests"), path: "/my-tests", icon: "file-signature" },
          { name: t("page.users"), path: "/users", icon: "users" }
        ];
      }
      case "teacher": {
        return [
          { name: t("page.courses"), path: "/courses-lead", icon: "chalkboard-teacher" },
          { name: t("page.tests"), path: "/tests-lead", icon: "file-signature" },
          { name: t("page.testsSchemas"), path: "/tests-schemas", icon: "file-alt" },
          { name: t("page.users"), path: "/users", icon: "users" }
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
    this.setState({ lang });
    localStorage.setItem("lang", lang);
  }

  /**
   * Logging out the user
   */
  logout = () => {
    this.props.history.push("/"); // redirecting to the main page
    this.props.logout();
  }


  render = () => {

    const navItems = this.getNavigationItems();

    const { open, lang } = this.state;
    const { t } = this.props;

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
        <div role="button" className="sidebar__item sidebar__item--logout" onClick={this.logout}>
          <div className="sidebar__icon-wrapper">
            <Icon name="power-off" className="sidebar__icon" />
          </div>
          <span className="sidebar__name">{t("logout")}</span>
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

export default withRouter(connect(READ, EMIT)(withTranslation()(Sidebar)));