import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import DashboardNavigationStyle from "../DashboardNavigation/DashboardNavigationStyle";

export const SettingNavigation = () => {
  const isCAreaPage = window.location.pathname.includes("area");
  const isUsersPage = window.location.pathname.includes("users");
  const isCategoryPage = !isCAreaPage && !isUsersPage;

  return (
    <Fragment>
      <DashboardNavigationStyle />
      <div className="dashboard-nav">
        <div
          className={`dashboard-nav__item ${
            isUsersPage ? "dashboard-nav__item--active" : ""
          }`}
        >
          <Link to="/dashboard/settings/users">
            <FormattedMessage id="dashboard.nav.users" />
          </Link>
        </div>
        <div
          className={`dashboard-nav__item ${
            isCategoryPage ? "dashboard-nav__item--active" : ""
          }`}
        >
          <Link to="/dashboard/settings/category">
            <FormattedMessage id="category" />
          </Link>
        </div>
        <div
          className={`dashboard-nav__item ${
            isCAreaPage ? "dashboard-nav__item--active" : ""
          }`}
        >
          <Link to="/dashboard/settings/area">
            <FormattedMessage id="area" />
          </Link>
        </div>
        <div
          className={`dashboard-nav__item ${
            isCAreaPage ? "dashboard-nav__item--active" : ""
          }`}
        >
          <Link to="/dashboard/settings/locales">
            <FormattedMessage id="locales" />
          </Link>
        </div>
        <div />
      </div>
    </Fragment>
  );
};
