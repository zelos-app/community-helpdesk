import React, {Fragment, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import DashboardNavigationStyle from './DashboardNavigationStyle'
import {isLoggedIn} from "../../utils/auth";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

export default function DashboardNavigation() {
  const history = useHistory();
  const [isSettingsPage, setIsSettingsPage] = useState();
  const [isUsersPage, setIsUsersPage] = useState();
  const [isLoginPage, setIsLoginPage] = useState();
  const [isTicketsPage, setIsTicketsPage] = useState();
  const [isHomePage, setIsHomePage] = useState();
  const [loggedIn, setIsLoggedIn] = useState(false);

  const resetPaths = () => {
    setIsUsersPage(history.location.pathname === '/dashboard/users');
    setIsLoginPage(history.location.pathname === '/auth' || history.location.pathname === '/auth/login');
    setIsTicketsPage(history.location.pathname === '/dashboard');
    setIsSettingsPage(history.location.pathname === '/dashboard/settings');
    setIsHomePage(history.location.pathname === '/');
  };

  useEffect(() => {
    setIsLoggedIn(isLoggedIn());
    resetPaths();
  }, []);

  history.listen(() => {
    setIsLoggedIn(isLoggedIn());
    resetPaths();
  });

  return (
    <Fragment>
      <DashboardNavigationStyle/>

      <Toolbar className='dashboard-nav'>
        {loggedIn && <>
          <Button disabled={isTicketsPage} className='dashboard-nav-item'
                  href="/dashboard">
            <FormattedMessage id="dashboard.nav.tickets"/>
          </Button>
          <Button disabled={isSettingsPage} className='dashboard-nav-item' href="/dashboard/settings">
            <FormattedMessage id="dashboard.nav.settings"/>
          </Button>
          <Button disabled={isUsersPage} className='dashboard-nav-item' href="/dashboard/users">
            Users</Button>
          <Button disabled={isHomePage} className='dashboard-nav-item' href="/">Home</Button>

        </>}
        {(!loggedIn && !isLoginPage) && <Button disabled={isLoginPage} className='dashboard-nav-item' href="/auth">
          Log In</Button>
        }
        {(!loggedIn && isLoginPage) &&
        <Button disabled={isHomePage} className='dashboard-nav-item' href="/">Home</Button>}
      </Toolbar>
    </Fragment>
  );
}
