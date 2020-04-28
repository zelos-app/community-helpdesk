import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Container from "@material-ui/core/Container";

import Router from "./Router";
import { isLoggedIn, LoggedInContext } from "./utils/auth";
import { loadLocales } from "./utils/locale";

// Styles
import { lightTheme, variables } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import "./main.scss";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { LangBar } from "./components/Bar";

// TODO: ThemeProvider throws error I suppose because when we started moving to Material UI it want the MUI theme provider. This is styled.

export default () => {
  const [isLogged, setLogged] = useState(isLoggedIn());

  const [locale, setLocale] = useState("");

  const [messages, setMessages] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  const selectLanguage = (lang) => {
    setLocale(lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    loadLocales().then((locales) => {
      setMessages(locales);
      setLocale(Object.keys(locales)[0]);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <ThemeProvider theme={{ ...lightTheme, ...variables }}>
        <LoadingSpinner />
      </ThemeProvider>
    );
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ThemeProvider theme={{ ...lightTheme, ...variables }}>
        <LoggedInContext.Provider value={{ data: isLogged, set: setLogged }}>
          <GlobalStyles />
          <Container maxWidth="xl">
            {!isLogged && (
              <LangBar
                locales={Object.keys(messages)}
                current={locale}
                selectLanguage={selectLanguage}
              />
            )}
            <Router />
          </Container>
        </LoggedInContext.Provider>
      </ThemeProvider>
    </IntlProvider>
  );
};
