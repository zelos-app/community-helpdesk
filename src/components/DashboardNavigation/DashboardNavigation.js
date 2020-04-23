import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import DashboardNavigationStyle from "./DashboardNavigationStyle";

export default function DashboardNavigation() {
  const isSettingsPage = window.location.pathname.includes("settings");
  const isUsersPage = window.location.pathname.includes("users");
  const isTicketsPage = !isSettingsPage && !isUsersPage;

  return (
    <Fragment>
      <DashboardNavigationStyle />
      <div className="dashboard-nav">
        <div
          className={`dashboard-nav__item ${
            isTicketsPage ? "dashboard-nav__item--active" : ""
          }`}
        >
          <Link to="/dashboard">
            <FormattedMessage id="dashboard.nav.tickets" />
          </Link>
        </div>
        <div
          className={`dashboard-nav__item ${
            isSettingsPage ? "dashboard-nav__item--active" : ""
          }`}
        >
          <Link to="/dashboard/settings">
            <FormattedMessage id="dashboard.nav.settings" />
          </Link>
        </div>
        <div
          className={`dashboard-nav__item ${
            isUsersPage ? "dashboard-nav__item--active" : ""
          }`}
        >
          <Link to="/dashboard/users">Users</Link>
        </div>        
      </div>
    </Fragment>
  );
}
