import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Container from "@material-ui/core/Container";

import Router from "./Router";
import { isLoggedIn, LoggedInContext } from "./utils/auth";

// Styles
import { lightTheme, variables } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import "./main.scss";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import useLocale, { fetchLocales } from "./hooks/useLocale";

// TODO: ThemeProvider throws error I suppose because when we started moving to Material UI it want the MUI theme provider. This is styled.

export default () => {
  const [isLogged, setLogged] = useState(isLoggedIn());

  const [{ locale, messages, loading }] = useLocale();

  useEffect(() => {
    (async () => {
      await fetchLocales();
    })();
  }, []);

  return (
    <>
      {loading ? (
        <ThemeProvider theme={{ ...lightTheme, ...variables }}>
          <LoadingSpinner />
        </ThemeProvider>
      ) : (
        <IntlProvider locale={locale} messages={messages[locale]}>
          <ThemeProvider theme={{ ...lightTheme, ...variables }}>
            <LoggedInContext.Provider
              value={{ data: isLogged, set: setLogged }}
            >
              <GlobalStyles />
              <Container maxWidth="xl" disableGutters>
                <Router />
              </Container>
            </LoggedInContext.Provider>
          </ThemeProvider>
        </IntlProvider>
      )}
    </>
  );
};
