import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import DashboardNavigationStyle from "./DashboardNavigationStyle";

export default function DashboardNavigation() {
  return (
    <Fragment>
      <DashboardNavigationStyle />
      <div className="dashboard-nav">
        <div className="dashboard-nav__item">
          <NavLink
            exact
            to="/dashboard"
            activeClassName="dashboard-nav__item--active"
          >
            <FormattedMessage id="dashboard.nav.tickets" />
          </NavLink>
        </div>
        <div className="dashboard-nav__item">
          <NavLink
            to="/dashboard/settings"
            activeClassName="dashboard-nav__item--active"
          >
            <FormattedMessage id="dashboard.nav.settings" />
          </NavLink>
        </div>
      </div>
    </Fragment>
  );
}
