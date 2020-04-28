import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import DashboardNavigationStyle from "../DashboardNavigation/DashboardNavigationStyle";

export default () => {
  return (
    <Fragment>
      <DashboardNavigationStyle />
      <div className="dashboard-nav">
        <div className="dashboard-nav__item">
          <NavLink
            exact
            to="/dashboard/settings/users"
            activeClassName="dashboard-nav__item--active"
          >
            <FormattedMessage id="dashboard.nav.users" />
          </NavLink>
        </div>
        <div className="dashboard-nav__item">
          <NavLink
            exact
            to="/dashboard/settings/categories"
            activeClassName="dashboard-nav__item--active"
          >
            <FormattedMessage id="category" />
          </NavLink>
        </div>
        <div className="dashboard-nav__item">
          <NavLink
            exact
            to="/dashboard/settings/areas"
            activeClassName="dashboard-nav__item--active"
          >
            <FormattedMessage id="area" />
          </NavLink>
        </div>
        <div className="dashboard-nav__item">
          <NavLink
            exact
            to="/dashboard/settings/locales"
            activeClassName="dashboard-nav__item--active"
          >
            <FormattedMessage id="locales" />
          </NavLink>
        </div>
        <div className="dashboard-nav__item">
          <NavLink
            exact
            to="/dashboard/settings/zelos"
            activeClassName="dashboard-nav__item--active"
          >
            Zelos
          </NavLink>
        </div>
        <div className="dashboard-nav__item">
          <NavLink
            exact
            to="/dashboard/settings/sms"
            activeClassName="dashboard-nav__item--active"
          >
            SMS
          </NavLink>
        </div>
        <div />
      </div>
    </Fragment>
  );
};
