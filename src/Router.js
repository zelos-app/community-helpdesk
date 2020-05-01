import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Routes
import Intro from "./routes/Request/Intro";

import Launch from "./routes/Request/Launch";
import MoreInfo from "./routes/Request/MoreInfo";

// Auth
import AuthWrapper from "./routes/Auth/AuthWrapper";
import Login from "./routes/Auth/Login";
import Register from "./routes/Auth/Register";
import ResetPassword from "./routes/Auth/ResetPassword";

// Dashboard
import DashboardWrapper from "./routes/Dashboard/DashboardWrapper";
import MainView from "./routes/Dashboard/Main/Main";
import SettingsWrapper from "./routes/Dashboard/SettingsWrapper";

// Request
import RequestWrapper from "./routes/Request/RequestWrapper";
import Details from "./routes/Request/Details";
import Request from "./routes/Request/Request";
import Category from "./routes/Request/Category";
import Confirmed from "./routes/Request/Confirmed";

// Settings
import AreaTable from "./components/SettingsPage/AreaTable";
import CategoryTable from "./components/SettingsPage/CategoryTable";
import Users from "./routes/Dashboard/Users";
import Zelos from "./routes/Dashboard/Zelos";
import SMS from "./routes/Dashboard/Sms";
import LocaleTable from "./components/SettingsPage/LocaleTable";

// AppLanding
import AppLanding from "./routes/AppLanding/AppLanding";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route
        path="/auth"
        render={({ match: { path } }) => (
          <AuthWrapper>
            <Switch>
              <Redirect exact from={path} to={`${path}/login`} />
              <Route path={`${path}/login`} component={Login} />
              <Route path={`${path}/register/:token`} component={Register} />
              <Route
                path={`${path}/reset-password/:token`}
                component={ResetPassword}
              />
            </Switch>
          </AuthWrapper>
        )}
      />
      <Route path="/app" component={AppLanding} />
      <Route
        path="/request"
        render={({ match: { path } }) => (
          <RequestWrapper>
            <Switch>
              <Redirect exact from={path} to={`${path}/category`} />
              <Route path={`${path}/category`} component={Category} />
              <Route path={`${path}/request`} component={Request} />
              <Route path={`${path}/details`} component={Details} />
              <Route path={`${path}/confirmed`} component={Confirmed} />
            </Switch>
          </RequestWrapper>
        )}
      />
      <Route
        path="/launch"
        render={({ match: { path } }) => (
          <RequestWrapper>
            <Switch>
              <Redirect exact from={path} to={`${path}/start`} />
              <Route path={`${path}/start`} component={Launch} />
              <Route path={`${path}/moreinfo`} component={MoreInfo} />
            </Switch>
          </RequestWrapper>
        )}
      />
      <Route
        path="/dashboard"
        render={({ match: { path } }) => (
          <DashboardWrapper>
            <Switch>
              <Route exact path={path} component={MainView} />
              <Route
                path={`${path}/settings`}
                render={({ match: { path } }) => (
                  <SettingsWrapper>
                    <Switch>
                      <Redirect exact from={path} to={`${path}/users`} />
                      <Route path={`${path}/users`} component={Users} />
                      <Route
                        path={`${path}/categories`}
                        component={CategoryTable}
                      />
                      <Route path={`${path}/areas`} component={AreaTable} />
                      <Route path={`${path}/locales`} component={LocaleTable} />
                      <Route path={`${path}/zelos`} component={Zelos} />
                      <Route path={`${path}/sms`} component={SMS} />
                    </Switch>
                  </SettingsWrapper>
                )}
              />
            </Switch>
          </DashboardWrapper>
        )}
      />
      <Redirect from="*" to="/" />
    </Switch>
  );
};
