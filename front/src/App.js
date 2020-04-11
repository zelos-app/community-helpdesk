import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider, FormattedMessage } from "react-intl";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageIcon from "@material-ui/icons/Language";
import Router from "./Router";
import { Link } from "react-router-dom";
import { isLoggedIn, logout, LoggedInContext } from "./utils/auth";
import "./main.scss";

// Styles
import { lightTheme, darkTheme, variables } from "./styles/theme";
import { GlobalStyles } from "./styles/global";

// Translations
import translations_en from "./translations/en.json";
import translations_et from "./translations/et.json";

// i18 configs
const i18nConfig = {
  defaultLocale: "en",
  messages: {
    en: translations_en,
    et: translations_et,
  },
};

export default () => {
  const [locale, setLocale] = useState(i18nConfig.defaultLocale);

  const selectLanguage = (lang) => {
    setLocale(lang);
    document.documentElement.lang = lang;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLogged, setLogged] = useState(isLoggedIn());

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={i18nConfig.defaultLocale}
      messages={i18nConfig.messages[locale]}
    >
      <ThemeProvider theme={{ ...lightTheme, ...variables }}>
        <LoggedInContext.Provider value={{ data: isLogged, set: setLogged }}>
          {/* Include global styles */}
          <GlobalStyles />
          <AppBar position="static">
            <Toolbar>
              <Button
                aria-controls="langmenu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <LanguageIcon />
                {locale.toUpperCase()}
              </Button>
              <Menu
                id="langmenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    selectLanguage("en");
                  }}
                >
                  English
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    selectLanguage("et");
                  }}
                >
                  Eesti
                </MenuItem>
              </Menu>
              <div style={{ flex: "1 1 auto" }} />
              {isLogged ? (
                <Button
                  color="inherit"
                  onClick={() => {
                    logout();
                    setLogged(false);
                  }}
                >
                  <FormattedMessage id="log_out" />
                </Button>
              ) : (
                <Link to="/auth">
                  <Button color="inherit">
                    <FormattedMessage id="login" />
                  </Button>
                </Link>
              )}
            </Toolbar>
          </AppBar>
          <Container maxWidth="xl">
            <Router />
          </Container>
        </LoggedInContext.Provider>
      </ThemeProvider>
    </IntlProvider>
  );
};
