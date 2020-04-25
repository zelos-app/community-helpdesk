import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { logout } from "../../utils/auth";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/styles";

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export const Bar = ({ locale, isLoggedIn, setLogged }) => {
  const classes = useStyles();

  const location = useLocation();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);

  // const [setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const loggedInRoutes = () => {
    return (
      <>
        <Link component={Button} color="inherit" to="/">
          <HomeIcon />
        </Link>
        <Link component={Button} color="inherit" to="/dashboard">
          <FormattedMessage id="dashboard.nav.tickets" />
        </Link>
        <Link component={Button} color="inherit" to="/dashboard/settings">
          <FormattedMessage id="dashboard.nav.settings" />
        </Link>
        <Link component={Button} color="inherit" to="/dashboard/users">
          <FormattedMessage id="dashboard.nav.users" />
        </Link>

        <div className={classes.grow} />

        <Button
          color="inherit"
          onClick={() => {
            logout();
            setLogged(false);
          }}
        >
          <FormattedMessage id="log_out" />
        </Button>
      </>
    );
  };

  const loggedOutRoutes = () => {
    return (
      <>
        {!isHome && (
          <Link component={Button} color="inherit" to="/">
            <HomeIcon />
          </Link>
        )}

        <div className={classes.grow} />

        <Link to="/auth">
          <Button color="inherit">
            <FormattedMessage id="login" />
          </Button>
        </Link>
      </>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>{isLoggedIn ? loggedInRoutes() : loggedOutRoutes()}</Toolbar>
    </AppBar>
  );
};
